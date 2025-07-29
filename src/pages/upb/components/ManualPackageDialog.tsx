import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

interface UPBPackageItem {
  id: string;
  description: string;
  dimensions: string;
  volume: number;
  weight?: number;
  price: number;
  pricingType: 'perKg' | 'perCBM' | 'fixed';
  documentsFee: number;
  total: number;
}

interface ManualPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPackage: (packageItem: UPBPackageItem) => void;
}

const ManualPackageDialog: React.FC<ManualPackageDialogProps> = ({
  open,
  onOpenChange,
  onAddPackage,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    pricingType: "perCBM" as 'perKg' | 'perCBM' | 'fixed',
    ratePerUnit: "",
    documentsFee: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateVolume = () => {
    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;
    return (length * width * height) / 1000000; // Convert from cubic inches to cubic meters
  };

  const calculatePrice = () => {
    const volume = calculateVolume();
    const weight = parseFloat(formData.weight) || 0;
    const rate = parseFloat(formData.ratePerUnit) || 0;

    switch (formData.pricingType) {
      case 'perKg':
        return weight * rate;
      case 'perCBM':
        return volume * rate;
      case 'fixed':
        return rate;
      default:
        return 0;
    }
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.length || !formData.width || !formData.height) {
      return;
    }

    const volume = calculateVolume();
    const price = calculatePrice();
    const documentsFee = parseFloat(formData.documentsFee) || 0;
    const total = price + documentsFee;

    const packageItem: UPBPackageItem = {
      id: uuidv4(),
      description: formData.description,
      dimensions: `${formData.length} X ${formData.width} X ${formData.height}`,
      volume,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      price,
      pricingType: formData.pricingType,
      documentsFee,
      total,
    };

    onAddPackage(packageItem);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      description: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      pricingType: "perCBM",
      ratePerUnit: "",
      documentsFee: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Manual Package</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="description">Package Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter package description"
            />
          </div>

          <div>
            <Label htmlFor="length">Length (inches)</Label>
            <Input
              id="length"
              name="length"
              type="number"
              value={formData.length}
              onChange={handleInputChange}
              placeholder="Length"
            />
          </div>

          <div>
            <Label htmlFor="width">Width (inches)</Label>
            <Input
              id="width"
              name="width"
              type="number"
              value={formData.width}
              onChange={handleInputChange}
              placeholder="Width"
            />
          </div>

          <div>
            <Label htmlFor="height">Height (inches)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Height"
            />
          </div>

          <div>
            <Label htmlFor="weight">Weight (KG)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Weight in KG"
            />
          </div>

          <div>
            <Label htmlFor="pricingType">Pricing Type</Label>
            <Select 
              value={formData.pricingType} 
              onValueChange={(value: 'perKg' | 'perCBM' | 'fixed') => 
                setFormData(prev => ({ ...prev, pricingType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="perCBM">Per CBM</SelectItem>
                <SelectItem value="perKg">Per KG</SelectItem>
                <SelectItem value="fixed">Fixed Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ratePerUnit">
              Rate (QAR {formData.pricingType === 'perKg' ? 'per KG' : formData.pricingType === 'perCBM' ? 'per CBM' : 'fixed'})
            </Label>
            <Input
              id="ratePerUnit"
              name="ratePerUnit"
              type="number"
              value={formData.ratePerUnit}
              onChange={handleInputChange}
              placeholder="Enter rate"
            />
          </div>

          <div>
            <Label htmlFor="documentsFee">Documents Fee (QAR)</Label>
            <Input
              id="documentsFee"
              name="documentsFee"
              type="number"
              value={formData.documentsFee}
              onChange={handleInputChange}
              placeholder="Documents fee"
            />
          </div>

          <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Preview</h4>
            <p><strong>Volume:</strong> {calculateVolume().toFixed(3)} CBM</p>
            <p><strong>Calculated Price:</strong> QAR {calculatePrice().toFixed(2)}</p>
            <p><strong>Total with Docs Fee:</strong> QAR {(calculatePrice() + (parseFloat(formData.documentsFee) || 0)).toFixed(2)}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-soqotra-blue hover:bg-soqotra-blue/90">
            Add Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualPackageDialog;