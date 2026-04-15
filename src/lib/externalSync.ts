import { supabase } from "@/integrations/supabase/client";

type SyncRecord = Record<string, unknown>;
type SyncExternalResponse = {
  success?: boolean;
  action?: string;
  error?: string | { message?: string };
  details?: unknown;
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const normalizeCountryName = (country?: string | null) => {
  if (!country) return "";

  const map: Record<string, string> = {
    SRI_LANKA: "Sri Lanka",
    SAUDI_ARABIA: "Saudi Arabia",
    QATAR: "Qatar",
    ERITREA: "Eritrea",
    SUDAN: "Sudan",
    TUNISIA: "Tunisia",
    ALGERIA: "Algeria",
    KENYA: "Kenya",
    PHILIPPINES: "Philippines",
    UAE: "UAE",
  };

  return map[country] || country.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export async function syncToExternal(
  action: string,
  table: string,
  record?: SyncRecord,
  matchColumn?: string,
  matchValue?: string,
) {
  try {
    await supabase.functions.invoke("sync-external", {
      body: {
        action,
        table,
        record,
        match_column: matchColumn,
        match_value: matchValue,
      },
    });
  } catch (error) {
    console.warn("External sync failed (non-blocking):", error);
  }
}

export async function syncToExternalStrict(
  action: string,
  table: string,
  record?: SyncRecord,
  matchColumn?: string,
  matchValue?: string,
) {
  const { data, error } = await supabase.functions.invoke("sync-external", {
    body: {
      action,
      table,
      record,
      match_column: matchColumn,
      match_value: matchValue,
    },
  });

  if (error) {
    throw error;
  }

  const response = (data ?? {}) as SyncExternalResponse;
  if (response.error) {
    const message = typeof response.error === "string"
      ? response.error
      : response.error.message || "External sync failed";
    throw new Error(message);
  }

  return response;
}

export function buildSriLankaVesselRecord(vessel: Record<string, any>) {
  const id = String(vessel.id || "").trim();

  if (!id) {
    return null;
  }

  return {
    id,
    running_number: String(vessel.runningNumber || "").trim(),
    vessel_name: String(vessel.vesselName || "").trim(),
    voyage: String(vessel.voyage || "").trim(),
    pol: String(vessel.portOfLoading || "").trim(),
    pod: String(vessel.portOfDischarge || "").trim(),
    shipping_line: String(vessel.shippingLine || "").trim(),
    dir_mix: String(vessel.direction || "").trim(),
    master_bl: String(vessel.masterBL || "").trim(),
    etd: vessel.etd || null,
    eta: vessel.eta || null,
    sector: String(vessel.sector || "").trim(),
    status: String(vessel.status || "NEW").trim(),
    load_date: vessel.loadDate || null,
    country: "Sri Lanka",
  };
}

export async function syncSriLankaVesselToExternal(vessel: Record<string, any>) {
  const record = buildSriLankaVesselRecord(vessel);

  if (!record) {
    throw new Error("Missing vessel id");
  }

  return await syncToExternalStrict("upsert_match", "vessels", record, "id", record.id);
}

export async function syncBookStockToExternal(record: SyncRecord) {
  const bookNumber = String(record.book_number ?? "");
  if (!bookNumber) return;

  await syncToExternal("upsert_match", "manage_invoice_book_stock", record, "book_number", bookNumber);
}

export function buildExternalInvoiceRecord(invoice: Record<string, any>) {
  const invoiceNumber = String(invoice.invoiceNumber || invoice.invoice_no || invoice.formData?.invoiceNumber || "");

  if (!invoiceNumber) {
    return null;
  }

  const packageItems = invoice.packageDetails || invoice.packageItems || invoice.formData?.packageDetails || [];
  const shipperName = invoice.shipperName || invoice.shipper_name || invoice.formData?.shipperName || "";
  const consigneeName = invoice.consigneeName || invoice.consignee_name || invoice.formData?.consigneeName || invoice.formData?.consignee1 || "";
  const bookNumber = invoice.bookNumber || invoice.book_no || invoice.formData?.bookNumber || invoice.selectedBookNumber || "";
  const pageNumber = invoice.pageNumber || invoice.page_no || invoice.formData?.pageNumber || invoiceNumber;
  const country = normalizeCountryName(invoice.country || invoice.formData?.country || "");
  const jobNumber = invoice.jobNumber || invoice.invoice_code || invoice.formData?.jobNumber || "";
  const totalAmount = toNumber(invoice.totalAmount ?? invoice.total ?? invoice.net ?? invoice.formData?.net ?? invoice.pricing?.net);
  const totalCbm = toNumber(invoice.totalVolume ?? invoice.total_cbm ?? invoice.volume ?? invoice.formData?.volume);
  const totalWeight = toNumber(invoice.totalWeight ?? invoice.total_gross_weight_kg ?? invoice.weight ?? invoice.formData?.weight);
  const numPackages = toNumber(invoice.totalPackages ?? invoice.num_packages ?? invoice.packages ?? invoice.formData?.packages ?? packageItems.length);

  return {
    invoice_no: invoiceNumber,
    book_no: String(bookNumber || ""),
    page_no: String(pageNumber || ""),
    invoice_code: String(jobNumber || country || ""),
    shipper_name: String(shipperName || ""),
    consignee_name: String(consigneeName || ""),
    total_amount: totalAmount,
    total_cbm: totalCbm,
    total_gross_weight_kg: totalWeight,
    num_packages: numPackages,
  };
}

export async function syncInvoiceToExternal(invoice: Record<string, any>) {
  const record = buildExternalInvoiceRecord(invoice);
  if (!record) return;

  await syncToExternal("upsert_match", "invoices", record, "invoice_no", String(record.invoice_no));
}

export async function syncScheduleBundleToExternal(schedule: Record<string, any>, jobs: Record<string, any>[]) {
  if (!schedule?.schedule_number) return;

  await syncToExternal(
    "sync_schedule_bundle",
    "schedules",
    {
      schedule: {
        schedule_number: schedule.schedule_number,
        schedule_date: schedule.schedule_date,
        vehicle: schedule.vehicle,
        sales_rep: schedule.sales_rep || null,
        driver: schedule.driver || null,
        helper: schedule.helper || null,
        country: schedule.country,
        total_jobs: schedule.total_jobs ?? jobs.length,
        status: schedule.status || "draft",
      },
      jobs,
    },
    "schedule_number",
    String(schedule.schedule_number),
  );
}