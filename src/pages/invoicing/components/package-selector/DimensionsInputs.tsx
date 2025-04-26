
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PackageItem } from "../../types/invoiceForm";
import { calculateCubicMeter } from "../../utils/packageDimensions";

interface DimensionsInputsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  packageItems: PackageItem[];
}

const DimensionsInputs: React.FC<DimensionsInputsProps> = ({
  formState,
  handleInputChange,
  packageItems,
}) => {
  // Calculate cubic meter when dimensions change
  useEffect(() => {
    if (formState.length && formState.width && formState.height) {
      const cubicMeter = calculateCubicMeter(
        formState.length,
        formState.width,
        formState.height
      );
      
      const event = {
        target: {
          name: "cubicMetre",
          value: cubicMeter
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  }, [formState.length, formState.width, formState.height]);

  // Generate box number based on package items if not set
  useEffect(() => {
    if (!formState.boxNumber && packageItems.length > 0) {
      const event = {
        target: {
          name: "boxNumber",
          value: String(packageItems.length + 1)
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  }, [formState.boxNumber, packageItems]);

  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">BOX NUMBER:</label>
        <Input 
          name="boxNumber"
          value={formState.boxNumber}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">LENGTH (in):</label>
        <Input 
          name="length"
          value={formState.length}
          onChange={handleInputChange}
          className="border border-gray-300"
          type="number"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WIDTH (in):</label>
        <Input 
          name="width"
          value={formState.width}
          onChange={handleInputChange}
          className="border border-gray-300"
          type="number"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">HEIGHT (in):</label>
        <Input 
          name="height"
          value={formState.height}
          onChange={handleInputChange}
          className="border border-gray-300"
          type="number"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">CUBIC METRE:</label>
        <Input 
          name="cubicMetre"
          value={formState.cubicMetre}
          onChange={handleInputChange}
          className="border border-gray-300 bg-gray-50"
          readOnly
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WEIGHT (kg):</label>
        <Input 
          name="packageWeight"
          value={formState.packageWeight}
          onChange={handleInputChange}
          className="border border-gray-300"
          type="number"
        />
      </div>
    </>
  );
};

export default DimensionsInputs;
