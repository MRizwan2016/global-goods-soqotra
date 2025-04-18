
import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";

interface PrintReportOptions {
  documentTitle?: string;
}

const usePrintReport = (componentRef: RefObject<HTMLDivElement>, options: PrintReportOptions = {}) => {
  const handlePrint = useReactToPrint({
    documentTitle: options.documentTitle || "Printed Report",
    onPrintError: (error) => console.error("Print failed:", error),
    // The content property expects a function that returns the component ref
    content: () => componentRef.current,
  });

  return handlePrint;
};

export default usePrintReport;
