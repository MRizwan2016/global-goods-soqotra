
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
        // Since useReactToPrint's return type is not guaranteed to be a Promise<void>,
        // we need to wrap it in Promise.resolve() to ensure we always return a Promise<void>
        return Promise.resolve(handlePrintOriginal());
      }
      return Promise.resolve();
    }
  };
}
