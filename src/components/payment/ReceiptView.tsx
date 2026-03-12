
import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReceiptHeader from "./ReceiptHeader";
import ReceiptContent from "./ReceiptContent";
import ReceiptActions from "./ReceiptActions";
import { useReceiptActions } from "./hooks/useReceiptActions";

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
  const { handlePrint, handleDownloadPDF, handleShare, handleWhatsAppShare } = useReceiptActions(
    receiptRef, 
    receiptData.receiptNumber,
    receiptData
  );

  const currencySymbol = receiptData.currency === "USD" ? "$" : 
                        receiptData.currency === "EUR" ? "€" : 
                        receiptData.currency === "QAR" ? "QR" : 
                        receiptData.currency === "AED" ? "AED" : "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-0 overflow-hidden print:shadow-none print:border-none">
        <div ref={receiptRef} id="receipt-printable" className="print:p-6">
          <ReceiptHeader onClose={onClose} />
          <ReceiptContent 
            receiptData={receiptData}
            currencySymbol={currencySymbol}
          />
        </div>
        <ReceiptActions 
          onPrint={handlePrint}
          onDownload={handleDownloadPDF}
          onShare={handleShare}
          onWhatsAppShare={handleWhatsAppShare}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptView;
