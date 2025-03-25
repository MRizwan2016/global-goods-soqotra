
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Save } from "lucide-react";

interface ManifestActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  onPrint: (e: React.MouseEvent) => void;
}

const ManifestActions: React.FC<ManifestActionsProps> = ({ 
  onCancel, 
  onConfirm, 
  onPrint 
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
        
        <Button 
          onClick={onConfirm}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Save size={16} />
          Confirm Manifest
        </Button>
      </div>
      
      <Button 
        onClick={onPrint}
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
      >
        <Printer size={16} />
        Print Manifest
      </Button>
    </div>
  );
};

export default ManifestActions;
