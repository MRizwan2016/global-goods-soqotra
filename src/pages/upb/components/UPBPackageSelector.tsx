import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { packageOptions } from "@/pages/qatar/components/job-form/details/packages/packageData";
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

interface UPBPackageSelectorProps {
  onAddPackage: (packageItem: UPBPackageItem) => void;
}

const UPBPackageSelector: React.FC<UPBPackageSelectorProps> = ({ onAddPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddPackage = () => {
    const packageData = packageOptions.find(pkg => pkg.description === selectedPackage);
    if (!packageData) return;

    const packageItem: UPBPackageItem = {
      id: uuidv4(),
      description: packageData.description,
      dimensions: packageData.dimensions,
      volume: packageData.volume_in_meters * quantity,
      price: parseFloat(packageData.price.replace('QAR ', '').replace(',', '')) * quantity,
      pricingType: 'fixed',
      documentsFee: parseFloat(packageData.documents_fee.replace('QAR ', '').replace(',', '')) * quantity,
      total: parseFloat(packageData.total.replace('QAR ', '').replace(',', '')) * quantity,
    };

    onAddPackage(packageItem);
    setSelectedPackage("");
    setQuantity(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div>
        <Label htmlFor="packageSelect">Package Type</Label>
        <Select value={selectedPackage} onValueChange={setSelectedPackage}>
          <SelectTrigger>
            <SelectValue placeholder="Select package" />
          </SelectTrigger>
          <SelectContent>
            {packageOptions.map((pkg) => (
              <SelectItem key={pkg.sr_no} value={pkg.description}>
                {pkg.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
      </div>
      
      <div className="flex items-end">
        <Button 
          onClick={handleAddPackage}
          disabled={!selectedPackage}
          className="w-full bg-soqotra-blue hover:bg-soqotra-blue/90"
        >
          Add Package
        </Button>
      </div>
    </div>
  );
};

export default UPBPackageSelector;