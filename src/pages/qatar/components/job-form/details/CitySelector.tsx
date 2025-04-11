
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

const CitySelector = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();

  // Get cities based on country
  const getCitiesByCountry = (countryName: string) => {
    switch(countryName) {
      case "Qatar":
        return ["DOHA", "AL RAYYAN", "AL WAKRAH", "AL KHOR", "UMM SALAL", "AL SHAMAL", "DUKHAN"];
      case "Sri Lanka":
        return ["COLOMBO", "KANDY", "GALLE", "JAFFNA", "NEGOMBO", "BATTICALOA"];
      case "UAE":
        return ["DUBAI", "ABU DHABI", "SHARJAH", "AJMAN", "RAS AL KHAIMAH", "FUJAIRAH"];
      default:
        return [];
    }
  };
  
  const cities = getCitiesByCountry(jobData.country);

  return (
    <div>
      <Label htmlFor="city" className="font-medium text-gray-700 mb-1 block">
        CITY
      </Label>
      <Select
        value={jobData.city}
        onValueChange={(value) => handleSelectChange("city", value)}
        disabled={!isJobNumberGenerated}
      >
        <SelectTrigger id="city" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
          <SelectValue placeholder="SELECT CITY" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city, index) => (
            <SelectItem key={index} value={city}>{city}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
