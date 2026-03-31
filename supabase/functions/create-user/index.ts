import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" } });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { email, password, full_name, mobile_number, country } = await req.json();

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name }
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  // Update profile with additional info
  if (data.user) {
    await supabaseAdmin.from("profiles").update({
      full_name,
      mobile_number: mobile_number || "",
      country: country || "",
    }).eq("user_id", data.user.id);
  }

  return new Response(JSON.stringify({ user: data.user }), { status: 200, headers: { "Content-Type": "application/json" } });
});
