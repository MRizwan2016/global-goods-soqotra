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
    handlePrint: (): Promise<void> => {
      if (handlePrintOriginal) {
        // Always return a Promise<void> to satisfy TypeScript
        return new Promise<void>((resolve) => {
          try {
            // Call the original handler and handle its result
            const result = handlePrintOriginal();
            
            // If the result looks like a promise (has a then method), use that
            if (result && typeof result === 'object' && 'then' in result) {
              result.then(() => resolve()).catch(() => resolve());
            } else {
              // Otherwise, just resolve immediately
              resolve();
            }
          } catch (error) {
            console.error("Error during print:", error);
            resolve(); // Always resolve the promise even if there's an error
          }
        });
      }
      return Promise.resolve();
    }
  };
}
