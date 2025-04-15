
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrintReport(documentTitle: string) {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Get the original handler from useReactToPrint
  const handlePrintOriginal = useReactToPrint({
    content: () => printRef.current,
    documentTitle,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print completed"),
  });

  return {
    printRef,
    handlePrint: (): Promise<void> => {
      // Always return a Promise<void> to satisfy TypeScript
      return new Promise<void>((resolve) => {
        try {
          // Call the original handler and handle its result
          if (typeof handlePrintOriginal === 'function') {
            const result = handlePrintOriginal();
            
            // Check if the result is a Promise-like object
            if (result && 
                typeof result === 'object' && 
                'then' in result && 
                typeof result.then === 'function') {
              // If it's a Promise, chain our resolver to it
              (result as Promise<void>).then(() => {
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
