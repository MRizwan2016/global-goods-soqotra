import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Calculator } from "lucide-react";
import { toast } from "sonner";

interface ManualPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (packageData: {
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantity: number;
    cubicMetre: number;
    cubicFeet: number;
    volumeWeight: number;
  }) => void;
}

const ManualPackageDialog: React.FC<ManualPackageDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    quantity: "1"
  });

  const [calculatedValues, setCalculatedValues] = useState({
    cubicMetre: 0,
    cubicFeet: 0,
    volumeWeight: 0
  });

  // Auto-calculate volume and volume weight when dimensions change
  useEffect(() => {
    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;

    if (length > 0 && width > 0 && height > 0) {
      // Convert cm to cubic meters
      const cubicMetre = (length * width * height) / 1000000;
      
      // Convert cubic meters to cubic feet
      const cubicFeet = cubicMetre * 35.3147;
      
      // Calculate volume weight (cubic meters × 167)
      const volumeWeight = cubicMetre * 167;

      setCalculatedValues({
        cubicMetre: parseFloat(cubicMetre.toFixed(4)),
        cubicFeet: parseFloat(cubicFeet.toFixed(2)),
        volumeWeight: parseFloat(volumeWeight.toFixed(2))
      });
    } else {
      setCalculatedValues({
        cubicMetre: 0,
        cubicFeet: 0,
        volumeWeight: 0
      });
    }
  }, [formData.length, formData.width, formData.height]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Package name is required");
      return;
    }

    if (!formData.length || !formData.width || !formData.height) {
      toast.error("All dimensions are required");
      return;
    }

    if (!formData.weight) {
      toast.error("Weight is required");
      return;
    }

    if (!formData.quantity || parseInt(formData.quantity) < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    // Prepare package data
    const packageData = {
      name: formData.name.trim(),
      length: parseFloat(formData.length),
      width: parseFloat(formData.width),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      quantity: parseInt(formData.quantity),
      cubicMetre: calculatedValues.cubicMetre,
      cubicFeet: calculatedValues.cubicFeet,
      volumeWeight: calculatedValues.volumeWeight
    };

    onSubmit(packageData);
    
    // Reset form
    setFormData({
      name: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      quantity: "1"
    });
    
    onOpenChange(false);
    toast.success("Package added successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Package Manually
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Input Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="packageName">Package Name</Label>
              <Input
                id="packageName"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter package name"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="length">Length (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  value={formData.length}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  placeholder="Length"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  placeholder="Width"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="Height"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Weight"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="Quantity"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Calculated Values */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-4 w-4" />
              <span className="font-medium">Auto-Calculated Values</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Cubic Meter:</span>
                <span className="font-semibold">{calculatedValues.cubicMetre.toFixed(4)} m³</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Cubic Feet:</span>
                <span className="font-semibold">{calculatedValues.cubicFeet.toFixed(2)} ft³</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Volume Weight:</span>
                <span className="font-semibold">{calculatedValues.volumeWeight.toFixed(2)} kg</span>
              </div>

              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-sm font-medium text-gray-600">Total Packages:</span>
                <span className="font-semibold text-blue-600">{formData.quantity} pcs</span>
              </div>
            </div>

            {formData.length && formData.width && formData.height && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">
                  📏 Dimensions: {formData.length} × {formData.width} × {formData.height} cm
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  ⚖️ Weight: {formData.weight} kg × {formData.quantity} pcs = {(parseFloat(formData.weight || "0") * parseInt(formData.quantity || "1")).toFixed(2)} kg total
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualPackageDialog;