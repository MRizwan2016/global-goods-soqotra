
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

export const useReceiptActions = (receiptRef: React.RefObject<HTMLDivElement>, receiptNumber: string) => {
  const handlePrint = useReactToPrint({
    documentTitle: `Receipt-${receiptNumber}`,
    onAfterPrint: () => toast.success("Receipt printed successfully"),
    onPrintError: () => toast.error("Failed to print receipt"),
    content: () => receiptRef.current
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
        pdf.save(`Receipt-${receiptNumber}.pdf`);
        
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
          text: `Receipt #${receiptNumber}`,
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

  return {
    handlePrint,
    handleDownloadPDF,
    handleShare
  };
};
