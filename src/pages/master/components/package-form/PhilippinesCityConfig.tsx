
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

interface PhilippinesCityConfigProps {
  selectedCity: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  pricing: {
    price: string;
    documentsFee: string;
  };
  onDimensionsChange: (newDimensions: any) => void;
  onPricingChange: (newPricing: any) => void;
  onSave: () => void;
}

const PHILIPPINES_CITIES = [
  "Metro Manila",
  "Luzon 1",
  "Luzon 2", 
  "Luzon 3",
  "Visayas",
  "Mindanao"
];

const PhilippinesCityConfig: React.FC<PhilippinesCityConfigProps> = ({
  selectedCity,
  dimensions,
  pricing,
  onDimensionsChange,
  onPricingChange,
  onSave
}) => {
  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDimensionsChange({
      ...dimensions,
      [name]: value
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onPricingChange({
      ...pricing,
      [name]: value
    });
  };

  return (
    <div className="mt-4 p-4 border border-blue-100 rounded-md bg-blue-50">
      <h3 className="text-lg font-medium text-blue-800 mb-4">
        Configure {selectedCity} Package
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label>Length (inches):</Label>
          <Input
            name="length"
            value={dimensions.length}
            onChange={handleDimensionChange}
            type="number"
            min="0"
            placeholder="Length"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Width (inches):</Label>
          <Input
            name="width"
            value={dimensions.width}
            onChange={handleDimensionChange}
            type="number"
            min="0"
            placeholder="Width"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Height (inches):</Label>
          <Input
            name="height"
            value={dimensions.height}
            onChange={handleDimensionChange}
            type="number"
            min="0"
            placeholder="Height"
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Price:</Label>
          <Input
            name="price"
            value={pricing.price}
            onChange={handlePriceChange}
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Documents Fee:</Label>
          <Input
            name="documentsFee"
            value={pricing.documentsFee}
            onChange={handlePriceChange}
            type="number"
            min="0"
            step="0.01"
            placeholder="Documents Fee"
            className="mt-1"
          />
        </div>
      </div>
      
      <Button
        onClick={onSave}
        className="bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        <SaveIcon className="mr-2 h-4 w-4" />
        Save {selectedCity} Configuration
      </Button>
    </div>
  );
};

export default PhilippinesCityConfig;
