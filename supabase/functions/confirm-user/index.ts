import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" } });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { email } = await req.json();

  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) return new Response(JSON.stringify({ error: listError.message }), { status: 400, headers: { "Content-Type": "application/json" } });

  const user = users.find((u: any) => u.email === email);
  if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, { email_confirm: true });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { "Content-Type": "application/json" } });

  return new Response(JSON.stringify({ success: true, user_id: user.id }), { status: 200, headers: { "Content-Type": "application/json" } });
});
