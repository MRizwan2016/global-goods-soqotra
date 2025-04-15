
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
        // Call the handler and wrap the result in Promise.resolve() to ensure it's always a Promise
        try {
          const result = handlePrintOriginal();
          // Since we can't check instanceof Promise reliably, we use Promise.resolve to ensure
          // we always return a Promise regardless of what handlePrint returns
          return Promise.resolve(result);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.resolve();
    }
  };
}
