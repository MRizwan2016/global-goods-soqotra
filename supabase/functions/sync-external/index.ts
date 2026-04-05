import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

type SyncUserPayload = {
  email: string;
  password?: string;
  full_name?: string;
  mobile_number?: string;
  country?: string;
  is_admin?: boolean;
  is_active?: boolean;
  permissions?: Record<string, unknown>;
};

const isMissingTableError = (error: { message?: string } | null | undefined) => {
  const message = error?.message?.toLowerCase() || "";
  return message.includes("could not find the table") || message.includes("relation") && message.includes("does not exist");
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

async function detectProfilesTable(externalClient: ReturnType<typeof createClient>) {
  const { error } = await externalClient.from("profiles").select("*").limit(1);

  if (!error) return true;
  if (isMissingTableError(error)) return false;

  throw error;
}

async function detectProfilesSchema(externalClient: ReturnType<typeof createClient>) {
  // Fetch one row to discover column names
  const { data, error } = await externalClient.from("profiles").select("*").limit(1);

  if (error) {
    if (isMissingTableError(error)) return null;
    // If the table exists but is empty, try inserting a dummy then reading columns from error
    // Actually PostgREST returns empty array for empty tables, so data=[] is fine
    throw error;
  }

  // If we got data, discover columns from keys; if empty, try to discover via a dummy select
  let columns: string[] = [];
  if (data && data.length > 0) {
    columns = Object.keys(data[0]);
  } else {
    // Table is empty — we need to discover columns another way
    // Try selecting known column names one by one
    const knownCols = ["id", "user_id", "email", "full_name", "mobile_number", "country", "is_admin", "is_active", "permissions", "created_at", "updated_at"];
    for (const col of knownCols) {
      const { error: colErr } = await externalClient.from("profiles").select(col).limit(1);
      if (!colErr) columns.push(col);
    }
  }

  const hasUserIdColumn = columns.includes("user_id");
  return { hasUserIdColumn, columns };
}

async function upsertExternalProfile(
  externalClient: ReturnType<typeof createClient>,
  userId: string,
  payload: SyncUserPayload,
  schema: { hasUserIdColumn: boolean; columns: string[] },
) {
  // Map of all possible fields we might insert
  const allFields: Record<string, unknown> = {
    email: payload.email,
    full_name: payload.full_name || payload.email,
    is_admin: payload.is_admin ?? false,
    is_active: payload.is_active ?? true,
    permissions: payload.permissions || {},
    mobile_number: payload.mobile_number || "",
    country: payload.country || "",
  };

  // Determine the user-linking column
  const userCol = schema.hasUserIdColumn ? "user_id" : "id";
  allFields[userCol] = userId;

  // Filter to only columns that actually exist in the external table
  const profileData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(allFields)) {
    if (schema.columns.includes(key)) {
      profileData[key] = value;
    }
  }

  const { data: existingProfile, error: lookupError } = await externalClient
    .from("profiles")
    .select("*")
    .eq(userCol, userId)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  if (existingProfile) {
    const updateData = { ...profileData };
    delete updateData[userCol];
    if (userCol !== "id") delete updateData.id;

    const { error } = await externalClient
      .from("profiles")
      .update(updateData)
      .eq(userCol, userId);

    if (error) throw error;
    return "updated";
  }

  const { error } = await externalClient.from("profiles").insert(profileData);
  if (error) throw error;

  return "created";
}

async function syncUsersToExternal(
  externalClient: ReturnType<typeof createClient>,
  users: SyncUserPayload[],
) {
  const { data: authUsersPage, error: listUsersError } = await externalClient.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listUsersError) throw listUsersError;

  const existingUsers = authUsersPage.users || [];
  const profilesSchema = await detectProfilesSchema(externalClient);
  const profilesTableAvailable = profilesSchema !== null;
  const results = [];

  for (const user of users) {
    if (!user.email) {
      throw new Error("Each user requires an email address");
    }

    const normalizedEmail = user.email.trim().toLowerCase();
    const existingAuthUser = existingUsers.find((entry) => entry.email?.toLowerCase() === normalizedEmail);

    let authUser = existingAuthUser;
    let authAction = "updated";

    if (existingAuthUser) {
      const { data, error } = await externalClient.auth.admin.updateUserById(existingAuthUser.id, {
        email: normalizedEmail,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          ...(existingAuthUser.user_metadata || {}),
          full_name: user.full_name || existingAuthUser.user_metadata?.full_name || normalizedEmail,
        },
      });

      if (error) throw error;
      authUser = data.user;
    } else {
      authAction = "created";
      const { data, error } = await externalClient.auth.admin.createUser({
        email: normalizedEmail,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          full_name: user.full_name || normalizedEmail,
        },
      });

      if (error) throw error;
      authUser = data.user;
    }

    let profileAction = "skipped";

    if (profilesTableAvailable && profilesSchema && authUser?.id) {
      profileAction = await upsertExternalProfile(externalClient, authUser.id, {
        ...user,
        email: normalizedEmail,
      }, profilesSchema);
    }

    results.push({
      email: normalizedEmail,
      user_id: authUser?.id || null,
      auth: authAction,
      profile: profileAction,
    });
  }

  return { results, profilesTableAvailable };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const EXTERNAL_URL = Deno.env.get("EXTERNAL_SUPABASE_URL");
    const EXTERNAL_KEY = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY");

    if (!EXTERNAL_URL || !EXTERNAL_KEY) {
      return jsonResponse({ error: "External backend credentials are not configured" }, 500);
    }

    const payload = await req.json();
    const { action, table, record, match_column, match_value, users } = payload;

    if (!action) {
      return jsonResponse({ error: "Missing action" }, 400);
    }

    const externalClient = createClient(EXTERNAL_URL, EXTERNAL_KEY);

    if (action === "sync_users") {
      if (!Array.isArray(users) || users.length === 0) {
        return jsonResponse({ error: "Missing users payload" }, 400);
      }

      const result = await syncUsersToExternal(externalClient, users);
      return jsonResponse({ success: true, action, ...result });
    }

    if (!table) {
      return jsonResponse({ error: "Missing table" }, 400);
    }

    let result;

    switch (action) {
      case "upsert":
        result = await externalClient.from(table).upsert(record, { onConflict: "book_number" });
        break;
      case "update":
        result = await (externalClient.from(table).update(record) as never).eq(match_column, match_value);
        break;
      case "delete":
        result = await (externalClient.from(table).delete() as never).eq(match_column, match_value);
        break;
      case "bulk_sync": {
        const INTERNAL_URL = Deno.env.get("SUPABASE_URL")!;
        const INTERNAL_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const internalClient = createClient(INTERNAL_URL, INTERNAL_KEY);

        const { data: allBooks, error: fetchErr } = await internalClient
          .from("manage_invoice_book_stock")
          .select("*");

        if (fetchErr) throw fetchErr;

        result = await externalClient
          .from(table)
          .upsert(allBooks || [], { onConflict: "book_number" });
        break;
      }
      default:
        return jsonResponse({ error: `Unknown action: ${action}` }, 400);
    }

    if (result.error) {
      console.error("External sync error:", result.error);
      return jsonResponse({ error: result.error.message, details: result.error }, 500);
    }

    return jsonResponse({ success: true, action });
  } catch (err: unknown) {
    console.error("Sync error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
