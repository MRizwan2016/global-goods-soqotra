
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Save } from "lucide-react";

interface PrintControlsProps {
  handleBack: () => void;
  handlePrint: () => void;
  handleSave?: () => void;
  title: string;
  isPreview: boolean;
  isEdited?: boolean;
}

const PrintControls: React.FC<PrintControlsProps> = ({ 
  handleBack, 
  handlePrint, 
  handleSave, 
  title, 
  isPreview,
  isEdited
}) => {
  return (
    <div className="print:hidden bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-10 px-4 py-3">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <h1 className="text-lg font-medium ml-2">{title}</h1>
          
          {isEdited && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Unsaved Changes
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {handleSave && (
            <Button
              onClick={handleSave}
              variant="default"
              size="sm"
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
          )}
          
          <Button
            onClick={handlePrint}
            variant="default"
            size="sm"
            className="flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            <span>{isPreview ? "Print" : "Print Document"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintControls;
