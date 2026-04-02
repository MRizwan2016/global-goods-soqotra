import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const EXTERNAL_URL = Deno.env.get("EXTERNAL_SUPABASE_URL");
    const EXTERNAL_KEY = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY");

    if (!EXTERNAL_URL || !EXTERNAL_KEY) {
      return new Response(
        JSON.stringify({ error: "External Supabase credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { action, table, record, match_column, match_value } = await req.json();

    if (!action || !table) {
      return new Response(
        JSON.stringify({ error: "Missing action or table" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const externalClient = createClient(EXTERNAL_URL, EXTERNAL_KEY);

    let result;

    switch (action) {
      case "upsert":
        result = await externalClient.from(table).upsert(record, { onConflict: "book_number" });
        break;
      case "update":
        result = await externalClient.from(table).update(record).eq(match_column, match_value);
        break;
      case "delete":
        result = await externalClient.from(table).delete().eq(match_column, match_value);
        break;
      case "bulk_sync": {
        // Sync all records from Lovable Cloud to external
        const INTERNAL_URL = Deno.env.get("SUPABASE_URL")!;
        const INTERNAL_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const internalClient = createClient(INTERNAL_URL, INTERNAL_KEY);

        const { data: allBooks, error: fetchErr } = await internalClient
          .from("manage_invoice_book_stock")
          .select("*");

        if (fetchErr) throw fetchErr;

        // Upsert all to external
        result = await externalClient
          .from(table)
          .upsert(allBooks || [], { onConflict: "book_number" });
        break;
      }
      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    if (result.error) {
      console.error("External sync error:", result.error);
      return new Response(
        JSON.stringify({ error: result.error.message, details: result.error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, action }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Sync error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
