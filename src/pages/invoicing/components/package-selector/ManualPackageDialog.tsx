
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface ManualPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (packageName: string, price: string) => void;
}

const ManualPackageDialog: React.FC<ManualPackageDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [manualPackageName, setManualPackageName] = useState("");
  const [manualPrice, setManualPrice] = useState("");
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setManualPackageName("");
      setManualPrice("");
    }
  }, [open]);
  
  const handleSubmit = () => {
    onSubmit(manualPackageName, manualPrice);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Package Details Manually</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Package Name:</label>
            <Input 
              value={manualPackageName}
              onChange={(e) => setManualPackageName(e.target.value)}
              placeholder="Enter package name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Price:</label>
            <Input 
              value={manualPrice}
              onChange={(e) => setManualPrice(e.target.value)}
              placeholder="Enter price"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Package</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualPackageDialog;
