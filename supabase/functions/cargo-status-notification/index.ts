import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const statusLabels: Record<string, { en: string; ar: string }> = {
  collected: { en: "Collected", ar: "تم الاستلام" },
  loaded: { en: "Loaded", ar: "تم التحميل" },
  in_transit: { en: "In Transit", ar: "في الطريق" },
  arrived: { en: "Arrived", ar: "وصلت" },
  clearance: { en: "Clearance", ar: "تخليص جمركي" },
  processing: { en: "Processing", ar: "قيد المعالجة" },
  delivered: { en: "Delivered", ar: "تم التسليم" },
};

const statusEmoji: Record<string, string> = {
  collected: "📦",
  loaded: "🏗️",
  in_transit: "🚢",
  arrived: "🛬",
  clearance: "📋",
  processing: "⚙️",
  delivered: "✅",
};

function buildEmailHtml(
  customerName: string,
  invoiceNumber: string,
  oldStatus: string | null,
  newStatus: string,
  origin: string,
  destination: string,
  cargoDescription: string | null
): string {
  const newLabel = statusLabels[newStatus]?.en || newStatus;
  const newLabelAr = statusLabels[newStatus]?.ar || newStatus;
  const emoji = statusEmoji[newStatus] || "📦";

  const statusSteps = [
    "collected",
    "loaded",
    "in_transit",
    "arrived",
    "clearance",
    "processing",
    "delivered",
  ];
  const currentIdx = statusSteps.indexOf(newStatus);

  const timelineHtml = statusSteps
    .map((step, idx) => {
      const label = statusLabels[step]?.en || step;
      const isCompleted = idx <= currentIdx;
      const isCurrent = idx === currentIdx;
      const color = isCurrent
        ? "#1976d2"
        : isCompleted
        ? "#4caf50"
        : "#e0e0e0";
      const textColor = isCompleted ? "#333" : "#999";
      return `<td style="text-align:center;padding:4px 6px;">
        <div style="width:28px;height:28px;border-radius:50%;background:${color};margin:0 auto;line-height:28px;color:white;font-size:12px;">${
        isCompleted ? "✓" : idx + 1
      }</div>
        <div style="font-size:10px;color:${textColor};margin-top:4px;">${label}</div>
      </td>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#1976d2;padding:24px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;">SOQOTRA LOGISTICS SERVICES</h1>
          <p style="margin:4px 0 0;color:#bbdefb;font-size:12px;">TRANSPORTATION & TRADING WLL.</p>
        </td></tr>
        <!-- Status Update Banner -->
        <tr><td style="padding:24px 24px 16px;">
          <div style="background:#e3f2fd;border-radius:8px;padding:16px;text-align:center;">
            <span style="font-size:32px;">${emoji}</span>
            <h2 style="margin:8px 0 4px;color:#1976d2;font-size:18px;">Shipment Status Update</h2>
            <p style="margin:0;color:#1565c0;font-size:14px;">Your cargo is now: <strong>${newLabel}</strong></p>
            <p style="margin:4px 0 0;color:#1565c0;font-size:13px;direction:rtl;">${newLabelAr}</p>
          </div>
        </td></tr>
        <!-- Shipment Details -->
        <tr><td style="padding:0 24px 16px;">
          <table width="100%" cellpadding="8" cellspacing="0" style="background:#fafafa;border-radius:6px;font-size:13px;">
            <tr><td style="color:#666;width:140px;">Customer</td><td style="font-weight:bold;">${customerName}</td></tr>
            <tr><td style="color:#666;">Invoice Number</td><td style="font-weight:bold;">${invoiceNumber}</td></tr>
            <tr><td style="color:#666;">Route</td><td>${origin} → ${destination}</td></tr>
            ${cargoDescription ? `<tr><td style="color:#666;">Description</td><td>${cargoDescription}</td></tr>` : ""}
          </table>
        </td></tr>
        <!-- Timeline -->
        <tr><td style="padding:0 24px 24px;">
          <p style="font-size:12px;color:#666;margin:0 0 8px;">Tracking Progress:</p>
          <table width="100%" cellpadding="0" cellspacing="0"><tr>${timelineHtml}</tr></table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f5f5f5;padding:16px 24px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#999;">© ${new Date().getFullYear()} Soqotra Logistics Services, Transportation & Trading WLL</p>
          <p style="margin:4px 0 0;font-size:10px;color:#bbb;">This is an automated notification. Please do not reply.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const payload = await req.json();
    // Support both webhook payload and direct call
    const record = payload.record || payload;
    const oldRecord = payload.old_record || null;

    const {
      id: cargoId,
      customer_account_id,
      customer_name,
      invoice_number,
      current_status,
      origin,
      destination,
      cargo_description,
    } = record;

    const oldStatus = oldRecord?.current_status || null;

    // Skip if status hasn't changed
    if (oldStatus && oldStatus === current_status) {
      return new Response(JSON.stringify({ skipped: true, reason: "status unchanged" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get customer email
    const { data: customer, error: custErr } = await supabase
      .from("customer_accounts")
      .select("email, full_name")
      .eq("id", customer_account_id)
      .single();

    if (custErr || !customer) {
      throw new Error(`Customer not found: ${custErr?.message}`);
    }

    const statusLabel = statusLabels[current_status]?.en || current_status;
    const emailHtml = buildEmailHtml(
      customer_name,
      invoice_number,
      oldStatus,
      current_status,
      origin || "Qatar",
      destination || "Kenya",
      cargo_description
    );

    // Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Soqotra Logistics <mohammed@soqotralog.com>",
        to: [customer.email],
        subject: `${statusEmoji[current_status] || "📦"} Shipment ${invoice_number} — ${statusLabel}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendRes.json();

    // Log notification
    await supabase.from("cargo_status_notifications").insert({
      cargo_tracking_id: cargoId,
      customer_account_id,
      old_status: oldStatus,
      new_status: current_status,
      email_sent_to: customer.email,
      resend_message_id: resendData.id || null,
      error: resendRes.ok ? null : JSON.stringify(resendData),
    });

    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      return new Response(JSON.stringify({ success: false, error: resendData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, messageId: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Notification error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
