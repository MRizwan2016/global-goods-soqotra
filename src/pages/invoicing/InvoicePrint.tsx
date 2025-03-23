
import { useRef } from "react";
import { useInvoicePrintData } from "./hooks/useInvoicePrintData";
import PrintModeToolbar from "./components/print/PrintModeToolbar";
import PrintStyles from "./components/print/PrintStyles";
import InvoiceMode from "./components/print-modes/InvoiceMode";
import BillOfLadingMode from "./components/print-modes/BillOfLadingMode";
import CertificateMode from "./components/print-modes/CertificateMode";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    loading,
    handlePrint,
    handleBack,
  } = useInvoicePrintData();
  
  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Redirecting to login...</div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading invoice data...</div>
      </div>
    );
  }
  
  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <p>Invoice not found. Redirecting...</p>
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </Button>
        </div>
      </div>
    );
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
