
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

  // Create a wrapper function that explicitly returns Promise<void>
  const handlePrint = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      try {
        // Call the original handler
        if (handlePrintOriginal) {
          handlePrintOriginal();
        } else {
          console.warn("Print handler not available");
        }
        // Always resolve the promise
        resolve();
      } catch (error) {
        console.error("Error during print:", error);
        // Always resolve even on error
        resolve();
      }
    });
  };

  return {
    printRef,
    handlePrint
  };
}
