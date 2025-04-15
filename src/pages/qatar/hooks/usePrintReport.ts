
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

  return {
    printRef,
    // Always return a Promise from handlePrint
    handlePrint: () => {
      return new Promise<void>((resolve) => {
        try {
          // Call the original handler if it exists
          if (typeof handlePrintOriginal === 'function') {
            // Call the original handler
            const result = handlePrintOriginal();
            
            // Always resolve the promise, regardless of the result
            // We don't need to check if result is a promise since
            // we're not trying to chain off it
            resolve();
          } else {
            // If handlePrintOriginal is not available, just resolve
            console.warn("Print handler not available");
            resolve();
          }
        } catch (error) {
          console.error("Error during print:", error);
          resolve(); // Always resolve the promise even if there's an error
        }
      });
    }
  };
}
