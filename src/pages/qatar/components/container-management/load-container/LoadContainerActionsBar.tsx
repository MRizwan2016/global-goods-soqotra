
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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
        
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={handleSaveClick}
          disabled={disabled}
        >
          <Save size={16} />
          Save
        </Button>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Save</DialogTitle>
            <DialogDescription>
              Are you sure you want to save the container cargo details?
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
              Confirm Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoadContainerActionsBar;
