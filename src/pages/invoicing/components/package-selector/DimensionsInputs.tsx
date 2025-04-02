
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { generateNextBoxNumber } from "../../utils/autoGenerators";
import { PackageItem } from "../../types/invoiceForm";
import { calculateCubicMeter } from "../../utils/packageDimensions";

interface DimensionsInputsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageItems?: PackageItem[];
}

const DimensionsInputs: React.FC<DimensionsInputsProps> = ({
  formState,
  handleInputChange,
  packageItems = [],
}) => {
  // Calculate cubic meter when dimensions change
  useEffect(() => {
    if (formState.length && formState.width && formState.height) {
      const length = formState.length;
      const width = formState.width;
      const height = formState.height;
      
      // Use the updated calculation function
      const cubicMetre = calculateCubicMeter(length, width, height);
      
      if (cubicMetre) {
        const event = {
          target: {
            name: "cubicMetre",
            value: cubicMetre
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(event);
      }
    }
  }, [formState.length, formState.width, formState.height, handleInputChange]);

  // Auto-generate box number
  useEffect(() => {
    // Get existing box numbers
    const existingBoxNumbers = packageItems.map(item => item.boxNumber);
    // Generate next box number
    const nextBoxNumber = generateNextBoxNumber(existingBoxNumbers);
    
    if (!formState.boxNumber) {
      const event = {
        target: {
          name: "boxNumber",
          value: nextBoxNumber
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  }, [packageItems, formState.boxNumber, handleInputChange]);

  return (
    <>
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
        <label className="text-sm font-medium mb-1">LENGTH (inches):</label>
        <Input 
          name="length"
          value={formState.length}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">CUBIC FEET:</label>
        <Input 
          name="cubicFeet"
          value={formState.cubicFeet}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WIDTH (inches):</label>
        <Input 
          name="width"
          value={formState.width}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WEIGHT:</label>
        <Input 
          name="packageWeight"
          value={formState.packageWeight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">HEIGHT (inches):</label>
        <Input 
          name="height"
          value={formState.height}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">BOX NUMBER:</label>
        <Input 
          name="boxNumber"
          value={formState.boxNumber}
          onChange={handleInputChange}
          className="border border-gray-300 bg-gray-50"
          readOnly
          title="Box number is automatically generated"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">VOLUME WEIGHT:</label>
        <Input 
          name="volumeWeight"
          value={formState.volumeWeight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
    </>
  );
};

export default DimensionsInputs;
