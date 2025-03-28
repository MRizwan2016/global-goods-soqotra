
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ReceiptViewProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: {
    receiptNumber: string;
    invoiceNumber: string;
    date: string;
    customer: string;
    amount: number;
    paymentMethod: string;
    currency: string;
    remarks?: string;
  };
}

const ReceiptView: React.FC<ReceiptViewProps> = ({
  isOpen,
  onClose,
  receiptData,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const currencySymbol = receiptData.currency === "USD" ? "$" : 
                         receiptData.currency === "EUR" ? "€" : 
                         receiptData.currency === "QAR" ? "QR" : "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-0 overflow-hidden">
        <div id="receipt-printable" className="print:p-6">
          <DialogHeader className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold text-indigo-800">Payment Receipt</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="print:hidden">
                <X size={18} />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="p-6">
            {/* Company Header */}
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <div className="flex items-center">
                <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-12 mr-4" />
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">SOQOTRA</h2>
                  <p className="text-sm text-gray-600">Shipping & Logistics</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Receipt #{receiptData.receiptNumber}</p>
                <p className="text-sm text-gray-600">{formatDate(receiptData.date)}</p>
              </div>
            </div>
            
            {/* Receipt Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Invoice Number:</span>
                <span className="font-medium">{receiptData.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">{receiptData.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">{currencySymbol} {receiptData.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{receiptData.paymentMethod}</span>
              </div>
              {receiptData.remarks && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Remarks:</span>
                  <span className="font-medium">{receiptData.remarks}</span>
                </div>
              )}
            </div>
            
            {/* Signature Section */}
            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-8">Customer Signature</p>
                  <div className="border-t border-gray-300 w-32"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-8">Authorized Signature</p>
                  <div className="border-t border-gray-300 w-32"></div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Thank you for your business!</p>
              <p className="mt-1">For any questions, please contact support@soqotra.com</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 bg-gray-50 print:hidden">
          <div className="flex gap-2 w-full">
            <Button onClick={handlePrint} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Printer size={16} className="mr-2" />
              Print Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptView;
