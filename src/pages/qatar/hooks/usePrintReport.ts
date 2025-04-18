
import { useReactToPrint } from "react-to-print";

const usePrintReport = (componentRef: React.RefObject<HTMLDivElement>) => {
  const handlePrint = useReactToPrint({
    documentTitle: "Printed Report",
    onPrintError: (error) => console.error("Print failed:", error),
    contentRef: componentRef,
  });

  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      handlePrint();
      setTimeout(resolve, 100);
    });
  };
};

export default usePrintReport;
