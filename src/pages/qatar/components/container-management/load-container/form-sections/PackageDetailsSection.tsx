
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PackageDetailsSectionProps {
  packageName: string;
  volume: number;
  weight: number;
  quantity: number;
  barcode: string;
  setPackageName: (value: string) => void;
  setVolume: (value: number) => void;
  setWeight: (value: number) => void;
  setQuantity: (value: number) => void;
  setBarcode: (value: string) => void;
}

const PackageDetailsSection: React.FC<PackageDetailsSectionProps> = ({
  packageName,
  volume,
  weight,
  quantity,
  barcode,
  setPackageName,
  setVolume,
  setWeight,
  setQuantity,
  setBarcode
}) => {
  return (
    <div>
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE TYPE:</Label>
        <Input 
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder="Box, Carton, etc."
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">VOLUME (m³):</Label>
        <Input 
          type="number"
          step="0.001"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">WEIGHT (kg):</Label>
        <Input 
          type="number"
          step="0.01"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">QUANTITY:</Label>
        <Input 
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">BARCODE:</Label>
        <Input 
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
        />
      </div>
    </div>
  );
};

export default PackageDetailsSection;
