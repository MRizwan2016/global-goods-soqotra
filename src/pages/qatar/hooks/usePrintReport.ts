
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
            
            // We need to check the result properly to avoid TypeScript errors
            if (result !== undefined && 
                result !== null && 
                typeof result === 'object' && 
                'then' in result && 
                typeof result.then === 'function') {
              // If it returns a Promise, wait for it to complete
              (result as Promise<void>).then(() => {
                resolve();
              }).catch((error) => {
                console.error("Print error:", error);
                resolve(); // Always resolve our promise
              });
            } else {
              // If it's not a Promise or is void, resolve immediately
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
