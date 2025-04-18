
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const useJobPrint = (documentTitle: string = "Printed Report") => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle,
    onPrintError: (error) => console.error("Print failed:", error),
    // Fix: In react-to-print v3.0.6+, the property is still called 'content' even if TypeScript types don't match
    content: () => printRef.current,
  } as any); // Using type assertion to work around the TypeScript error

  const handlePrintButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      handlePrint();
    }, 50);
    return false;
  };

  return {
    printRef,
    handlePrintButtonClick
  };
};
