
import React from "react";
import { Input } from "@/components/ui/input";

interface VehicleDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  showVehicleDetails: boolean;
}

const VehicleDetails = ({ formState, handleInputChange, showVehicleDetails }: VehicleDetailsProps) => {
  if (!showVehicleDetails) return null;

  return (
    <>
      <div className="md:col-span-3">
        <h3 className="font-medium text-blue-700 border-b border-blue-300 pb-1 mb-3">VEHICLE DETAILS</h3>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">MAKE:</label>
        <Input 
          name="vehicleMake"
          value={formState.vehicleMake || ""}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">MODEL:</label>
        <Input 
          name="vehicleModel"
          value={formState.vehicleModel || ""}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">YEAR:</label>
        <Input 
          name="vehicleYear"
          value={formState.vehicleYear || ""}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">COLOR:</label>
        <Input 
          name="vehicleColor"
          value={formState.vehicleColor || ""}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">CHASSIS/VIN NUMBER:</label>
        <Input 
          name="chassisNumber"
          value={formState.chassisNumber || ""}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
    </>
  );
};

export default VehicleDetails;
