
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface LoadContainerActionsBarProps {
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
  totalItems?: number;
  totalVolume?: string;
  totalWeight?: string;
}

const LoadContainerActionsBar: React.FC<LoadContainerActionsBarProps> = ({
  onCancel,
  onSave,
  disabled = false,
  totalItems = 0,
  totalVolume = "0.000",
  totalWeight = "0.00"
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSaveClick = () => {
    if (disabled) return;
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    setShowConfirmation(false);
    onSave();
  };

  return (
    <>
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
        
        <div className="flex items-center">
          {totalItems > 0 && (
            <div className="mr-4 text-sm">
              <span className="font-medium flex items-center">
                <Package size={14} className="mr-1" /> 
                {totalItems} package{totalItems !== 1 ? 's' : ''} | {totalVolume} m³ | {totalWeight} kg
              </span>
            </div>
          )}
          
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            onClick={handleSaveClick}
            disabled={disabled}
          >
            <Save size={16} />
            Save & Continue to Manifest
          </Button>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Save</DialogTitle>
            <DialogDescription>
              Are you sure you want to save the container cargo details and proceed to the manifest section?
              <div className="mt-2 bg-blue-50 p-2 rounded text-sm">
                <p><strong>Total Packages:</strong> {totalItems}</p>
                <p><strong>Total Volume:</strong> {totalVolume} m³</p>
                <p><strong>Total Weight:</strong> {totalWeight} kg</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={confirmSave}
            >
              Confirm & Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoadContainerActionsBar;
