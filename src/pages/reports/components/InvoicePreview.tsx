
import { useRef } from "react";
import PrintStyles from "@/pages/invoicing/components/print/PrintStyles";
import { useInvoicePrintData } from "@/pages/invoicing/hooks/useInvoicePrintData";
import HeaderActions from "./invoice-preview/HeaderActions";
import PrintContent from "./invoice-preview/PrintContent";
import LoadingState from "./invoice-preview/LoadingState";
import ErrorState from "./invoice-preview/ErrorState";

const InvoicePreview = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const {
    invoice,
    packageDetails,
    totalVolume,
    totalWeight,
    mode,
    loading,
    handlePrint,
    handleBack,
    error
  } = useInvoicePrintData();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !invoice) {
    return <ErrorState error={error} handleBack={handleBack} />;
  }

  const handlePrintInvoice = () => {
    if (invoice?.id) {
      window.open(`/data-entry/print-documents/invoice-print/${invoice.id}`, '_blank');
    }
  };
  
  const handlePrintHBL = () => {
    if (invoice?.id) {
      window.open(`/data-entry/print-documents/bl-print/${invoice.id}`, '_blank');
    }
  };
  
  const handlePrintCertificate = () => {
    if (invoice?.id) {
      window.open(`/data-entry/print-documents/invoice-print/${invoice.id}?mode=certificate`, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 print-container">
      <HeaderActions 
        handleBack={handleBack}
        handlePrintInvoice={handlePrintInvoice}
        handlePrintCertificate={handlePrintCertificate}
        handlePrintHBL={handlePrintHBL}
        handlePrint={handlePrint}
        id={invoice.id}
      />
      
      <PrintContent 
        mode={mode}
        invoice={invoice}
        packageDetails={packageDetails}
        totalWeight={totalWeight}
        totalVolume={totalVolume}
        printRef={printRef}
      />
      
      <PrintStyles />
    </div>
  );
};

export default InvoicePreview;
