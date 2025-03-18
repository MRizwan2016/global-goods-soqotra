
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, FileText, ArrowLeft, Eye } from "lucide-react";

interface PrintModeToolbarProps {
  handleBack: () => void;
  handlePrint: () => void;
  setMode: (mode: "invoice" | "bl" | "certificate") => void;
  mode: "invoice" | "bl" | "certificate";
  invoiceNumber: string;
}

const PrintModeToolbar: React.FC<PrintModeToolbarProps> = ({
  handleBack,
  handlePrint,
  setMode,
  mode,
  invoiceNumber,
}) => {
  return (
    <div className="bg-white shadow-md p-3 sticky top-0 z-10 print:hidden flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack} 
          className="flex items-center gap-1 mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-gray-700">Invoice #{invoiceNumber}</h1>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setMode("invoice")}
          className={`flex items-center gap-1 ${mode === "invoice" ? "bg-blue-50 border-blue-300" : ""}`}
        >
          <Eye className="h-4 w-4" />
          Invoice Preview
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setMode("bl")}
          className={`flex items-center gap-1 ${mode === "bl" ? "bg-blue-50 border-blue-300" : ""}`}
        >
          <FileText className="h-4 w-4" />
          House BL
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setMode("certificate")}
          className={`flex items-center gap-1 ${mode === "certificate" ? "bg-blue-50 border-blue-300" : ""}`}
        >
          <FileText className="h-4 w-4" />
          Certificate
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handlePrint}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
        >
          <Printer className="h-4 w-4" />
          Print {mode === "invoice" ? "Invoice" : mode === "bl" ? "House BL" : "Certificate"}
        </Button>
      </div>
    </div>
  );
};

export default PrintModeToolbar;
