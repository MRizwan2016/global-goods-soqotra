
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Save, FilePenLine } from "lucide-react";

interface ManifestActionsBarProps {
  onCancel: () => void;
  onConfirm: () => void;
  onPrint: () => void;
}

const ManifestActionsBar: React.FC<ManifestActionsBarProps> = ({
  onCancel,
  onConfirm,
  onPrint
}) => {
  return (
    <div className="flex justify-between mt-6">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2 hover:bg-gray-100 hover:scale-105 transition-transform"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
        
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={onConfirm}
        >
          <FilePenLine size={16} />
          Confirm Manifest
        </Button>
      </div>
      
      <Button 
        variant="default" 
        className="bg-green-600 hover:bg-green-700 flex items-center gap-2 hover:scale-105 transition-transform"
        onClick={onPrint}
      >
        <Printer size={16} />
        Print Manifest
      </Button>
    </div>
  );
};

export default ManifestActionsBar;
