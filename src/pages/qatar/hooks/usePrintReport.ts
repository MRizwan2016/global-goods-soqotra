
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
    handlePrint: (): Promise<void> => {
      return new Promise<void>((resolve) => {
        try {
          // Call the original handler if it exists
          if (typeof handlePrintOriginal === 'function') {
            // Execute the print function but don't store the result in a variable initially
            // This avoids the "testing void for truthiness" error
            
            try {
              // Call the original handler directly within Promise handling
              const result = handlePrintOriginal();
              
              // We need to handle both cases:
              // 1. When it returns void (nothing)
              // 2. When it returns a Promise
              
              // Check if result is defined and looks like a Promise
              if (result !== undefined && 
                  result !== null && 
                  typeof result === 'object' && 
                  typeof (result as any).then === 'function') {
                // It's a Promise, so we can chain it
                (result as Promise<void>).then(() => {
                  resolve();
                }).catch((error) => {
                  console.error("Print error:", error);
                  resolve(); // Always resolve our promise
                });
              } else {
                // It returned void or something that's not a Promise
                resolve();
              }
            } catch (error) {
              console.error("Error calling print handler:", error);
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
