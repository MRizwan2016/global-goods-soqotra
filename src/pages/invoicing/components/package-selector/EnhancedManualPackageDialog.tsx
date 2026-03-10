import React, { useState, useEffect } from "react";
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

interface EnhancedManualPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (packageName: string, price: string, dimensions: string, volume: string, pricingType: string, documentsFee: string) => void;
}

const EnhancedManualPackageDialog: React.FC<EnhancedManualPackageDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    packageName: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    pricingType: "perCBM" as 'perKg' | 'perCBM' | 'fixed',
    ratePerUnit: "",
    documentsFee: "",
  });

  const [calculatedValues, setCalculatedValues] = useState({
    volume: 0,
    price: 0,
    total: 0,
  });

  useEffect(() => {
    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;
    const volume = (length * width * height) * 0.0000163871; // Convert cubic inches to cubic meters

    const weight = parseFloat(formData.weight) || 0;
    const rate = parseFloat(formData.ratePerUnit) || 0;
    const documentsFee = parseFloat(formData.documentsFee) || 0;

    let price = 0;
    switch (formData.pricingType) {
      case 'perKg':
        price = weight * rate;
        break;
      case 'perCBM':
        price = volume * rate;
        break;
      case 'fixed':
        price = rate;
        break;
    }

    const total = price + documentsFee;

    setCalculatedValues({ volume, price, total });
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.packageName || !formData.length || !formData.width || !formData.height) {
      return;
    }

    const dimensions = `${formData.length} X ${formData.width} X ${formData.height}`;
    
    onSubmit(
      formData.packageName,
      calculatedValues.price.toFixed(2),
      dimensions,
      calculatedValues.volume.toFixed(3),
      formData.pricingType,
      formData.documentsFee || "0"
    );

    // Reset form
    setFormData({
      packageName: "",
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Manual Package with Flexible Pricing</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="packageName">Package Name/Description</Label>
            <Input
              id="packageName"
              name="packageName"
              value={formData.packageName}
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
              step="0.01"
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
              step="0.01"
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
              step="0.01"
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
              step="0.01"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Weight in KG"
            />
          </div>

          <div>
            <Label htmlFor="pricingType">Pricing Method</Label>
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
                <SelectItem value="perCBM">Price Per CBM</SelectItem>
                <SelectItem value="perKg">Price Per KG</SelectItem>
                <SelectItem value="fixed">Fixed Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ratePerUnit">
              Rate (QAR {
                formData.pricingType === 'perKg' ? 'per KG' : 
                formData.pricingType === 'perCBM' ? 'per CBM' : 
                'fixed price'
              })
            </Label>
            <Input
              id="ratePerUnit"
              name="ratePerUnit"
              type="number"
              step="0.01"
              value={formData.ratePerUnit}
              onChange={handleInputChange}
              placeholder="Enter rate"
            />
          </div>

          <div>
            <Label htmlFor="documentsFee">Documentation Fee (QAR)</Label>
            <Input
              id="documentsFee"
              name="documentsFee"
              type="number"
              step="0.01"
              value={formData.documentsFee}
              onChange={handleInputChange}
              placeholder="Documentation fee"
            />
          </div>

          <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-semibold mb-3 text-soqotra-blue">Calculation Preview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-600">Volume:</p>
                <p className="text-lg font-semibold">{calculatedValues.volume.toFixed(3)} CBM</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Weight:</p>
                <p className="text-lg font-semibold">{formData.weight || '0'} KG</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Base Price:</p>
                <p className="text-lg font-semibold text-green-600">QAR {calculatedValues.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Total Price:</p>
                <p className="text-xl font-bold text-soqotra-blue">QAR {calculatedValues.total.toFixed(2)}</p>
              </div>
            </div>
            
            {formData.pricingType !== 'fixed' && (
              <div className="mt-3 p-3 bg-white rounded border-l-4 border-soqotra-blue">
                <p className="text-sm text-gray-600">
                  Calculation: {formData.pricingType === 'perKg' ? `${formData.weight || 0} KG × ${formData.ratePerUnit || 0}` : `${calculatedValues.volume.toFixed(3)} CBM × ${formData.ratePerUnit || 0}`} = QAR {calculatedValues.price.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-soqotra-blue hover:bg-soqotra-blue/90"
            disabled={!formData.packageName || !formData.length || !formData.width || !formData.height}
          >
            Add Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedManualPackageDialog;