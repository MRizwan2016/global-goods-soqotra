import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJobForm } from "../context/JobFormContext";

const DESTINATIONS = [
  'ERITREA',
  'SUDAN', 
  'TUNISIA',
  'SRI LANKA',
  'PHILIPPINES', 
  'SOMALIA',
  'ETHIOPIA',
  'SAUDI ARABIA',
  'SYRIA',
  'KENYA',
  'UGANDA',
  'MOZAMBIQUE'
] as const;

const DestinationSelector: React.FC = () => {
  const { jobData, handleSelectChange, readOnly } = useJobForm();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        DESTINATION COUNTRY <span className="text-red-500">*</span>
      </label>
      <Select
        value={jobData.destination || ""}
        onValueChange={(value) => handleSelectChange("destination", value)}
        disabled={readOnly}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select destination country" />
        </SelectTrigger>
        <SelectContent>
          {DESTINATIONS.map((destination) => (
            <SelectItem key={destination} value={destination}>
              {destination}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DestinationSelector;