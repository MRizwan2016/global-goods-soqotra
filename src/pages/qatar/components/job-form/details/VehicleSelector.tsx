
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleSelectorProps {
  vehicle: string;
  handleSelectChange: (name: string, value: string) => void;
}

const VehicleSelector = ({ vehicle = "", handleSelectChange }: VehicleSelectorProps) => {
  return (
    <div>
      <Label htmlFor="vehicle" className="font-medium text-gray-700 mb-1 block">VEHICLE:</Label>
      <Select 
        value={vehicle || "default"} 
        onValueChange={(value) => handleSelectChange("vehicle", value)}
      >
        <SelectTrigger id="vehicle" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <SelectValue placeholder="SELECT VEHICLE" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">SELECT VEHICLE</SelectItem>
          <SelectItem value="V1">VEHICLE 1</SelectItem>
          <SelectItem value="V2">VEHICLE 2</SelectItem>
          <SelectItem value="V3">VEHICLE 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;
