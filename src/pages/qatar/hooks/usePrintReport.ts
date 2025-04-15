
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

  // The function returned by useReactToPrint has a return type of void
  // but we want to wrap it in a Promise<void>
  const handlePrint = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      try {
        // Call the original handler if it exists
        if (typeof handlePrintOriginal === 'function') {
          // Call the original handler which returns void
          handlePrintOriginal();
          
          // After calling the print handler, resolve the promise
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
  };

  return {
    printRef,
    handlePrint
  };
}
