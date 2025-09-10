import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Printer } from "lucide-react";
import { TunisiaInvoice, PaymentDetails } from "../types/tunisiaInvoiceTypes";
import { TunisiaStorageService } from "../services/TunisiaStorageService";
import { TunisiaPaymentReceiptService } from "../services/TunisiaPaymentReceiptService";
import { toast } from "sonner";
import TunisiaPrintStyles from "./TunisiaPrintStyles";

interface TunisiaPaymentReceiptGeneratorProps {
  invoice: TunisiaInvoice;
  onBack: () => void;
}

const TunisiaPaymentReceiptGenerator: React.FC<TunisiaPaymentReceiptGeneratorProps> = ({
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

  const [receiptNumber] = useState(`RCT${invoice.invoiceNumber}`);

  const [showReceipt, setShowReceipt] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateReceipt = async () => {
    try {
      // Update invoice payment status
      const updatedInvoice = {
        ...invoice,
        paymentStatus: "paid" as const,
        paymentDetails: paymentDetails
      };
      
      // Save updated invoice
      TunisiaStorageService.addInvoice(updatedInvoice);

      // Save payment receipt to database
      const receiptData = {
        receipt_number: receiptNumber,
        invoice_id: invoice.id,
        invoice_number: invoice.invoiceNumber,
        amount: paymentDetails.amount,
        payment_method: paymentDetails.method,
        payment_date: paymentDetails.date,
        notes: paymentDetails.notes,
        user_id: "tunisia-user-default" // Fixed user ID for Tunisia project
      };

      await TunisiaPaymentReceiptService.createPaymentReceipt(receiptData);
      
      setShowReceipt(true);
      toast.success(`Payment receipt ${receiptNumber} saved successfully!`);
    } catch (error) {
      console.error('Error saving payment receipt:', error);
      toast.error('Failed to save payment receipt. Please try again.');
    }
  };

  if (showReceipt) {
    return (
      <>
        <TunisiaPrintStyles />
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex gap-4 print:hidden">
            <Button variant="outline" onClick={() => setShowReceipt(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit Payment
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
          </div>

          {/* Payment Receipt - This is what gets printed */}
          <div id="tunisia-payment-receipt-print" className="bg-white p-8 border rounded-lg shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">SOQOTRA LOGISTICS SERVICES,</h1>
              <h2 className="text-lg font-semibold">TRANSPORTATION & TRADING WLL</h2>
              <p className="text-sm">Vehicle & Personal Effects Shipping</p>
              <div className="mt-4 text-lg font-semibold">PAYMENT RECEIPT</div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Receipt No:</span>
                    <span className="font-medium">{receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Date:</span>
                    <span className="font-medium">{new Date(paymentDetails.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-medium">{paymentDetails.method}</span>
                  </div>
                  {paymentDetails.transactionId && (
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="font-medium">{paymentDetails.transactionId}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Amount Paid:</span>
                    <span className="font-bold text-lg">QAR {paymentDetails.amount.toLocaleString()}</span>
                  </div>
                  {paymentDetails.amount < invoice.totalAmount && (
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold text-red-600">Balance Due:</span>
                      <span className="font-bold text-lg text-red-600">QAR {(invoice.totalAmount - paymentDetails.amount).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{invoice.customer.prefix} {invoice.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile:</span>
                    <span className="font-medium">{invoice.customer.mobile}</span>
                  </div>
                  {invoice.customer.metrashMobile && (
                    <div className="flex justify-between">
                      <span>Metrash Mobile:</span>
                      <span className="font-medium">{invoice.customer.metrashMobile}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Invoice No:</span>
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                  </div>
                  {invoice.hblNumber && (
                    <div className="flex justify-between">
                      <span>HBL No:</span>
                      <span className="font-medium">{invoice.hblNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Make/Model:</span>
                    <span className="font-medium">{invoice.vehicle.make} {invoice.vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year/Color:</span>
                    <span className="font-medium">{invoice.vehicle.year} • {invoice.vehicle.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{invoice.vehicle.type}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Chassis No:</span>
                    <span className="font-medium">{invoice.vehicle.chassisNumber}</span>
                  </div>
                  {invoice.vehicle.exportPlate && (
                    <div className="flex justify-between">
                      <span>Export Plate:</span>
                      <span className="font-medium">{invoice.vehicle.exportPlate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Freight Charge:</span>
                    <span className="font-medium">QAR {invoice.vehicle.freightCharge.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {invoice.personalEffects && invoice.personalEffects.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Personal Effects</h3>
                <div className="space-y-2 text-sm">
                  {invoice.personalEffects.map((effect, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{effect.description} ({effect.quantity} items, {effect.volume} CBM)</span>
                      <span className="font-medium">QAR {effect.charges.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentDetails.notes && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Notes</h3>
                <p className="text-sm">{paymentDetails.notes}</p>
              </div>
            )}

            <div className="border-t pt-4 text-center">
              <p className="text-xs mt-2">
                For queries, contact: +974-44412770 & +974-44412773 | Email: accounts@soqotralogistics.com
              </p>
            </div>
          </div>
        </div>
      </>
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
        {/* Payment Form */}
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
              {paymentDetails.amount < invoice.totalAmount && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-medium">QAR {invoice.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Paid:</span>
                      <span className="font-medium">QAR {paymentDetails.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 mt-1">
                      <span className="font-semibold text-red-600">Balance Due:</span>
                      <span className="font-bold text-red-600">QAR {(invoice.totalAmount - paymentDetails.amount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
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

        {/* Invoice Summary */}
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
              <div className="flex justify-between">
                <span>Vehicle Freight:</span>
                <span>QAR {invoice.vehicle.freightCharge.toLocaleString()}</span>
              </div>
              {invoice.personalEffects && (
                <div className="flex justify-between">
                  <span>Personal Effects:</span>
                  <span>QAR {invoice.personalEffects.reduce((sum, effect) => sum + effect.charges, 0).toLocaleString()}</span>
                </div>
              )}
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

export default TunisiaPaymentReceiptGenerator;
