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

type SyncScheduleBundlePayload = {
  schedule?: Record<string, unknown>;
  jobs?: Record<string, unknown>[];
};

const isMissingTableError = (error: { message?: string } | null | undefined) => {
  const message = error?.message?.toLowerCase() || "";
  return message.includes("could not find the table") || message.includes("relation") && message.includes("does not exist");
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

// deno-lint-ignore no-explicit-any
type AnyClient = any;

async function upsertMatch(
  externalClient: AnyClient,
  table: string,
  record: Record<string, unknown>,
  matchColumn?: string,
  matchValue?: string,
) {
  if (!matchColumn || !matchValue) {
    return await externalClient.from(table).insert(record);
  }

  const { data: existing, error: lookupError } = await externalClient
    .from(table)
    .select("*")
    .eq(matchColumn, matchValue)
    .maybeSingle();

  if (lookupError) {
    return { error: lookupError };
  }

  if (existing) {
    const updateRecord = { ...record };
    delete updateRecord.id;
    return await externalClient.from(table).update(updateRecord).eq(matchColumn, matchValue);
  }

  return await externalClient.from(table).insert(record);
}

async function syncLegacyInvoiceBookTables(
  externalClient: AnyClient,
  action: string,
  record: Record<string, unknown>,
  matchColumn?: string,
  matchValue?: string,
) {
  const bookNumber = String(record.book_number ?? matchValue ?? "");

  if (!bookNumber) {
    return { error: { message: "Missing book_number for invoice book sync" } };
  }

  if (action === "delete") {
    const bookDelete = await externalClient.from("invoice_books").delete().eq("book_number", bookNumber);
    if (bookDelete.error && !isMissingTableError(bookDelete.error)) return bookDelete;

    const assignmentDelete = await externalClient.from("sl_book_assignments").delete().eq("book_number", bookNumber);
    if (assignmentDelete.error && !isMissingTableError(assignmentDelete.error)) return assignmentDelete;

    return { error: null };
  }

  const totalPages = Number(record.total_pages ?? 50);
  const invoiceBookRecord = {
    country: String(record.country ?? ""),
    book_number: bookNumber,
    country_id_number: record.country_id_number ? Number(record.country_id_number) : null,
    start_page: record.start_page ? Number(record.start_page) : null,
    end_page: record.end_page ? Number(record.end_page) : null,
    total_pages: Number.isFinite(totalPages) ? totalPages : 50,
    pages_used: Number(record.pages_used ?? 0) || 0,
  };

  const bookResult = await upsertMatch(externalClient, "invoice_books", invoiceBookRecord, "book_number", bookNumber);
  if (bookResult.error && !isMissingTableError(bookResult.error)) {
    return bookResult;
  }

  const assignedStaff = String(record.assigned_to_sales_rep ?? "").trim();
  const normalizedCountry = String(record.country ?? "").toLowerCase();
  const shouldSyncSriLankaAssignment = normalizedCountry.includes("sri") || bookNumber.startsWith("8");

  if (shouldSyncSriLankaAssignment) {
    if (assignedStaff) {
      const assignmentRecord = {
        book_number: bookNumber,
        start_page_no: record.start_page ? Number(record.start_page) : null,
        end_page_no: record.end_page ? Number(record.end_page) : null,
        total_pages: Number.isFinite(totalPages) ? totalPages : 50,
        staff_name: assignedStaff,
        assigned_date: record.assigned_date ? String(record.assigned_date).slice(0, 10) : null,
      };

      const assignmentResult = await upsertMatch(externalClient, "sl_book_assignments", assignmentRecord, "book_number", bookNumber);
      if (assignmentResult.error && !isMissingTableError(assignmentResult.error)) {
        return assignmentResult;
      }
    } else {
      const assignmentDelete = await externalClient.from("sl_book_assignments").delete().eq("book_number", bookNumber);
      if (assignmentDelete.error && !isMissingTableError(assignmentDelete.error)) return assignmentDelete;
    }
  }

  return { error: null };
}

async function syncScheduleBundle(
  externalClient: AnyClient,
  payload: SyncScheduleBundlePayload,
) {
  const schedule = payload.schedule || {};
  const jobs = Array.isArray(payload.jobs) ? payload.jobs : [];
  const scheduleNumber = String(schedule.schedule_number ?? "");

  if (!scheduleNumber) {
    return { error: { message: "Missing schedule_number" } };
  }

  const scheduleResult = await upsertMatch(externalClient, "schedules", schedule, "schedule_number", scheduleNumber);
  if (scheduleResult.error) return scheduleResult;

  const { data: syncedSchedule, error: syncedScheduleError } = await externalClient
    .from("schedules")
    .select("id")
    .eq("schedule_number", scheduleNumber)
    .maybeSingle();

  if (syncedScheduleError) {
    return { error: syncedScheduleError };
  }

  if (!syncedSchedule?.id) {
    return { error: { message: "Unable to resolve external schedule id" } };
  }

  const deleteResult = await externalClient.from("schedule_jobs").delete().eq("schedule_id", syncedSchedule.id);
  if (deleteResult.error && !isMissingTableError(deleteResult.error)) {
    return deleteResult;
  }

  if (jobs.length > 0) {
    const jobsToInsert = jobs.map((job) => ({
      schedule_id: syncedSchedule.id,
      job_data: job,
    }));

    const insertResult = await externalClient.from("schedule_jobs").insert(jobsToInsert);
    if (insertResult.error && !isMissingTableError(insertResult.error)) {
      return insertResult;
    }
  }

  return { error: null };
}

async function detectProfilesSchema(externalClient: AnyClient) {
  const { data, error } = await externalClient.from("profiles").select("*").limit(1);

  if (error) {
    if (isMissingTableError(error)) return null;
    throw error;
  }

  let columns: string[] = [];
  if (data && data.length > 0) {
    columns = Object.keys(data[0]);
  } else {
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
  externalClient: AnyClient,
  userId: string,
  payload: SyncUserPayload,
  schema: { hasUserIdColumn: boolean; columns: string[] },
) {
  const allFields: Record<string, unknown> = {
    email: payload.email,
    full_name: payload.full_name || payload.email,
    is_admin: payload.is_admin ?? false,
    is_active: payload.is_active ?? true,
    permissions: payload.permissions || {},
    mobile_number: payload.mobile_number || "",
    country: payload.country || "",
  };

  const userCol = schema.hasUserIdColumn ? "user_id" : "id";
  allFields[userCol] = userId;

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
  externalClient: AnyClient,
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
    const existingAuthUser = existingUsers.find((entry: { email?: string }) => entry.email?.toLowerCase() === normalizedEmail);

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

    let result: { error: { message?: string } | null };

    switch (action) {
      case "upsert":
        result = await externalClient.from(table).upsert(record, { onConflict: "book_number" });
        break;
      case "upsert_match":
        if (table === "manage_invoice_book_stock") {
          result = await syncLegacyInvoiceBookTables(externalClient, action, record || {}, match_column, match_value);
        } else {
          result = await upsertMatch(externalClient, table, record || {}, match_column, match_value);
        }
        break;
      case "update":
        if (table === "manage_invoice_book_stock") {
          result = await syncLegacyInvoiceBookTables(externalClient, action, record || {}, match_column, match_value);
        } else {
          result = await externalClient.from(table).update(record as any).eq(match_column, match_value);
        }
        break;
      case "delete":
        if (table === "manage_invoice_book_stock") {
          result = await syncLegacyInvoiceBookTables(externalClient, action, record || {}, match_column, match_value);
        } else {
          result = await externalClient.from(table).delete().eq(match_column, match_value);
        }
        break;
      case "sync_schedule_bundle":
        result = await syncScheduleBundle(externalClient, (record || {}) as SyncScheduleBundlePayload);
        break;
      case "bulk_sync": {
        const INTERNAL_URL = Deno.env.get("SUPABASE_URL")!;
        const INTERNAL_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const internalClient = createClient(INTERNAL_URL, INTERNAL_KEY);

        const { data: allBooks, error: fetchErr } = await internalClient
          .from("manage_invoice_book_stock")
          .select("*");

        if (fetchErr) throw fetchErr;

        if (table === "manage_invoice_book_stock") {
          for (const book of allBooks || []) {
            const syncResult = await syncLegacyInvoiceBookTables(externalClient, "upsert_match", book as Record<string, unknown>, "book_number", String((book as Record<string, unknown>).book_number || ""));
            if (syncResult.error && !isMissingTableError(syncResult.error as { message?: string })) {
              return jsonResponse({ error: (syncResult.error as { message?: string }).message || "Bulk sync failed" }, 500);
            }
          }
          result = { error: null };
        } else {
          result = await externalClient
            .from(table)
            .upsert(allBooks || [], { onConflict: "book_number" });
        }
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
