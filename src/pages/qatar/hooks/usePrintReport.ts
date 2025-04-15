
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrintReport(documentTitle: string) {
  const printRef = useRef<HTMLDivElement>(null);
  
  // The original handlePrint function from useReactToPrint
  const handlePrintOriginal = useReactToPrint({
    content: () => printRef.current,
    documentTitle,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print completed"),
  });

  return {
    printRef,
    handlePrint: () => {
      // Always return a Promise<void> to satisfy TypeScript
      return new Promise<void>((resolve) => {
        try {
          // Call the original handler and handle its result
          // According to the documentation, the function can either return undefined or a Promise
          if (handlePrintOriginal) {
            const result = handlePrintOriginal();
            
            // Check if result exists and has a then method (is Promise-like)
            if (result && typeof result === 'object' && 'then' in result) {
              // If it's a Promise, chain our own promise to it
              result.then(() => {
                resolve();
              }).catch((error) => {
                console.error("Print error:", error);
                resolve(); // Always resolve our promise
              });
            } else {
              // If it's not a Promise, assume it completed synchronously
              resolve();
            }
          } else {
            // If handlePrintOriginal is not available, just resolve
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
