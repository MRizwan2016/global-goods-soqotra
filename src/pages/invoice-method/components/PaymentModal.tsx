import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Invoice } from "../types/invoice";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PaymentModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ invoice, isOpen, onClose, onPaymentComplete }) => {
  const [discount, setDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [warehouse, setWarehouse] = useState("");
  const [remarks, setRemarks] = useState("");
  const [saving, setSaving] = useState(false);

  const gross = Number(invoice?.gross) || Number(invoice?.net) || Number(invoice?.amount) || 0;
  const existingPaid = Number(invoice?.totalPaid) || 0;
  const currencySymbol = invoice?.currency || "QAR";

  // Live calculation
  const liveCalc = useMemo(() => {
    const netAfterDiscount = Math.max(0, gross - discount);
    const outstandingBefore = Math.max(0, netAfterDiscount - existingPaid);
    const cappedPayment = Math.min(amountPaid, outstandingBefore);
    const balanceAfter = Math.max(0, outstandingBefore - cappedPayment);
    return { netAfterDiscount, outstandingBefore, cappedPayment, balanceAfter };
  }, [gross, discount, existingPaid, amountPaid]);

  // Reset when invoice changes
  React.useEffect(() => {
    if (invoice) {
      setDiscount(Number(invoice.discount) || 0);
      setAmountPaid(0);
      setPaymentMethod("Cash");
      setWarehouse(invoice.warehouse || "");
      setRemarks("");
    }
  }, [invoice]);

  const generateReceiptNumber = () => `SOQ-${String(Date.now()).slice(-6)}`;

  const handleSave = async (withReceipt: boolean) => {
    if (!invoice) return;
    if (liveCalc.cappedPayment <= 0) {
      toast.error("Enter a valid payment amount");
      return;
    }
    setSaving(true);
    try {
      const receiptNumber = generateReceiptNumber();
      const { error } = await supabase.from('payment_transactions' as any).insert({
        invoice_id: invoice.id,
        invoice_number: invoice.invoiceNumber,
        gross_amount: gross,
        discount_applied: discount,
        net_amount: liveCalc.netAfterDiscount,
        amount_paid: liveCalc.cappedPayment,
        balance_after: liveCalc.balanceAfter,
        payment_method: paymentMethod,
        warehouse: warehouse,
        currency: currencySymbol,
        country: invoice.country || '',
        receipt_number: receiptNumber,
        remarks: remarks,
        payment_date: new Date().toISOString().split('T')[0],
      } as any);

      if (error) throw error;

      // Update regional_invoices payment_status
      const newTotalPaid = existingPaid + liveCalc.cappedPayment;
      const newStatus = liveCalc.balanceAfter <= 0 ? 'PAID' : 'PARTIAL';
      await supabase.from('regional_invoices').update({
        payment_status: newStatus,
        discount: discount,
      } as any).eq('id', invoice.id);

      toast.success(`Payment of ${currencySymbol} ${liveCalc.cappedPayment.toFixed(2)} saved`);

      if (withReceipt) {
        await generateReceiptPDF(receiptNumber);
      }

      onPaymentComplete();
      onClose();
    } catch (err: any) {
      console.error("Payment save error:", err);
      toast.error(err.message || "Failed to save payment");
    } finally {
      setSaving(false);
    }
  };

  const generateReceiptPDF = async (receiptNumber: string) => {
    const container = document.createElement('div');
    container.style.cssText = 'position:absolute;left:-9999px;top:0;width:794px;padding:40px;background:white;font-family:Arial,sans-serif;';
    container.innerHTML = `
      <div style="text-align:center;margin-bottom:20px;">
        <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" style="height:80px;margin-bottom:10px;" crossorigin="anonymous" />
        <h1 style="margin:0;font-size:22px;color:#1e2a3a;">SOQOTRA LOGISTICS SERVICES</h1>
        <p style="margin:4px 0;color:#666;font-size:12px;">Transportation & Trading WLL</p>
        <hr style="border:2px solid #1e2a3a;margin:12px 0;" />
        <h2 style="margin:0;font-size:18px;color:#1e2a3a;">PAYMENT RECEIPT</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;width:40%;background:#f8f9fa;">Receipt Number</td><td style="padding:8px;border:1px solid #ddd;">${receiptNumber}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;">Invoice Number</td><td style="padding:8px;border:1px solid #ddd;">${invoice?.invoiceNumber}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;">Date</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleDateString()}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;">Customer</td><td style="padding:8px;border:1px solid #ddd;">${invoice?.consignee1 || invoice?.shipper1 || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;">Country</td><td style="padding:8px;border:1px solid #ddd;">${invoice?.country || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;">Warehouse</td><td style="padding:8px;border:1px solid #ddd;">${warehouse || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;">Payment Method</td><td style="padding:8px;border:1px solid #ddd;">${paymentMethod}</td></tr>
      </table>
      <h3 style="margin:20px 0 10px;font-size:16px;color:#1e2a3a;">Payment Breakdown</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#1e2a3a;color:white;"><th style="padding:10px;text-align:left;">Description</th><th style="padding:10px;text-align:right;">Amount (${currencySymbol})</th></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;">Gross Amount</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">${gross.toFixed(2)}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;">Discount</td><td style="padding:10px;border:1px solid #ddd;text-align:right;color:#e53e3e;">- ${discount.toFixed(2)}</td></tr>
        <tr style="font-weight:bold;"><td style="padding:10px;border:1px solid #ddd;">Net Amount</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">${liveCalc.netAfterDiscount.toFixed(2)}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;">Previously Paid</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">${existingPaid.toFixed(2)}</td></tr>
        <tr style="background:#e6f7e6;font-weight:bold;"><td style="padding:10px;border:1px solid #ddd;">Amount Paid Now</td><td style="padding:10px;border:1px solid #ddd;text-align:right;color:#276749;">${liveCalc.cappedPayment.toFixed(2)}</td></tr>
        <tr style="background:#fff3e0;font-weight:bold;"><td style="padding:10px;border:1px solid #ddd;">Balance Due</td><td style="padding:10px;border:1px solid #ddd;text-align:right;color:#c05621;">${liveCalc.balanceAfter.toFixed(2)}</td></tr>
      </table>
      ${remarks ? `<p style="margin-top:16px;font-style:italic;color:#666;">Remarks: ${remarks}</p>` : ''}
      <div style="margin-top:40px;text-align:center;color:#999;font-size:11px;">
        <p>Thank you for your payment</p>
        <p>This is a computer-generated receipt</p>
      </div>
    `;
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, { scale: 2, useCORS: true });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, 297));
      pdf.save(`Receipt_${receiptNumber}.pdf`);
      toast.success("Receipt PDF downloaded");
    } catch (e) {
      console.error("PDF generation error:", e);
      toast.error("Could not generate PDF");
    } finally {
      document.body.removeChild(container);
    }
  };

  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Payment for {invoice.invoiceNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-3 text-sm bg-muted/50 p-3 rounded-md">
            <div><span className="font-medium">Customer:</span> {invoice.consignee1 || invoice.shipper1 || 'N/A'}</div>
            <div><span className="font-medium">Country:</span> {invoice.country || 'N/A'}</div>
            <div><span className="font-medium">Currency:</span> {currencySymbol}</div>
            <div><span className="font-medium">Gross:</span> {currencySymbol} {gross.toFixed(2)}</div>
          </div>

          {/* Discount */}
          <div>
            <Label>Discount ({currencySymbol})</Label>
            <Input type="number" min={0} max={gross} value={discount} onChange={e => setDiscount(Math.max(0, Number(e.target.value)))} />
          </div>

          {/* Payment Amount */}
          <div>
            <Label>Payment Amount ({currencySymbol})</Label>
            <Input type="number" min={0} max={liveCalc.outstandingBefore} value={amountPaid} onChange={e => setAmountPaid(Math.max(0, Number(e.target.value)))} />
          </div>

          {/* Live balance display */}
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-xs text-muted-foreground">Net</div>
              <div className="font-bold">{currencySymbol} {liveCalc.netAfterDiscount.toFixed(2)}</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="text-xs text-muted-foreground">Paying</div>
              <div className="font-bold text-green-700">{currencySymbol} {liveCalc.cappedPayment.toFixed(2)}</div>
            </div>
            <div className={`p-2 rounded ${liveCalc.balanceAfter > 0 ? 'bg-orange-50' : 'bg-green-50'}`}>
              <div className="text-xs text-muted-foreground">Balance</div>
              <div className={`font-bold ${liveCalc.balanceAfter > 0 ? 'text-orange-700' : 'text-green-700'}`}>
                {currencySymbol} {liveCalc.balanceAfter.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Payment method & warehouse */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Warehouse</Label>
              <Input value={warehouse} onChange={e => setWarehouse(e.target.value)} placeholder="e.g. Colombo Port" />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <Label>Remarks</Label>
            <Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Optional notes" />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button onClick={() => handleSave(false)} disabled={saving || liveCalc.cappedPayment <= 0} className="flex-1">
              {saving ? 'Saving...' : 'Save Payment'}
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving || liveCalc.cappedPayment <= 0} className="flex-1 bg-green-600 hover:bg-green-700">
              {saving ? 'Saving...' : 'Save & Receipt'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
