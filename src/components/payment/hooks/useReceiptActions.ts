
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

export const useReceiptActions = (receiptRef: React.RefObject<HTMLDivElement>, receiptNumber: string) => {
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
    // The correct property name in react-to-print v3.0.6
    contentRef: receiptRef
  });

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      try {
        console.log("Generating PDF for element:", receiptRef.current);
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
      // Check if Web Share API is supported
      if (navigator.share) {
        const shareData = {
          title: 'Payment Receipt',
          text: `Receipt #${receiptNumber}`,
          url: window.location.href
        };
        
        console.log("Attempting to share with data:", shareData);
        
        try {
          await navigator.share(shareData);
          toast.success("Receipt shared successfully");
        } catch (error) {
          console.error("Share error:", error);
          if (error instanceof Error && error.name !== 'AbortError') {
            toast.error("Failed to share receipt");
          }
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        console.log("Web Share API not supported");
        
        // Create a temporary input element to copy the URL
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (successful) {
            toast.success("Receipt URL copied to clipboard", {
              description: "You can now share it manually"
            });
          } else {
            toast.error("Failed to copy receipt URL");
          }
        } catch (err) {
          document.body.removeChild(textArea);
          toast.error("Failed to copy receipt URL");
        }
      }
    } catch (error) {
      console.error("Share handling error:", error);
      toast.error("Error sharing receipt");
    }
  };

  return {
    handlePrint,
    handleDownloadPDF,
    handleShare
  };
};
