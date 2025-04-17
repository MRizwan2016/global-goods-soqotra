
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

const CountrySelector = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();

  return (
    <div>
      <Label htmlFor="country" className="font-medium text-gray-700 mb-1 block">
        COUNTRY:
      </Label>
      <Select
        value={jobData.country}
        onValueChange={(value) => handleSelectChange("country", value)}
        disabled={!isJobNumberGenerated}
      >
        <SelectTrigger id="country" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <SelectValue placeholder="SELECT COUNTRY" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Sri Lanka">SRI LANKA</SelectItem>
          <SelectItem value="Qatar">QATAR</SelectItem>
          <SelectItem value="UAE">UAE</SelectItem>
          <SelectItem value="Bahrain">BAHRAIN</SelectItem>
          <SelectItem value="Saudi Arabia">SAUDI ARABIA</SelectItem>
          <SelectItem value="Tunisia">TUNISIA</SelectItem>
          <SelectItem value="Uganda">UGANDA</SelectItem>
          <SelectItem value="Somalia">SOMALIA</SelectItem>
          <SelectItem value="Ethiopia">ETHIOPIA</SelectItem>
          <SelectItem value="Philippines">PHILIPPINES</SelectItem>
          <SelectItem value="Oman">OMAN</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
