
import { useRef } from "react";
import PrintModeToolbar from "./components/print/PrintModeToolbar";
import PrintStyles from "./components/print/PrintStyles";
import InvoiceMode from "./components/print-modes/InvoiceMode";
import BillOfLadingMode from "./components/print-modes/BillOfLadingMode";
import CertificateMode from "./components/print-modes/CertificateMode";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useInvoicePrintData } from "./hooks/useInvoicePrintData";

const InvoicePrint = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const {
    invoice,
    packageDetails,
    totalVolume,
    totalWeight,
    mode,
    setMode,
    loading,
    handlePrint,
    handleBack,
    error
  } = useInvoicePrintData();

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading invoice data...</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-600 font-medium">{error || "Invoice not found."}</p>
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 print-container">
      <PrintModeToolbar 
        handleBack={handleBack}
        handlePrint={handlePrint}
        setMode={setMode}
        mode={mode}
        invoiceNumber={invoice?.invoiceNumber || ""}
      />
      
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center print-content">
        <div 
          ref={printRef} 
          id="print-invoice-content"
          className="w-full max-w-[210mm] mx-auto bg-white text-black text-sm shadow-lg print:shadow-none"
          style={{ minHeight: '297mm' }}
        >
          {mode === "invoice" && invoice && (
            <InvoiceMode 
              invoice={invoice}
              packageDetails={packageDetails}
              totalWeight={totalWeight}
              totalVolume={totalVolume}
            />
          )}
          
          {mode === "bl" && invoice && (
            <BillOfLadingMode 
              invoice={invoice}
              packageDetails={packageDetails}
              totalWeight={totalWeight}
              totalVolume={totalVolume}
            />
          )}
          
          {mode === "certificate" && invoice && (
            <CertificateMode 
              invoice={invoice}
              packageDetails={packageDetails}
              totalWeight={totalWeight}
              totalVolume={totalVolume}
            />
          )}
        </div>
      </div>
      
      <PrintStyles />
    </div>
  );
};

export default InvoicePrint;
