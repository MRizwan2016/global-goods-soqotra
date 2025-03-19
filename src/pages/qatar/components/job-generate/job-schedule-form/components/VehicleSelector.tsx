
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QatarVehicle } from "../../../../types/vehicleTypes";
import { QatarJob } from "../../../../types/jobTypes";
import { cityVehicleMapping } from "../../../../data/cityVehicleMapping";

interface VehicleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  filteredVehicles: QatarVehicle[];
  uniqueCities: string[];
  selectedJobs: QatarJob[];
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  value,
  onChange,
  filteredVehicles,
  uniqueCities,
  selectedJobs,
}) => {
  return (
    <div>
      <Label htmlFor="vehicle">VEHICLE:</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="vehicle" className="bg-blue-500 text-white">
          <SelectValue placeholder="SELECT VEHICLE" />
        </SelectTrigger>
        <SelectContent>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <SelectItem key={vehicle.id} value={vehicle.number}>
                {vehicle.number}/{vehicle.type}/{vehicle.description}
                {uniqueCities.map(city => {
                  const cityVehicles = cityVehicleMapping[city] || [];
                  if (cityVehicles.includes(vehicle.number)) {
                    return (
                      <Badge key={city} className="ml-1 text-xs">{city}</Badge>
                    );
                  }
                  return null;
                })}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-match" disabled>No matching vehicles</SelectItem>
          )}
        </SelectContent>
      </Select>
      {uniqueCities.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          Showing vehicles for {uniqueCities.join(', ')} ({selectedJobs.length} jobs selected)
        </p>
      )}
    </div>
  );
};

export default VehicleSelector;
