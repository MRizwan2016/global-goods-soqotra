
import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";

interface PrintReportOptions {
  documentTitle?: string;
}

const usePrintReport = (componentRef: RefObject<HTMLDivElement>, options: PrintReportOptions = {}) => {
  const handlePrint = useReactToPrint({
    documentTitle: options.documentTitle || "Printed Report",
    onPrintError: (error) => console.error("Print failed:", error),
    // Use the correct property name for the react-to-print library
    content: () => componentRef.current,
  });

  return handlePrint;
};

export default usePrintReport;
