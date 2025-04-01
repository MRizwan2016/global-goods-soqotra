
import React from "react";
import { Input } from "@/components/ui/input";

interface BasicCargoFieldsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicCargoFields = ({ formState, handleInputChange }: BasicCargoFieldsProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">GROSS WEIGHT (KG):</label>
        <Input 
          name="grossWeight"
          value={formState.grossWeight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">NET WEIGHT (KG):</label>
        <Input 
          name="netWeight"
          value={formState.netWeight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">MEASUREMENT (CBM):</label>
        <Input 
          name="measurement"
          value={formState.measurement}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PACKAGES:</label>
        <Input 
          name="packages"
          value={formState.packages}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
    </>
  );
};

export default BasicCargoFields;
