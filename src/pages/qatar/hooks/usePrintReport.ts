
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
    handlePrint: (): Promise<void> => {
      return new Promise<void>((resolve) => {
        try {
          // Call the original handler if it exists
          if (typeof handlePrintOriginal === 'function') {
            // Execute the print function
            const result = handlePrintOriginal();
            
            // Check if result is a Promise
            if (result && typeof result === 'object' && 'then' in result) {
              // If it's a Promise, wait for it to complete
              result.then(() => {
                resolve();
              }).catch((error) => {
                console.error("Print error:", error);
                resolve(); // Always resolve our promise
              });
            } else {
              // If it's not a Promise, resolve immediately
              resolve();
            }
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
