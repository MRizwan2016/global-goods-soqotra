
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCities } from "../../../data/mockLocations";

interface CitySelectorProps {
  city: string;
  handleSelectChange: (name: string, value: string) => void;
}

const CitySelector = ({ city, handleSelectChange }: CitySelectorProps) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <Label htmlFor="city">CITY:</Label>
      <Select 
        value={city} 
        onValueChange={(value) => handleSelectChange("city", value)}
      >
        <SelectTrigger id="city" className="bg-blue-600 text-white">
          <SelectValue placeholder="SELECT CITY" />
        </SelectTrigger>
        <SelectContent>
          {mockCities.map(city => (
            <SelectItem key={city.id} value={city.code}>
              {city.name} - {city.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
