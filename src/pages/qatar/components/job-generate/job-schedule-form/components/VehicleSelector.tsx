
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
import { Truck, AlertTriangle } from "lucide-react";
import { useMaintenanceAlerts } from "@/hooks/useMaintenanceAlerts";

interface VehicleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  filteredVehicles: QatarVehicle[];
  uniqueCities: string[];
  selectedJobs: QatarJob[];
}

// Specific vehicle numbers we want to prioritize
const specificVehicleNumbers = ["41070", "41067", "41073", "514005", "119927", "74827"];

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  value,
  onChange,
  filteredVehicles,
  uniqueCities,
  selectedJobs,
}) => {
  const { isVehicleOverdue } = useMaintenanceAlerts();

  // Prioritize the specific vehicles and put them at the top
  const prioritizedVehicles = [...filteredVehicles].sort((a, b) => {
    const aIsSpecific = specificVehicleNumbers.includes(a.number);
    const bIsSpecific = specificVehicleNumbers.includes(b.number);
    
    if (aIsSpecific && !bIsSpecific) return -1;
    if (!aIsSpecific && bIsSpecific) return 1;
    return 0;
  });
  
  // Get vehicle type for the selected vehicle
  const selectedVehicle = filteredVehicles.find(vehicle => vehicle.number === value);
  const vehicleDisplayText = value ? 
    `${value} - ${selectedVehicle?.type || 'VEHICLE'}` : 
    "SELECT VEHICLE";

  return (
    <div className="mb-3">
      <Label htmlFor="vehicle" className="font-bold text-gray-700 mb-1 block">VEHICLE:</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger 
          id="vehicle" 
          className="bg-blue-500 text-white font-semibold border-0 hover:bg-blue-600 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <SelectValue placeholder="SELECT VEHICLE">{vehicleDisplayText}</SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {prioritizedVehicles.length > 0 ? (
            prioritizedVehicles.map(vehicle => {
              const isSpecific = specificVehicleNumbers.includes(vehicle.number);
              const overdue = isVehicleOverdue(vehicle.number);
              return (
                <SelectItem 
                  key={vehicle.id} 
                  value={vehicle.number}
                  className={`py-2 hover:bg-blue-50 transition-colors ${isSpecific ? 'bg-blue-50' : ''} ${overdue ? 'border-l-4 border-l-destructive' : ''}`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-bold">{vehicle.number}</span>
                      <span className="mx-2">|</span>
                      <span>{vehicle.type}</span>
                      {overdue && (
                        <Badge className="ml-2 bg-red-100 text-red-800 gap-1">
                          <AlertTriangle className="h-3 w-3" /> Service Due
                        </Badge>
                      )}
                      {isSpecific && !overdue && (
                        <Badge className="ml-2 bg-green-100 text-green-800">Recommended</Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{vehicle.description}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {uniqueCities.map(city => {
                        const cityVehicles = cityVehicleMapping[city] || [];
                        if (cityVehicles.includes(vehicle.number)) {
                          return (
                            <Badge key={city} className="bg-blue-100 text-blue-800 text-xs hover:bg-blue-200">
                              {city}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </SelectItem>
              );
            })
          ) : (
            <SelectItem value="no-match" disabled>No matching vehicles</SelectItem>
          )}
        </SelectContent>
      </Select>
      {value ? (
        <p className="text-xs text-gray-500 mt-1 animate-fade-in">
          {selectedJobs.length} jobs selected for vehicle #{value}
        </p>
      ) : uniqueCities.length > 0 ? (
        <p className="text-xs text-gray-500 mt-1 animate-fade-in">
          Showing vehicles for {uniqueCities.join(', ')} ({selectedJobs.length} jobs selected)
        </p>
      ) : null}
    </div>
  );
};

export default VehicleSelector;
