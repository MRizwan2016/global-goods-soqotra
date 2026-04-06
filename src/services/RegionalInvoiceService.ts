import { supabase } from "@/integrations/supabase/client";

export interface RegionalInvoiceRow {
  id: string;
  country: string;
  invoice_number: string;
  invoice_date: string | null;
  job_number: string | null;
  book_number: string | null;
  page_number: string | null;
  cargo_type: string | null;
  service_type: string | null;
  freight_by: string | null;
  shipper_prefix: string | null;
  shipper_name: string | null;
  shipper_country: string | null;
  shipper_city: string | null;
  shipper_address: string | null;
  shipper_mobile: string | null;
  shipper_email: string | null;
  shipper_id_number: string | null;
  consignee_prefix: string | null;
  consignee_name: string | null;
  consignee_country: string | null;
  consignee_city: string | null;
  consignee_district: string | null;
  consignee_province: string | null;
  consignee_address: string | null;
  consignee_delivery_address: string | null;
  consignee_mobile: string | null;
  consignee_landline: string | null;
  consignee_email: string | null;
  consignee_id_number: string | null;
  sales_representative: string | null;
  driver_name: string | null;
  whatsapp_number: string | null;
  destination: string | null;
  terminal: string | null;
  warehouse: string | null;
  sector: string | null;
  port: string | null;
  district: string | null;
  door_to_door: string | null;
  total_packages: number | null;
  total_weight: number | null;
  total_volume: number | null;
  description: string | null;
  rate: number | null;
  freight: number | null;
  documents_fee: number | null;
  local_transport: number | null;
  destination_transport: number | null;
  packing_charges: number | null;
  storage: number | null;
  destination_clearing: number | null;
  destination_door_delivery: number | null;
  transportation_fee: number | null;
  other: number | null;
  gross: number | null;
  discount: number | null;
  net: number | null;
  payment_method: string | null;
  payment_status: string | null;
  payment_date: string | null;
  banking_date: string | null;
  receipt_number: string | null;
  status: string | null;
  remarks: string | null;
  gift_cargo: string | null;
  pre_paid: string | null;
  extra_data: Record<string, any> | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegionalInvoicePackageRow {
  id: string;
  invoice_id: string;
  package_name: string | null;
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number | null;
  quantity: number | null;
  cubic_metre: number | null;
  cubic_feet: number | null;
  volume_weight: number | null;
  box_number: number | null;
  price: number | null;
  volume: string | null;
  created_at: string;
}

export class RegionalInvoiceService {
  /**
   * Load all invoices for a given country
   */
  static async getByCountry(country: string): Promise<RegionalInvoiceRow[]> {
    const { data, error } = await supabase
      .from('regional_invoices' as any)
      .select('*')
      .eq('country', country)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading regional invoices:', error);
      return [];
    }
    return (data || []) as unknown as RegionalInvoiceRow[];
  }

  /**
   * Load a single invoice by ID, including its packages
   */
  static async getById(id: string): Promise<{ invoice: RegionalInvoiceRow; packages: RegionalInvoicePackageRow[] } | null> {
    const { data: invoice, error } = await supabase
      .from('regional_invoices' as any)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error || !invoice) {
      console.error('Error loading invoice:', error);
      return null;
    }
    const { data: packages, error: pkgErr } = await supabase
      .from('regional_invoice_packages' as any)
      .select('*')
      .eq('invoice_id', id)
      .order('box_number', { ascending: true });
    if (pkgErr) console.error('Error loading packages:', pkgErr);
    return {
      invoice: invoice as unknown as RegionalInvoiceRow,
      packages: (packages || []) as unknown as RegionalInvoicePackageRow[]
    };
  }

  /**
   * Save (insert or update) an invoice and its packages
   */
  static async save(
    invoiceData: Partial<RegionalInvoiceRow>,
    packages: Partial<RegionalInvoicePackageRow>[],
    existingId?: string
  ): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (existingId) {
      // Update existing
      const { error } = await supabase
        .from('regional_invoices' as any)
        .update({ ...invoiceData, updated_at: new Date().toISOString() } as any)
        .eq('id', existingId);
      if (error) {
        console.error('Error updating invoice:', error);
        return null;
      }
      // Delete old packages, insert new
      await supabase.from('regional_invoice_packages' as any).delete().eq('invoice_id', existingId);
      if (packages.length > 0) {
        const pkgRows = packages.map(p => ({ ...p, invoice_id: existingId }));
        await supabase.from('regional_invoice_packages' as any).insert(pkgRows as any);
      }
      return existingId;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('regional_invoices' as any)
        .insert({ ...invoiceData, created_by: userId } as any)
        .select('id')
        .single();
      if (error || !data) {
        console.error('Error inserting invoice:', error);
        return null;
      }
      const newId = (data as any).id;
      if (packages.length > 0) {
        const pkgRows = packages.map(p => ({ ...p, invoice_id: newId }));
        await supabase.from('regional_invoice_packages' as any).insert(pkgRows as any);
      }
      return newId;
    }
  }

  /**
   * Delete an invoice (cascades to packages)
   */
  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('regional_invoices' as any)
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting invoice:', error);
      return false;
    }
    return true;
  }
}
