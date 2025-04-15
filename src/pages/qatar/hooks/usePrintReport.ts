
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

  // The issue is that handlePrint needs to return a Promise<void>
  const handlePrint = (): Promise<void> => {
    console.log("Starting print process...");
    
    // Create and return a new Promise to ensure the function returns Promise<void>
    return new Promise<void>((resolve) => {
      if (handlePrintOriginal) {
        // Execute the print handler
        const printResult = handlePrintOriginal();
        
        // Since handlePrintOriginal might not return a Promise,
        // we ensure we're returning a Promise<void>
        if (printResult && typeof printResult.then === 'function') {
          // If it returns a Promise, chain our resolve to it
          printResult.then(() => {
            console.log("Print process completed");
            resolve();
          }).catch(() => {
            console.log("Print process failed or canceled");
            resolve(); // Still resolve our Promise even if printing fails
          });
        } else {
          // If it doesn't return a Promise, resolve after a small delay
          setTimeout(() => {
            console.log("Print process initiated");
            resolve();
          }, 100);
        }
      } else {
        console.warn("Print handler not available");
        resolve(); // Resolve the Promise even if handler isn't available
      }
    });
  };

  return {
    printRef,
    handlePrint
  };
}
