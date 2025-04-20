
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
import { Circle } from "lucide-react";

const VehicleSelector = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();

  // Updated vehicles list with specific vehicle numbers
  const vehicles = [
    { id: "41067", name: "41067 - LORRY", status: "available" },
    { id: "41070", name: "41070 - LORRY", status: "available" },
    { id: "41073", name: "41073 - LORRY", status: "available" },
    { id: "514005", name: "514005 - LORRY", status: "busy" },
    { id: "74827", name: "74827 - TRUCK", status: "available" },
    { id: "119927", name: "119927 - TRUCK", status: "busy" },
    { id: "PICKUP", name: "PICKUP", status: "available" },
    { id: "SUZUKI", name: "SUZUKI", status: "available" },
    { id: "HIACE VAN", name: "HIACE VAN", status: "available" },
    { id: "3 TON TRUCK", name: "3 TON TRUCK", status: "available" },
    { id: "7 TON TRUCK", name: "7 TON TRUCK", status: "available" }
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
        <SelectContent className="bg-white">
          {vehicles.map((vehicle) => (
            <SelectItem key={vehicle.id} value={vehicle.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Circle 
                  className={`h-3 w-3 ${vehicle.status === 'available' ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'}`} 
                />
                {vehicle.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;
