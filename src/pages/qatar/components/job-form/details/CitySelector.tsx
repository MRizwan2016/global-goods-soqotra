
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CitySelectorProps {
  city: string;
  country: string;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const CitySelector = ({ city, country, handleSelectChange, isEnabled = true }: CitySelectorProps) => {
  // Define city options based on country
  const getCitiesByCountry = (countryName: string) => {
    switch(countryName) {
      case "Sri Lanka":
        return ["Colombo", "Kurunegala", "Galle", "Addalachennai", "Ninthavur", "Dambulla"];
      case "Qatar":
        return ["Doha", "Al Rayyan", "Al Khor", "Al Wakrah", "Dukhan", "Mesaieed"];
      case "UAE":
        return ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah"];
      case "Bahrain":
        return ["Manama", "Riffa", "Muharraq", "Hamad Town", "A'ali"];
      case "Saudi Arabia":
        return ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif"];
      case "Tunisia":
        return ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"];
      case "Uganda":
        return ["Kampala", "Entebbe", "Jinja", "Gulu", "Mbarara"];
      case "Somalia":
        return ["Mogadishu", "Hargeisa", "Kismayo", "Bosaso", "Marka"];
      case "Ethiopia":
        return ["Addis Ababa", "Dire Dawa", "Gondar", "Bahir Dar", "Hawassa"];
      case "Philippines":
        return ["Manila", "Cebu", "Davao", "Quezon City", "Makati"];
      case "Oman":
        return ["Muscat", "Salalah", "Sohar", "Sur", "Nizwa"];
      default:
        return [];
    }
  };
  
  const cityOptions = getCitiesByCountry(country);

  return (
    <div>
      <Label htmlFor="city" className="font-medium text-gray-700 mb-1 block">CITY:</Label>
      <Select 
        value={city || ""} 
        onValueChange={(value) => handleSelectChange("city", value)}
        disabled={!isEnabled || !country}
      >
        <SelectTrigger id="city" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <SelectValue placeholder="SELECT CITY" />
        </SelectTrigger>
        <SelectContent>
          {cityOptions.length > 0 ? (
            cityOptions.map((cityName, index) => (
              <SelectItem key={index} value={cityName}>{cityName.toUpperCase()}</SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>Select a country first</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
