
import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReceiptHeader from "./ReceiptHeader";
import ReceiptContent from "./ReceiptContent";
import ReceiptActions from "./ReceiptActions";
import { useReceiptActions } from "./hooks/useReceiptActions";

const RECEIPT_WIDTH_CM = 8;
const RECEIPT_HEIGHT_CM = 12;

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
      <DialogContent className="mx-auto w-fit max-w-none bg-white rounded-lg shadow-lg p-0 overflow-hidden print:shadow-none print:border-none print:max-w-none">
        <style>
          {`
            @media print {
              @page {
                size: ${RECEIPT_WIDTH_CM}cm ${RECEIPT_HEIGHT_CM}cm;
                margin: 0;
              }

              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }

              body * {
                visibility: hidden !important;
              }

              #receipt-printable,
              #receipt-printable * {
                visibility: visible !important;
              }

              #receipt-printable {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: ${RECEIPT_WIDTH_CM}cm !important;
                min-height: ${RECEIPT_HEIGHT_CM}cm !important;
                margin: 0 !important;
              }
            }
          `}
        </style>
        <div
          ref={receiptRef}
          id="receipt-printable"
          className="bg-background"
          style={{ width: `${RECEIPT_WIDTH_CM}cm`, minHeight: `${RECEIPT_HEIGHT_CM}cm` }}
        >
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
