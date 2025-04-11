
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobForm } from "../context/JobFormContext";

const VehicleSelector = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();

  const vehicles = [
    "PICKUP",
    "SUZUKI",
    "HIACE VAN",
    "3 TON TRUCK",
    "7 TON TRUCK"
  ];

  return (
    <div>
      <Label htmlFor="vehicle" className="font-medium text-gray-700 mb-1 block">
        VEHICLE
      </Label>
      <Select
        value={jobData.vehicle}
        onValueChange={(value) => handleSelectChange("vehicle", value)}
        disabled={!isJobNumberGenerated}
      >
        <SelectTrigger id="vehicle" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
          <SelectValue placeholder="SELECT VEHICLE" />
        </SelectTrigger>
        <SelectContent>
          {vehicles.map((vehicle, index) => (
            <SelectItem key={index} value={vehicle}>{vehicle}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;
