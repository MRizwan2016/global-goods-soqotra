
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Select value={sector} onValueChange={onSectorChange}>
        <SelectTrigger id="sector" className="w-full mt-1">
          <SelectValue placeholder="Select Sector" />
        </SelectTrigger>
        <SelectContent>
          {sectors.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SectorSelector;
