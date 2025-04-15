
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrintReport(documentTitle: string) {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Get the handler from useReactToPrint with explicitly defined type
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
            // Execute the print function and capture the result
            // TypeScript doesn't recognize that handlePrintOriginal() might return void or Promise<void>
            const result: unknown = handlePrintOriginal();
            
            // Check if the result is a Promise-like object with proper null checks
            if (result !== undefined && 
                result !== null && 
                typeof result === 'object' && 
                'then' in result && 
                typeof (result as { then: unknown }).then === 'function') {
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
