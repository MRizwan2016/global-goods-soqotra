
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
  isEnabled?: boolean;
}

const VehicleSelector = ({ vehicle = "", handleSelectChange, isEnabled = true }: VehicleSelectorProps) => {
  return (
    <div>
      <Label htmlFor="vehicle" className="font-medium text-gray-700 mb-1 block">VEHICLE:</Label>
      <Select 
        value={vehicle || ""} 
        onValueChange={(value) => handleSelectChange("vehicle", value)}
        disabled={!isEnabled}
      >
        <SelectTrigger id="vehicle" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <SelectValue placeholder="SELECT VEHICLE" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">SELECT VEHICLE</SelectItem>
          <SelectItem value="41067">41067 - LORRY</SelectItem>
          <SelectItem value="41070">41070 - LORRY</SelectItem>
          <SelectItem value="41073">41073 - LORRY</SelectItem>
          <SelectItem value="514005">514005 - MITSUBISHI FUSO</SelectItem>
          <SelectItem value="119927">119927 - PETROL MANUAL</SelectItem>
          <SelectItem value="74827">74827 - TATA LORRY</SelectItem>
          <SelectItem value="1254681854">FORK LIFT - WAREHOUSE</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;
