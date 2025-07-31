import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateCubicMeter } from "@/pages/invoicing/utils/packageDimensions";

interface SpecialProductPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (packageData: any) => void;
}

const SPECIAL_PRODUCTS = [
  "WASHING MACHINE",
  "TELEVISIONS", 
  "REFRIDGERATORS",
  "MICROWAVE OVEN",
  "OVEN",
  "MATTRESS"
];

const SpecialProductPackageDialog: React.FC<SpecialProductPackageDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    productType: "",
    sellingAmount: "",
    length: "",
    width: "",
    height: "",
    grossWeight: "",
    quantity: "1"
  });

  const [calculatedVolume, setCalculatedVolume] = useState("");

  // Calculate volume when dimensions change
  React.useEffect(() => {
    if (formData.length && formData.width && formData.height) {
      const volume = calculateCubicMeter(formData.length, formData.width, formData.height);
      setCalculatedVolume(volume);
    } else {
      setCalculatedVolume("");
    }
  }, [formData.length, formData.width, formData.height]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      productType: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.productType || !formData.sellingAmount || !formData.grossWeight) {
      return;
    }

    const packageData = {
      id: `special-${Date.now()}`,
      description: formData.productType,
      sellingAmount: parseFloat(formData.sellingAmount),
      dimensions: {
        length: parseFloat(formData.length) || 0,
        width: parseFloat(formData.width) || 0,
        height: parseFloat(formData.height) || 0
      },
      volume: parseFloat(calculatedVolume) || 0,
      grossWeight: parseFloat(formData.grossWeight),
      quantity: parseInt(formData.quantity),
      isSpecialProduct: true, // Flag to identify special products
      price: formData.sellingAmount // Use selling amount as price for special products
    };

    onSubmit(packageData);
    
    // Reset form
    setFormData({
      productType: "",
      sellingAmount: "",
      length: "",
      width: "",
      height: "",
      grossWeight: "",
      quantity: "1"
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      productType: "",
      sellingAmount: "",
      length: "",
      width: "",
      height: "",
      grossWeight: "",
      quantity: "1"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Special Product Package</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="productType">Product Type *</Label>
            <Select value={formData.productType} onValueChange={handleProductTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {SPECIAL_PRODUCTS.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sellingAmount">Selling Amount (QAR) *</Label>
            <Input
              id="sellingAmount"
              name="sellingAmount"
              type="number"
              step="0.01"
              value={formData.sellingAmount}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="length">Length (inches)</Label>
              <Input
                id="length"
                name="length"
                type="number"
                step="0.1"
                value={formData.length}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="width">Width (inches)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                step="0.1"
                value={formData.width}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="height">Height (inches)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                step="0.1"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          {calculatedVolume && (
            <div>
              <Label>Calculated Volume (CBM)</Label>
              <Input value={calculatedVolume} readOnly className="bg-gray-50" />
            </div>
          )}

          <div>
            <Label htmlFor="grossWeight">Gross Weight (kg) *</Label>
            <Input
              id="grossWeight"
              name="grossWeight"
              type="number"
              step="0.1"
              value={formData.grossWeight}
              onChange={handleInputChange}
              placeholder="0.0"
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.productType || !formData.sellingAmount || !formData.grossWeight}
          >
            Add Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialProductPackageDialog;