
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
  return (
    <>
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">BOOKING FORM:</Label>
        <Input
          value={bookingForm}
          className="bg-gray-100"
          readOnly
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NUMBER:</Label>
        <Input
          value={packageNumber}
          onChange={(e) => onPackageNumberChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NAME:</Label>
        <Input
          value={packageName}
          onChange={(e) => onPackageNameChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
        <Input
          value={shipper}
          onChange={(e) => onShipperChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default CargoDetailsInputs;
