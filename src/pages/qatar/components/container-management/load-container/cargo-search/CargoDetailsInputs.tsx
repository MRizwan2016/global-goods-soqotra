
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CargoDetailsInputsProps {
  bookingForm: string;
  packageNumber: string;
  packageName: string;
  shipper: string;
  onPackageNumberChange: (value: string) => void;
  onPackageNameChange: (value: string) => void;
  onShipperChange: (value: string) => void;
}

const CargoDetailsInputs: React.FC<CargoDetailsInputsProps> = ({
  bookingForm,
  packageNumber,
  packageName,
  shipper,
  onPackageNumberChange,
  onPackageNameChange,
  onShipperChange,
}) => {
  const packageOptions = [
    "Wooden Box",
    "Carton Box",
    "Crate",
    "Pallet",
    "Drum",
    "Roll",
    "Bag",
    "Bundle"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">LINE NUMBER:</Label>
        <Input
          value={packageNumber}
          onChange={(e) => onPackageNumberChange(e.target.value)}
          placeholder="PACKAGE NUMBER"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NAME:</Label>
        <Input
          value={packageName}
          onChange={(e) => onPackageNameChange(e.target.value)}
          placeholder="PACKAGE NAME"
          list="packageOptions"
        />
        <datalist id="packageOptions">
          {packageOptions.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </div>
      
      <div className="md:col-span-2">
        <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
        <Input
          value={shipper}
          onChange={(e) => onShipperChange(e.target.value)}
          placeholder="SHIPPER"
        />
      </div>
    </div>
  );
};

export default CargoDetailsInputs;
