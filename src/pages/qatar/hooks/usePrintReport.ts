
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrintReport(documentTitle: string) {
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print completed"),
  });

  return {
    printRef,
    handlePrint: (): Promise<void> => {
      if (handlePrint) {
        // Call the handler and wrap the result in Promise.resolve() to ensure it's always a Promise
        try {
          const result = handlePrint();
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
