
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

/**
 * Custom hook for handling print functionality
 * @param componentRef - Reference to the component to be printed
 * @returns Print handler function
 */
const usePrintReport = (componentRef: React.RefObject<HTMLDivElement>) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Return a function that returns a promise to match the expected type
  return () => {
    return new Promise<void>((resolve) => {
      handlePrint();
      // Resolve the promise after a short delay to allow printing to start
      setTimeout(resolve, 100);
    });
  };
};

export default usePrintReport;
