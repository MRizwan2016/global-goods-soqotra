
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, FileText } from "lucide-react";

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
  const handlePrintClick = (e: React.MouseEvent) => {
    // Prevent default browser behavior
    e.preventDefault();
    // Stop event propagation
    e.stopPropagation();
    
    // Add small delay before print to ensure the UI is ready
    setTimeout(() => {
      handlePrint();
    }, 50);
    
    // Return false to prevent any further actions
    return false;
  };
  
  const handleBackClick = (e: React.MouseEvent) => {
    // Prevent default browser behavior
    e.preventDefault();
    // Stop event propagation
    e.stopPropagation();
    
    handleBack();
    
    // Return false to prevent any further actions
    return false;
  };
  
  return (
    <div className="print:hidden p-4 bg-white shadow-md mb-4 sticky top-0 z-10 flex items-center justify-between">
      <Button
        variant="outline"
        onClick={handleBackClick}
        className="flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="text-xl font-bold flex-1 text-center">
        {title}
        {isPreview && <span className="text-sm font-normal text-gray-500 ml-2">(Preview Mode)</span>}
      </div>
      <Button
        onClick={handlePrintClick}
        className="flex items-center bg-blue-500 hover:bg-blue-600"
      >
        <Printer className="mr-2 h-4 w-4" />
        {isPreview ? "Print Document" : "Print"}
      </Button>
    </div>
  );
};

export default PrintControls;
