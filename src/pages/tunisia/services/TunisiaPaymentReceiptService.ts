import { supabase } from "@/integrations/supabase/client";

export interface TunisiaPaymentReceipt {
  id?: string;
  receipt_number: string;
  invoice_id: string;
  invoice_number: string;
  amount: number;
  payment_method: string;
  payment_date: string;
  notes?: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export class TunisiaPaymentReceiptService {
  static async createPaymentReceipt(receiptData: Omit<TunisiaPaymentReceipt, 'id' | 'created_at' | 'updated_at'>): Promise<TunisiaPaymentReceipt> {
    const { data, error } = await supabase
      .from('tunisia_payment_receipts')
      .insert(receiptData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create payment receipt: ${error.message}`);
    }

    return data;
  }

  static async getPaymentReceiptsByInvoice(invoiceId: string): Promise<TunisiaPaymentReceipt[]> {
    const { data, error } = await supabase
      .from('tunisia_payment_receipts')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch payment receipts: ${error.message}`);
    }

    return data || [];
  }

  static async getAllPaymentReceipts(): Promise<TunisiaPaymentReceipt[]> {
    const { data, error } = await supabase
      .from('tunisia_payment_receipts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch payment receipts: ${error.message}`);
    }

    return data || [];
  }

  static async getPaymentReceiptByNumber(receiptNumber: string): Promise<TunisiaPaymentReceipt | null> {
    const { data, error } = await supabase
      .from('tunisia_payment_receipts')
      .select('*')
      .eq('receipt_number', receiptNumber)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No record found
      }
      throw new Error(`Failed to fetch payment receipt: ${error.message}`);
    }

    return data;
  }

  static async updatePaymentReceipt(id: string, updates: Partial<TunisiaPaymentReceipt>): Promise<TunisiaPaymentReceipt> {
    const { data, error } = await supabase
      .from('tunisia_payment_receipts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update payment receipt: ${error.message}`);
    }

    return data;
  }

  static async deletePaymentReceipt(id: string): Promise<void> {
    const { error } = await supabase
      .from('tunisia_payment_receipts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete payment receipt: ${error.message}`);
    }
  }

  static generateReceiptNumber(invoiceNumber: string): string {
    return `RCT${invoiceNumber}`;
  }
}