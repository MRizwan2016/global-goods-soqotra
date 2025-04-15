
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

  // Create a wrapper function that properly returns Promise<void>
  const handlePrint = (): Promise<void> => {
    // Using a Promise constructor to explicitly return Promise<void>
    return new Promise<void>((resolve) => {
      // Execute the print operation
      if (handlePrintOriginal) {
        // Call the print handler first
        handlePrintOriginal();
        // Then resolve the promise
        setTimeout(() => resolve(), 100);
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
