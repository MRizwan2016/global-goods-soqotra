import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { WarehouseStorageRecord } from '@/hooks/useWarehouseStorage';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import ReceiptView from '@/components/payment/ReceiptView';

interface StoragePaymentDialogProps {
  record: WarehouseStorageRecord;
  onPaymentComplete: (id: string, amount: number) => Promise<void>;
}

const StoragePaymentDialog: React.FC<StoragePaymentDialogProps> = ({ record, onPaymentComplete }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState(record.feeResult?.totalFee || 0);
  const [remarks, setRemarks] = useState('');
  const [receiptData, setReceiptData] = useState<any>(null);

  const totalFee = record.feeResult?.totalFee || 0;

  const handleSubmit = async () => {
    if (amountPaid <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }
    setLoading(true);
    try {
      const receiptNumber = `STR-${Date.now().toString().slice(-6)}`;

      // Save payment transaction to database
      const { data: { user } } = await supabase.auth.getUser();
      await supabase
        .from('payment_transactions')
        .insert({
          invoice_number: record.invoice_number,
          invoice_id: record.invoice_id || null,
          amount_paid: amountPaid,
          payment_method: paymentMethod,
          receipt_number: receiptNumber,
          country: record.country,
          currency: 'QAR',
          remarks: `Storage Fee Payment - ${remarks}`.trim(),
          payment_date: new Date().toISOString().split('T')[0],
          gross_amount: totalFee,
          net_amount: totalFee,
          balance_after: Math.max(0, totalFee - amountPaid),
          created_by: user?.id,
        } as any);

      // Mark storage as paid
      await onPaymentComplete(record.id, amountPaid);

      const receipt = {
        receiptNumber,
        invoiceNumber: record.invoice_number,
        date: new Date().toLocaleDateString(),
        customer: record.customer_name || '-',
        amount: amountPaid,
        paymentMethod,
        currency: 'QAR',
        remarks: `Storage Fee Payment${remarks ? ' - ' + remarks : ''}`,
      };
      setReceiptData(receipt);
      setOpen(false);
      setShowReceipt(true);
      toast.success('Payment recorded successfully');
    } catch (e) {
      console.error('Payment error:', e);
      toast.error('Failed to record payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm" className="gap-1 text-xs">
            <CreditCard className="h-3 w-3" />
            {t('action.pay') || 'Pay'}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('storage.storageFee')} — {t('action.pay') || 'Payment'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between"><span>{t('table.invoiceNumber')}:</span><span className="font-medium">{record.invoice_number}</span></div>
              <div className="flex justify-between"><span>{t('table.customer')}:</span><span className="font-medium">{record.customer_name || '-'}</span></div>
              <div className="flex justify-between"><span>{t('storage.daysInStorage')}:</span><span className="font-medium">{record.feeResult?.daysInStorage || 0}</span></div>
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>{t('storage.totalStorageFee')}:</span>
                <span className="text-destructive">QAR {totalFee.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Amount Paid (QAR)</Label>
              <Input type="number" step="0.01" value={amountPaid} onChange={e => setAmountPaid(Number(e.target.value))} />
            </div>

            <div>
              <Label>Remarks</Label>
              <Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Optional remarks" />
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? 'Processing...' : `Confirm Payment — QAR ${amountPaid.toFixed(2)}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {receiptData && (
        <ReceiptView
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          receiptData={receiptData}
        />
      )}
    </>
  );
};

export default StoragePaymentDialog;
