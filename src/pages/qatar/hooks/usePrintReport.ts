
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
          const result = handlePrintOriginal();
          // If result is already a promise, return it, otherwise wrap in resolved promise
          if (result instanceof Promise) {
            result.then(() => resolve()).catch(() => resolve());
          } else {
            resolve();
          }
        });
      }
      return Promise.resolve();
    }
  };
}
