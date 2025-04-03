
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
  // Filter out any city that might have empty code
  const validCities = mockCities.filter(city => city.code && city.code.trim() !== "");

  // Ensure we have a valid city value
  const safeCity = city || "default";

  return (
    <div className="col-span-2 sm:col-span-1">
      <Label htmlFor="city">CITY:</Label>
      <Select 
        value={safeCity} 
        onValueChange={(value) => handleSelectChange("city", value)}
      >
        <SelectTrigger id="city" className="bg-blue-600 text-white">
          <SelectValue placeholder="SELECT CITY" />
        </SelectTrigger>
        <SelectContent>
          {validCities.length > 0 ? (
            validCities.map(city => (
              <SelectItem key={city.id} value={city.code || `city-${city.id}`}>
                {city.name} - {city.code}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-cities-available">No cities available</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
