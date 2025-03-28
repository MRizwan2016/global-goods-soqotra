
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface CargoForm {
  invoiceNumber: string;
  lineNumber: string;
  barcode: string;
  packageName: string;
  volume: string;
  weight: string;
  shipper: string;
  consignee: string;
  wh: string;
  d2d: boolean;
  quantity: string;
}

interface CargoDetailsInputsProps {
  cargoForm: CargoForm; // Added to match passed props
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added to match passed props
  bookingForm?: string;
  packageNumber?: string;
  packageName?: string;
  shipper?: string;
  onPackageNumberChange?: (value: string) => void;
  onPackageNameChange?: (value: string) => void;
  onShipperChange?: (value: string) => void;
}

const CargoDetailsInputs: React.FC<CargoDetailsInputsProps> = ({
  cargoForm,
  onChange,
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
        <Label className="font-bold text-gray-700 mb-1 block">INVOICE NUMBER:</Label>
        <Input
          name="invoiceNumber"
          value={cargoForm.invoiceNumber}
          onChange={onChange}
          placeholder="INVOICE NUMBER"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">LINE NUMBER:</Label>
        <Input
          name="lineNumber"
          value={cargoForm.lineNumber}
          onChange={onChange}
          placeholder="LINE NUMBER"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">BARCODE:</Label>
        <Input
          name="barcode"
          value={cargoForm.barcode}
          onChange={onChange}
          placeholder="BARCODE"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NAME:</Label>
        <Input
          name="packageName"
          value={cargoForm.packageName}
          onChange={onChange}
          placeholder="PACKAGE NAME"
          list="packageOptions"
        />
        <datalist id="packageOptions">
          {packageOptions.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">VOLUME (m³):</Label>
        <Input
          name="volume"
          type="number"
          step="0.001"
          value={cargoForm.volume}
          onChange={onChange}
          placeholder="VOLUME"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">WEIGHT (kg):</Label>
        <Input
          name="weight"
          type="number"
          step="0.1"
          value={cargoForm.weight}
          onChange={onChange}
          placeholder="WEIGHT"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
        <Input
          name="shipper"
          value={cargoForm.shipper}
          onChange={onChange}
          placeholder="SHIPPER"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">CONSIGNEE:</Label>
        <Input
          name="consignee"
          value={cargoForm.consignee}
          onChange={onChange}
          placeholder="CONSIGNEE"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">WAREHOUSE:</Label>
        <Input
          name="wh"
          value={cargoForm.wh}
          onChange={onChange}
          placeholder="WAREHOUSE CODE"
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">QUANTITY:</Label>
        <Input
          name="quantity"
          type="number"
          value={cargoForm.quantity}
          onChange={onChange}
          placeholder="QUANTITY"
        />
      </div>
      
      <div className="flex items-center space-x-2 md:col-span-2">
        <Checkbox 
          id="d2d"
          name="d2d"
          checked={cargoForm.d2d}
          onCheckedChange={(checked) => {
            const event = {
              target: {
                name: "d2d",
                type: "checkbox",
                checked: checked === true
              }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
          }}
        />
        <Label htmlFor="d2d" className="font-bold text-gray-700">DOOR-TO-DOOR DELIVERY</Label>
      </div>
    </div>
  );
};

export default CargoDetailsInputs;
