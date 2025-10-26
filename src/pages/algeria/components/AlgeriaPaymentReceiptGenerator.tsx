import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { AlgeriaInvoice, PaymentDetails } from "../types/algeriaInvoiceTypes";
import { AlgeriaStorageService } from "../services/AlgeriaStorageService";
import { AlgeriaPaymentReceiptService } from "../services/AlgeriaPaymentReceiptService";
import ReceiptView from "@/components/payment/ReceiptView";
import { toast } from "sonner";

interface AlgeriaPaymentReceiptGeneratorProps {
  invoice: AlgeriaInvoice;
  onBack: () => void;
}

const AlgeriaPaymentReceiptGenerator: React.FC<AlgeriaPaymentReceiptGeneratorProps> = ({
  invoice,
  onBack
}) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: "CASH",
    transactionId: "",
    amount: invoice.totalAmount,
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const [receiptNumber] = useState(`ALG-${invoice.invoiceNumber.replace(/\//g, '-')}-${Date.now()}`);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleGenerateReceipt = async () => {
    try {
      const updatedInvoice = {
        ...invoice,
        paymentStatus: "paid" as const,
        paymentDetails: paymentDetails
      };
      
      await AlgeriaStorageService.addInvoice(updatedInvoice);

      // Save receipt record
      await AlgeriaPaymentReceiptService.saveReceipt({
        id: crypto.randomUUID(),
        receiptNumber,
        invoiceNumber: invoice.invoiceNumber,
        date: paymentDetails.date,
        customer: `${invoice.customer.prefix} ${invoice.customer.name}`,
        amount: paymentDetails.amount,
        paymentMethod: paymentDetails.method,
        currency: "QAR",
        remarks: paymentDetails.notes
      });
      
      setShowReceipt(true);
      toast.success(`Payment receipt ${receiptNumber} generated successfully!`);
    } catch (error) {
      console.error('Error saving payment receipt:', error);
      toast.error('Failed to save payment receipt. Please try again.');
    }
  };

  if (showReceipt) {
    return (
      <ReceiptView
        isOpen={showReceipt}
        onClose={() => {
          setShowReceipt(false);
          onBack();
        }}
        receiptData={{
          receiptNumber,
          invoiceNumber: invoice.invoiceNumber,
          date: paymentDetails.date,
          customer: `${invoice.customer.prefix} ${invoice.customer.name}`,
          amount: paymentDetails.amount,
          paymentMethod: paymentDetails.method,
          currency: "QAR",
          remarks: paymentDetails.notes
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Generate Payment Receipt</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Payment Method *</Label>
              <Select value={paymentDetails.method} onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, method: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CARD">Credit/Debit Card</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CHEQUE">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentDetails.method !== "CASH" && (
              <div>
                <Label>Transaction ID</Label>
                <Input
                  value={paymentDetails.transactionId}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, transactionId: e.target.value }))}
                  placeholder="Enter transaction reference"
                />
              </div>
            )}

            <div>
              <Label>Amount Paid (QAR) *</Label>
              <Input
                type="number"
                value={paymentDetails.amount}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, amount: Number(e.target.value) }))}
              />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-semibold text-blue-800 mb-3">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Invoice Amount:</span>
                  <span className="font-medium">QAR {invoice.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Being Paid:</span>
                  <span className="font-bold text-green-600">QAR {paymentDetails.amount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className={`font-semibold ${paymentDetails.amount < invoice.totalAmount ? 'text-red-600' : 'text-green-600'}`}>
                      {paymentDetails.amount < invoice.totalAmount ? 'Balance Due:' : 'Payment Status:'}
                    </span>
                    <span className={`font-bold ${paymentDetails.amount < invoice.totalAmount ? 'text-red-600' : 'text-green-600'}`}>
                      {paymentDetails.amount < invoice.totalAmount 
                        ? `QAR ${(invoice.totalAmount - paymentDetails.amount).toLocaleString()}`
                        : 'FULLY PAID'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Payment Date *</Label>
              <Input
                type="date"
                value={paymentDetails.date}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <Label>Notes</Label>
              <Input
                value={paymentDetails.notes}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes (optional)"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Invoice No:</span>
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-medium">{invoice.customer.prefix} {invoice.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="font-medium">{invoice.vehicle.make} {invoice.vehicle.model}</span>
              </div>
              <div className="flex justify-between bg-blue-50 p-2 rounded">
                <span className="font-semibold">Export Plate:</span>
                <span className="font-bold text-primary">{invoice.vehicle.exportPlate}</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle Freight:</span>
                <span>QAR {invoice.vehicle.freightCharge.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>QAR {invoice.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleGenerateReceipt} disabled={!paymentDetails.amount || !paymentDetails.date}>
          Generate Receipt
        </Button>
      </div>
    </div>
  );
};

export default AlgeriaPaymentReceiptGenerator;
