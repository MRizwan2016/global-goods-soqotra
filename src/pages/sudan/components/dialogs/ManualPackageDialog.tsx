import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface ManualPackageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPackage: (packageData: any) => void;
}

const ManualPackageDialog: React.FC<ManualPackageDialogProps> = ({
  isOpen,
  onClose,
  onAddPackage
}) => {
  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    quantity: '1',
    value: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setPackageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!packageData.name.trim()) {
      toast.error("Package name is required");
      return;
    }

    if (!packageData.weight || parseFloat(packageData.weight) <= 0) {
      toast.error("Valid weight is required");
      return;
    }

    const dimensions = {
      length: parseFloat(packageData.length) || 0,
      width: parseFloat(packageData.width) || 0,
      height: parseFloat(packageData.height) || 0
    };

    const cubicMeter = (dimensions.length * dimensions.width * dimensions.height) / 1000000;

    const finalPackage = {
      ...packageData,
      type: 'MANUAL',
      dimensions,
      cubicMeter,
      quantity: parseInt(packageData.quantity) || 1,
      weight: parseFloat(packageData.weight),
      value: parseFloat(packageData.value) || 0
    };

    onAddPackage(finalPackage);
    
    // Reset form
    setPackageData({
      name: '',
      description: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      quantity: '1',
      value: ''
    });
    
    onClose();
    toast.success("Manual package added successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Manual Package Entry
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="packageName">Package Name *</Label>
            <Input
              id="packageName"
              value={packageData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter package name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageDescription">Description</Label>
            <Input
              id="packageDescription"
              value={packageData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Package description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageLength">Length (cm)</Label>
            <Input
              id="packageLength"
              type="number"
              value={packageData.length}
              onChange={(e) => handleInputChange('length', e.target.value)}
              placeholder="Length in cm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageWidth">Width (cm)</Label>
            <Input
              id="packageWidth"
              type="number"
              value={packageData.width}
              onChange={(e) => handleInputChange('width', e.target.value)}
              placeholder="Width in cm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageHeight">Height (cm)</Label>
            <Input
              id="packageHeight"
              type="number"
              value={packageData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="Height in cm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageWeight">Weight (kg) *</Label>
            <Input
              id="packageWeight"
              type="number"
              step="0.1"
              value={packageData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="Weight in kg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageQuantity">Quantity</Label>
            <Input
              id="packageQuantity"
              type="number"
              value={packageData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              placeholder="Quantity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageValue">Value (QAR)</Label>
            <Input
              id="packageValue"
              type="number"
              step="0.01"
              value={packageData.value}
              onChange={(e) => handleInputChange('value', e.target.value)}
              placeholder="Package value"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManualPackageDialog;