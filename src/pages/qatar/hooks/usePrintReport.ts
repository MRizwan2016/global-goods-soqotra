
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

  // Create a function that returns Promise<void>
  const handlePrint = (): Promise<void> => {
    console.log("Starting print process...");
    
    return new Promise<void>((resolve, reject) => {
      try {
        // Check if there's content to print
        if (!printRef.current) {
          console.warn("Print content not available");
          resolve();
          return;
        }

        // Call the original print handler
        if (handlePrintOriginal) {
          // Make sure to handle the result of handlePrintOriginal
          const result = handlePrintOriginal();
          
          // Wait a bit to make sure print dialog appears and then resolve
          setTimeout(() => {
            console.log("Print process completed");
            resolve();
          }, 500);
        } else {
          console.warn("Print handler not available");
          resolve();
        }
      } catch (error) {
        console.error("Error during print:", error);
        reject(error);
      }
    });
  };

  return {
    printRef,
    handlePrint
  };
}
