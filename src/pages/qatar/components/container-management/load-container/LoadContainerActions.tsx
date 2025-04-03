
import React from "react";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

interface LoadContainerActionsProps {
  onLoadComplete: () => void;
  disabled: boolean;
}

const LoadContainerActions: React.FC<LoadContainerActionsProps> = ({
  onLoadComplete,
  disabled
}) => {
  return (
    <div className="flex justify-end">
      <Button 
        onClick={onLoadComplete} 
        className="bg-blue-600 hover:bg-blue-700"
        disabled={disabled}
      >
        <Truck className="h-4 w-4 mr-2" />
        Proceed to Manifest
      </Button>
    </div>
  );
};

export default LoadContainerActions;
