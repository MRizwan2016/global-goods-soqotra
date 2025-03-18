
import { useRef } from "react";
import { useInvoicePrintData } from "./hooks/useInvoicePrintData";
import PrintModeToolbar from "./components/print/PrintModeToolbar";
import PrintStyles from "./components/print/PrintStyles";
import InvoiceMode from "./components/print-modes/InvoiceMode";
import BillOfLadingMode from "./components/print-modes/BillOfLadingMode";
import CertificateMode from "./components/print-modes/CertificateMode";

const InvoicePrint = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const {
    invoice,
    packageDetails,
    totalVolume,
    totalWeight,
    mode,
    setMode,
    isAuthenticated,
    handlePrint,
    handleBack,
  } = useInvoicePrintData();
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  if (!invoice) {
    return <div className="p-8 text-center">Invoice not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Toolbar - hidden when printing */}
      <PrintModeToolbar 
        handleBack={handleBack}
        handlePrint={handlePrint}
        setMode={setMode}
        mode={mode}
        invoiceNumber={invoice.invoiceNumber}
      />
      
      {/* Invoice Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center">
        <div 
          ref={printRef} 
          className="w-full max-w-[210mm] mx-auto bg-white text-black text-sm shadow-lg print:shadow-none"
          style={{ minHeight: '297mm' }}
        >
          {mode === "invoice" && (
            <InvoiceMode 
              invoice={invoice}
              packageDetails={packageDetails}
              totalWeight={totalWeight}
              totalVolume={totalVolume}
            />
          )}
          
          {mode === "bl" && (
            <BillOfLadingMode 
              invoice={invoice}
              packageDetails={packageDetails}
              totalWeight={totalWeight}
              totalVolume={totalVolume}
            />
          )}
          
          {mode === "certificate" && (
            <CertificateMode 
              invoice={invoice}
              packageDetails={packageDetails}
              totalWeight={totalWeight}
              totalVolume={totalVolume}
            />
          )}
        </div>
      </div>
      
      {/* Print Styles - will only apply when printing */}
      <PrintStyles />
    </div>
  );
};

export default InvoicePrint;
