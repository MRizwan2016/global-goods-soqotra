
import React from "react";
import { Button } from "@/components/ui/card";
import { ArrowLeft, Printer, FileText } from "lucide-react";

interface HeaderActionsProps {
  handleBack: () => void;
  handlePrintInvoice: () => void;
  handlePrintCertificate: () => void;
  handlePrintHBL: () => void;
  handlePrint: () => void;
  id: string;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  handleBack,
  handlePrintInvoice,
  handlePrintCertificate,
  handlePrintHBL,
  handlePrint,
  id
}) => {
  return (
    <div className="print:hidden flex justify-between items-center mb-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleBack}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reports
      </Button>
      
      <h1 className="text-xl font-bold">Invoice #{id}</h1>
      
      <div className="flex gap-2">
        <Button 
          onClick={handlePrintInvoice}
          variant="outline"
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          Print Invoice
        </Button>
        <Button 
          onClick={handlePrintCertificate}
          variant="outline"
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          Print Certificate
        </Button>
        <Button 
          onClick={handlePrintHBL}
          variant="outline"
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          Print HBL
        </Button>
        <Button 
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
        >
          <Printer className="h-4 w-4" />
          Print Preview
        </Button>
      </div>
    </div>
  );
};

export default HeaderActions;
