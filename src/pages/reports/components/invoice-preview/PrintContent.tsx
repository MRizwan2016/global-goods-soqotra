
import React from "react";
import InvoiceMode from "@/pages/invoicing/components/print-modes/InvoiceMode";
import BillOfLadingMode from "@/pages/invoicing/components/print-modes/BillOfLadingMode";
import CertificateMode from "@/pages/invoicing/components/print-modes/CertificateMode";

interface PrintContentProps {
  mode: "invoice" | "bl" | "certificate";
  invoice: any;
  packageDetails: any[];
  totalWeight: string;
  totalVolume: string;
  printRef: React.RefObject<HTMLDivElement>;
}

const PrintContent: React.FC<PrintContentProps> = ({
  mode,
  invoice,
  packageDetails,
  totalWeight,
  totalVolume,
  printRef
}) => {
  return (
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
  );
};

export default PrintContent;
