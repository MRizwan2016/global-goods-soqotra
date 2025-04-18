
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PrintModeToolbarProps {
  handleBack: () => void;
  handlePrint: () => void;
  setMode: (mode: "invoice" | "bl" | "certificate") => void;
  mode: "invoice" | "bl" | "certificate";
  invoiceNumber: string;
}

const PrintModeToolbar = ({
  handleBack,
  handlePrint,
  setMode,
  mode,
  invoiceNumber
}: PrintModeToolbarProps) => {
  return (
    <div className="print:hidden bg-white border-b px-4 py-2 sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Go Back
        </Button>
        <span className="text-sm font-medium ml-2">Invoice #{invoiceNumber}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => setMode("invoice")}
            className={`px-3 py-1.5 text-sm ${mode === "invoice" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          >
            Invoice
          </button>
          <button
            onClick={() => setMode("bl")}
            className={`px-3 py-1.5 text-sm border-l ${mode === "bl" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          >
            Bill of Lading
          </button>
          <button
            onClick={() => setMode("certificate")}
            className={`px-3 py-1.5 text-sm border-l ${mode === "certificate" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          >
            Certificate
          </button>
        </div>
        <Button onClick={handlePrint}>Print Document</Button>
      </div>
    </div>
  );
};

export default PrintModeToolbar;
