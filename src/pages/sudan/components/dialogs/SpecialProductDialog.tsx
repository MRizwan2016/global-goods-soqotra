import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface SpecialProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPackage: (packageData: any) => void;
}

const SPECIAL_CATEGORIES = [
  { value: 'FRAGILE', label: 'Fragile Items' },
  { value: 'ELECTRONICS', label: 'Electronics' },
  { value: 'DOCUMENTS', label: 'Important Documents' },
  { value: 'MEDICINE', label: 'Medicines' },
  { value: 'JEWELRY', label: 'Jewelry & Valuables' },
  { value: 'ARTWORK', label: 'Artwork' },
  { value: 'AUTOMOTIVE', label: 'Automotive Parts' },
  { value: 'FOOD', label: 'Food Items' },
  { value: 'OTHER', label: 'Other Special Item' }
];

const SpecialProductDialog: React.FC<SpecialProductDialogProps> = ({
  isOpen,
  onClose,
  onAddPackage
}) => {
  const [packageData, setPackageData] = useState({
    name: '',
    category: '',
    description: '',
    specialInstructions: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    quantity: '1',
    value: '',
    requiresInsurance: false,
    isFragile: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
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

    if (!packageData.category) {
      toast.error("Special category is required");
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
      type: 'SPECIAL',
      dimensions,
      cubicMeter,
      quantity: parseInt(packageData.quantity) || 1,
      weight: parseFloat(packageData.weight),
      value: parseFloat(packageData.value) || 0,
      specialHandling: true
    };

    onAddPackage(finalPackage);
    
    // Reset form
    setPackageData({
      name: '',
      category: '',
      description: '',
      specialInstructions: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      quantity: '1',
      value: '',
      requiresInsurance: false,
      isFragile: false
    });
    
    onClose();
    toast.success("Special product added successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Add Special Product
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialName">Product Name *</Label>
              <Input
                id="specialName"
                value={packageData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter special product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialCategory">Special Category *</Label>
              <Select 
                value={packageData.category} 
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIAL_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description and Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialDescription">Description</Label>
              <Textarea
                id="specialDescription"
                value={packageData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description of the item"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Handling Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={packageData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Special handling requirements"
                rows={3}
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialLength">Length (cm)</Label>
              <Input
                id="specialLength"
                type="number"
                value={packageData.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                placeholder="Length"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialWidth">Width (cm)</Label>
              <Input
                id="specialWidth"
                type="number"
                value={packageData.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                placeholder="Width"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialHeight">Height (cm)</Label>
              <Input
                id="specialHeight"
                type="number"
                value={packageData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="Height"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialWeight">Weight (kg) *</Label>
              <Input
                id="specialWeight"
                type="number"
                step="0.1"
                value={packageData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="Weight"
              />
            </div>
          </div>

          {/* Quantity and Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialQuantity">Quantity</Label>
              <Input
                id="specialQuantity"
                type="number"
                value={packageData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="Quantity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialValue">Declared Value (QAR)</Label>
              <Input
                id="specialValue"
                type="number"
                step="0.01"
                value={packageData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder="Declared value"
              />
            </div>
          </div>

          {/* Special Options */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Special Handling Options</h4>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={packageData.isFragile}
                  onChange={(e) => handleInputChange('isFragile', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Fragile - Handle with Care</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={packageData.requiresInsurance}
                  onChange={(e) => handleInputChange('requiresInsurance', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Requires Insurance</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Add Special Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialProductDialog;