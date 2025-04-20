
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: `Receipt-${receiptData.receiptNumber}`,
    onAfterPrint: () => toast.success("Receipt printed successfully"),
    onPrintError: () => toast.error("Failed to print receipt"),
    // Fixed: changed 'content' to 'body' which is the correct property
    body: () => receiptRef.current
  });

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2,
          logging: false,
          useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Receipt-${receiptData.receiptNumber}.pdf`);
        
        toast.success("PDF downloaded successfully");
      } catch (error) {
        console.error("PDF generation failed:", error);
        toast.error("Failed to generate PDF");
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Receipt',
          text: `Receipt #${receiptData.receiptNumber} for ${receiptData.customer}`,
          url: window.location.href
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast.error("Failed to share receipt");
        }
      }
    } else {
      toast.error("Sharing is not supported on this device");
    }
  };

  const currencySymbol = receiptData.currency === "USD" ? "$" : 
                         receiptData.currency === "EUR" ? "€" : 
                         receiptData.currency === "QAR" ? "QR" : 
                         receiptData.currency === "AED" ? "AED" : "";

  const qrData = JSON.stringify({
    receiptNumber: receiptData.receiptNumber,
    invoiceNumber: receiptData.invoiceNumber,
    amount: receiptData.amount,
    currency: receiptData.currency,
    date: receiptData.date,
    verified: true
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-0 overflow-hidden print:shadow-none print:border-none">
        <div ref={receiptRef} id="receipt-printable" className="print:p-6">
          <DialogHeader className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold text-indigo-800">Payment Receipt</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="print:hidden">
                <X size={18} />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/09288c32-edf3-48e9-9839-a23ae45397ae.png" 
                  alt="Soqotra Logo" 
                  className="h-12 mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = "/soqotra-logo.png"; // Fallback to local path
                    console.log("Using fallback logo path");
                  }}
                />
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">SOQOTRA</h2>
                  <p className="text-sm text-gray-600">Shipping & Logistics</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">Receipt #{receiptData.receiptNumber}</p>
                <p className="text-sm text-gray-600">{formatDate(receiptData.date)}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-md">
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
                <span className="font-bold text-green-700">{currencySymbol} {receiptData.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">{receiptData.paymentMethod}</span>
              </div>
              {receiptData.remarks && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Remarks:</span>
                  <span className="font-medium">{receiptData.remarks}</span>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-4 mb-6">
              <div className="text-center">
                <QRCodeSVG 
                  value={qrData} 
                  size={120} 
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"M"}
                  includeMargin={false}
                />
                <p className="text-xs text-gray-500 mt-2">Scan to verify receipt</p>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-4">
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
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Thank you for your business!</p>
              <p className="mt-1">For any questions, please contact support@soqotra.com</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 bg-gray-50 print:hidden">
          <div className="flex gap-2 w-full">
            <Button 
              onClick={() => handlePrint()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Printer className="mr-2" size={16} />
              Print Receipt
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              variant="outline" 
              className="flex-1"
            >
              <Download className="mr-2" size={16} />
              Download PDF
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline" 
              className="w-10 p-0"
            >
              <Share2 size={16} />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptView;
