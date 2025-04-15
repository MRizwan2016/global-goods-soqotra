
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrintReport(documentTitle: string) {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Get the handler from useReactToPrint
  const handlePrintOriginal = useReactToPrint({
    content: () => printRef.current,
    documentTitle,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print completed"),
  });

  // Fix: The issue is with how useReactToPrint's return type is being handled
  const handlePrint = () => {
    // Explicitly return a Promise that resolves after printing
    return new Promise<void>((resolve) => {
      if (handlePrintOriginal) {
        console.log("Starting print process...");
        // Execute the print handler
        handlePrintOriginal();
        // Resolve after a small delay to ensure print dialog has time to open
        setTimeout(() => {
          console.log("Print process initiated");
          resolve();
        }, 100);
      } else {
        console.warn("Print handler not available");
        resolve();
      }
    });
  };

  return {
    printRef,
    handlePrint
  };
}
