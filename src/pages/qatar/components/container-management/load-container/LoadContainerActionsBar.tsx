
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface LoadContainerActionsBarProps {
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
}

const LoadContainerActionsBar: React.FC<LoadContainerActionsBarProps> = ({
  onCancel,
  onSave,
  disabled = false
}) => {
  return (
    <div className="flex justify-between mt-6">
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
        onClick={onSave}
        disabled={disabled}
      >
        <Save size={16} />
        Save
      </Button>
    </div>
  );
};

export default LoadContainerActionsBar;
