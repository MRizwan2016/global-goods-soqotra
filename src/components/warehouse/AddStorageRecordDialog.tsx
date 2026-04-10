import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Warehouse, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { debounce } from 'lodash';

interface AddStorageRecordDialogProps {
  country: string;
  onAdd: (record: any) => Promise<void>;
}

const AddStorageRecordDialog: React.FC<AddStorageRecordDialogProps> = ({ country, onAdd }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [form, setForm] = useState({
    invoice_number: '',
    customer_name: '',
    cargo_type: 'vehicle',
    warehouse_received_date: new Date().toISOString().split('T')[0],
    total_cbm: 0,
    notes: '',
  });

  const lookupInvoice = useCallback(
    debounce(async (invoiceNumber: string) => {
      if (!invoiceNumber || invoiceNumber.length < 3) return;
      setLookupLoading(true);
      try {
        const { data } = await supabase
          .from('regional_invoices')
          .select('shipper_name, total_volume')
          .eq('invoice_number', invoiceNumber)
          .maybeSingle();
        if (data) {
          setForm(f => ({
            ...f,
            customer_name: data.shipper_name || '',
            total_cbm: Number(data.total_volume) || 0,
          }));
        }
      } catch (e) {
        console.error('Invoice lookup failed:', e);
      } finally {
        setLookupLoading(false);
      }
    }, 500),
    []
  );
  const handleSubmit = async () => {
    if (!form.invoice_number) {
      toast.error('Invoice number is required');
      return;
    }
    try {
      await onAdd({
        ...form,
        country,
        daily_rate: form.cargo_type === 'vehicle' ? 100 : (200 / 30) * form.total_cbm,
        grace_period_days: form.cargo_type === 'vehicle' ? 14 : 0,
      });
      toast.success('Storage record added');
      setOpen(false);
      setForm({ invoice_number: '', customer_name: '', cargo_type: 'vehicle', warehouse_received_date: new Date().toISOString().split('T')[0], total_cbm: 0, notes: '' });
    } catch (e) {
      toast.error('Failed to add record');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Warehouse className="h-4 w-4" />
          {t('storage.addRecord')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('storage.addRecord')} — {country}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>{t('table.invoiceNumber')}</Label>
            <div className="relative">
              <Input value={form.invoice_number} onChange={e => {
                const val = e.target.value;
                setForm(f => ({ ...f, invoice_number: val }));
                lookupInvoice(val);
              }} />
              {lookupLoading && <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-3 text-muted-foreground" />}
            </div>
          </div>
          <div>
            <Label>{t('table.customer')}</Label>
            <Input value={form.customer_name} readOnly className="bg-muted" />
          </div>
          <div>
            <Label>{t('storage.cargoType')}</Label>
            <Select value={form.cargo_type} onValueChange={v => setForm(f => ({ ...f, cargo_type: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="vehicle">{t('storage.vehicle')}</SelectItem>
                <SelectItem value="personal_effects">{t('storage.personalEffects')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t('storage.receivedDate')}</Label>
            <Input type="date" value={form.warehouse_received_date} onChange={e => setForm(f => ({ ...f, warehouse_received_date: e.target.value }))} />
          </div>
          <div>
            <Label>{t('table.volume')} (CBM)</Label>
            <Input type="number" step="0.01" value={form.total_cbm} readOnly className="bg-muted" />
          </div>
          <div>
            <Label>{t('storage.notes')}</Label>
            <Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <Button onClick={handleSubmit} className="w-full">{t('action.save')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStorageRecordDialog;
