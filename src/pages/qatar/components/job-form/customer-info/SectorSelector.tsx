
import React from "react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface SectorSelectorProps {
  sector: string;
  onSectorChange: (value: string) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ sector, onSectorChange }) => {
  const sectors = [
    { value: "", label: "Select Sector" },
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "east", label: "East" },
    { value: "west", label: "West" },
    { value: "central", label: "Central" }
  ];

  return (
    <div className="form-group">
      <Label htmlFor="sector" className="font-medium">Sector</Label>
      <Select
        id="sector"
        value={sector}
        onValueChange={onSectorChange}
        placeholder="Select Sector"
        className="w-full mt-1"
      >
        {sectors.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SectorSelector;
