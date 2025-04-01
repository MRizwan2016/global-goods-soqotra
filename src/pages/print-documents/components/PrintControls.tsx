
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

interface PrintControlsProps {
  handleBack: () => void;
  handlePrint: () => void;
  title: string;
  isPreview?: boolean;
}

const PrintControls: React.FC<PrintControlsProps> = ({
  handleBack,
  handlePrint,
  title,
  isPreview = false
}) => {
  return (
    <div className="print:hidden p-4 bg-white shadow-md mb-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>

        <div className="flex-1 text-center">
          <div className="flex justify-center items-center gap-2">
            {isPreview && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Preview Mode
              </span>
            )}
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>

        <Button
          onClick={handlePrint}
          className="flex items-center bg-blue-500 hover:bg-blue-600"
        >
          <Printer className="mr-2 h-4 w-4" />
          {isPreview ? "PRINT PREVIEW" : "PRINT NOW"}
        </Button>
      </div>
    </div>
  );
};

export default PrintControls;
