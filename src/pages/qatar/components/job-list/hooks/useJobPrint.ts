
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const useJobPrint = (documentTitle: string = "Printed Report") => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle,
    onPrintError: (error) => console.error("Print failed:", error),
    content: () => printRef.current,
  } as any); // Using type assertion as a workaround for TypeScript error

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
