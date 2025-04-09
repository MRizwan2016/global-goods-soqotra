
import React from "react";
import { Input } from "@/components/ui/input";

interface DimensionsTabProps {
  formState: {
    length: string;
    width: string;
    height: string;
    weightInKg: string;
  };
  volumeInMeters: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DimensionsTab: React.FC<DimensionsTabProps> = ({ formState, volumeInMeters, onChange }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col md:col-span-2">
          <h4 className="font-medium text-gray-700 mb-2">Dimensions & Weight</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Length (inches):</label>
              <Input 
                name="length"
                value={formState.length}
                onChange={onChange}
                type="number"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Width (inches):</label>
              <Input 
                name="width"
                value={formState.width}
                onChange={onChange}
                type="number"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Height (inches):</label>
              <Input 
                name="height"
                value={formState.height}
                onChange={onChange}
                type="number"
                className="border border-gray-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Weight (kg):</label>
              <Input 
                name="weightInKg"
                value={formState.weightInKg}
                onChange={onChange}
                type="number"
                className="border border-gray-300"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Volume (cubic meters):</label>
          <Input 
            value={volumeInMeters}
            readOnly
            className="border border-gray-300 bg-gray-50 font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default DimensionsTab;
