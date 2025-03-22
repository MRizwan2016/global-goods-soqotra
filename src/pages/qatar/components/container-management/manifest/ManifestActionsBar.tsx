
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Save } from "lucide-react";

interface ManifestActionsBarProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ManifestActionsBar: React.FC<ManifestActionsBarProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="flex justify-between mt-6">
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
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={onConfirm}
        >
          <Save size={16} />
          Save
        </Button>
      </div>
      
      <Button 
        variant="default" 
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
      >
        <Printer size={16} />
        Print
      </Button>
    </div>
  );
};

export default ManifestActionsBar;
