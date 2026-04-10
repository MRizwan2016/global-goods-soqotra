import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { calculateStorageFee, StorageFeeResult } from '@/utils/storageFeesCalculator';

export interface WarehouseStorageRecord {
  id: string;
  invoice_id: string | null;
  invoice_number: string;
  country: string;
  cargo_type: string;
  customer_name: string | null;
  warehouse_received_date: string;
  total_cbm: number;
  daily_rate: number;
  grace_period_days: number;
  storage_fee_paid: boolean;
  storage_invoice_number: string | null;
  paid_amount: number;
  paid_date: string | null;
  notes: string | null;
  created_by: string | null;
  // Computed
  feeResult?: StorageFeeResult;
}

export function useWarehouseStorage(country?: string) {
  const [records, setRecords] = useState<WarehouseStorageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('warehouse_storage' as any)
        .select('*')
        .order('warehouse_received_date', { ascending: true });

      if (country) {
        query = query.eq('country', country);
      }

      const { data, error } = await query;
      if (error) throw error;

      const enriched = ((data as any[]) || []).map((r: any): WarehouseStorageRecord => {
        const feeResult = calculateStorageFee(
          r.cargo_type === 'vehicle' ? 'vehicle' : 'personal_effects',
          r.warehouse_received_date,
          Number(r.total_cbm) || 0
        );
        return { ...r, feeResult };
      });

      setRecords(enriched);
    } catch (e) {
      console.error('Error loading warehouse storage:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [country]);

  const addRecord = async (record: Partial<WarehouseStorageRecord>) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('warehouse_storage' as any)
      .insert({ ...record, created_by: user?.id } as any);
    if (error) throw error;
    await loadRecords();
  };

  const updateRecord = async (id: string, updates: Partial<WarehouseStorageRecord>) => {
    const { error } = await supabase
      .from('warehouse_storage' as any)
      .update(updates as any)
      .eq('id', id);
    if (error) throw error;
    await loadRecords();
  };

  // Get storage fee for an invoice number
  const getStorageFeeForInvoice = (invoiceNumber: string): number => {
    const record = records.find(r => r.invoice_number === invoiceNumber && !r.storage_fee_paid);
    return record?.feeResult?.totalFee || 0;
  };

  // Get total unpaid storage fees
  const totalUnpaidFees = records
    .filter(r => !r.storage_fee_paid)
    .reduce((sum, r) => sum + (r.feeResult?.totalFee || 0), 0);

  return {
    records,
    loading,
    addRecord,
    updateRecord,
    loadRecords,
    getStorageFeeForInvoice,
    totalUnpaidFees,
  };
}
