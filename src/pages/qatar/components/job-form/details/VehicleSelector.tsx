
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockVehicles } from "../../../data/mockVehicles";

interface VehicleSelectorProps {
  vehicle: string;
  handleSelectChange: (name: string, value: string) => void;
}

const VehicleSelector = ({ vehicle = "", handleSelectChange }: VehicleSelectorProps) => {
  // Filter out any vehicles with empty number and ensure there are no empty string values
  const validVehicles = (mockVehicles || []).filter(v => v && v.number && v.number.trim() !== "");
  
  // For debugging
  console.log("VehicleSelector rendered with valid vehicles:", validVehicles);
  console.log("Current vehicle value:", vehicle);
  
  return (
    <div>
      <Label htmlFor="vehicle">VEHICLE:</Label>
      <Select 
        value={vehicle || "default"} 
        onValueChange={(value) => handleSelectChange("vehicle", value)}
      >
        <SelectTrigger id="vehicle" className="bg-blue-600 text-white">
          <SelectValue placeholder="SELECT VEHICLE" />
        </SelectTrigger>
        <SelectContent>
          {validVehicles.length > 0 ? (
            validVehicles.map(vehicle => (
              <SelectItem 
                key={vehicle.id} 
                value={vehicle.number ? vehicle.number : `vehicle-${vehicle.id}`}
              >
                {vehicle.number}/{vehicle.type}/{vehicle.description}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-vehicles-available">No vehicles available</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;
