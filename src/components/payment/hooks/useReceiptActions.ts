
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

export const useReceiptActions = (
  receiptRef: React.RefObject<HTMLDivElement>, 
  receiptNumber: string,
  receiptData?: { invoiceNumber: string; customer: string; amount: number; currency: string }
) => {
  const handlePrint = useReactToPrint({
    documentTitle: `Receipt-${receiptNumber}`,
    onBeforePrint: async () => {
      console.log("Preparing to print receipt:", receiptRef.current);
      return Promise.resolve();
    },
    onAfterPrint: () => toast.success("Receipt printed successfully"),
    onPrintError: (error) => {
      console.error("Print error:", error);
      toast.error("Failed to print receipt");
    },
    contentRef: receiptRef
  });

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2,
          logging: true,
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
        pdf.save(`Receipt-${receiptNumber}.pdf`);
        
        toast.success("PDF downloaded successfully");
      } catch (error) {
        console.error("PDF generation failed:", error);
        toast.error("Failed to generate PDF");
      }
    } else {
      toast.error("Cannot generate PDF: Receipt content not found");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Payment Receipt',
          text: `Receipt #${receiptNumber}`,
          url: window.location.href
        });
        toast.success("Receipt shared successfully");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Receipt URL copied to clipboard");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error("Failed to share receipt");
      }
    }
  };

  const handleWhatsAppShare = () => {
    const data = receiptData;
    const currencyLabel = data?.currency === "QAR" ? "QR" : data?.currency || "";
    const message = [
      `📧 *PAYMENT RECEIPT*`,
      `━━━━━━━━━━━━━━━`,
      `Receipt #: ${receiptNumber}`,
      data?.invoiceNumber ? `Invoice #: ${data.invoiceNumber}` : '',
      data?.customer ? `Customer: ${data.customer}` : '',
      data?.amount ? `Amount Paid: ${currencyLabel} ${data.amount.toFixed(2)}` : '',
      `━━━━━━━━━━━━━━━`,
      `Thank you for your payment!`,
      `SOQOTRA LOGISTICS`,
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
  };

  return {
    handlePrint,
    handleDownloadPDF,
    handleShare,
    handleWhatsAppShare
  };
};
