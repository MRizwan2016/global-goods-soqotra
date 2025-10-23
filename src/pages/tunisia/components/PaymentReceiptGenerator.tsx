import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, Receipt } from "lucide-react";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";

interface PaymentReceiptGeneratorProps {
  invoice: TunisiaInvoice;
  onBack: () => void;
}

const PaymentReceiptGenerator: React.FC<PaymentReceiptGeneratorProps> = ({
  invoice,
  onBack
}) => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: "CASH",
    transactionId: "",
    paidAmount: invoice.totalAmount,
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const [showReceipt, setShowReceipt] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  if (showReceipt) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 print:hidden">
          <Button variant="outline" onClick={() => setShowReceipt(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Edit Payment Details
          </Button>
          <Button onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" />
            Print Receipt
          </Button>
        </div>

        {/* Payment Receipt */}
        <div id="tunisia-payment-receipt-print" className="tunisia-payment-receipt max-w-2xl mx-auto p-8 bg-white print:p-4 print:shadow-none shadow-lg border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary mb-2">PAYMENT RECEIPT</h1>
            <div className="text-lg font-bold text-green-600">SOQOTRA LOGISTICS</div>
            <div className="text-sm text-muted-foreground">SERVICES AND TRADING</div>
            <div className="text-xs mt-2">
              <p>Office 3, 1st Floor, Building: 53, Street 76, Azzia Commercial Street,</p>
              <p>P.O. Box: 55561, Al Aziziyah, Doha, State of Qatar.</p>
            </div>
          </div>

          <div className="border-t border-b py-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold">Receipt No:</p>
                <p className="text-lg">{invoice.invoiceNumber}-RCP</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">Date:</p>
                <p className="text-lg">{paymentDetails.paymentDate}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Customer Information</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Name:</strong> {invoice.customer.name}</p>
                <p><strong>Mobile:</strong> {invoice.customer.mobile}</p>
                <p><strong>Address:</strong> {invoice.customer.address}</p>
                {invoice.customer.email && <p><strong>Email:</strong> {invoice.customer.email}</p>}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Vehicle Information</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Make & Model:</strong> {invoice.vehicle.make} {invoice.vehicle.model}</p>
                <p><strong>Year:</strong> {invoice.vehicle.year}</p>
                <p><strong>Export Plate:</strong> {invoice.vehicle.exportPlate}</p>
                <p><strong>Chassis Number:</strong> {invoice.vehicle.chassisNumber}</p>
                {invoice.hblNumber && <p><strong>House B/L No:</strong> {invoice.hblNumber}</p>}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Payment Details</h3>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><strong>Vehicle Freight:</strong></p>
                    <p className="text-lg">QAR {invoice.vehicle.freightCharge.toLocaleString()}</p>
                  </div>
                  {invoice.personalEffects && invoice.personalEffects.length > 0 && (
                    <div>
                      <p><strong>Personal Effects:</strong></p>
                      <p className="text-lg">QAR {invoice.personalEffects.reduce((sum, effect) => sum + effect.charges, 0).toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <div className="border-t mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">Total Amount Paid:</p>
                    <p className="text-2xl font-bold text-green-600">QAR {paymentDetails.paidAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
                  {paymentDetails.transactionId && (
                    <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Thank you for your business!
            </p>
            <p className="text-xs text-muted-foreground">
              This is a computer-generated receipt and does not require a signature.
            </p>
          </div>
        </div>
      </div>
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

      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Payment Method</Label>
              <select 
                className="w-full border rounded px-3 py-2"
                value={paymentDetails.paymentMethod}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, paymentMethod: e.target.value }))}
              >
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CARD">Card Payment</option>
                <option value="CHEQUE">Cheque</option>
              </select>
            </div>
            <div>
              <Label>Transaction ID (Optional)</Label>
              <Input
                value={paymentDetails.transactionId}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, transactionId: e.target.value }))}
                placeholder="Enter transaction reference"
              />
            </div>
            <div>
              <Label>Amount Paid (QAR)</Label>
              <Input
                type="number"
                value={paymentDetails.paidAmount}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, paidAmount: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label>Payment Date</Label>
              <Input
                type="date"
                value={paymentDetails.paymentDate}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, paymentDate: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="font-medium">{invoice.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Vehicle:</span>
              <span className="font-medium">{invoice.vehicle.make} {invoice.vehicle.model}</span>
            </div>
            <div className="flex justify-between">
              <span>Export Plate:</span>
              <span className="font-medium">{invoice.vehicle.exportPlate}</span>
            </div>
            {invoice.hblNumber && (
              <div className="flex justify-between">
                <span>House B/L No:</span>
                <span className="font-medium">{invoice.hblNumber}</span>
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

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={() => setShowReceipt(true)}>
          <Receipt className="h-4 w-4 mr-2" />
          Generate Receipt
        </Button>
      </div>
    </div>
  );
};

export default PaymentReceiptGenerator;