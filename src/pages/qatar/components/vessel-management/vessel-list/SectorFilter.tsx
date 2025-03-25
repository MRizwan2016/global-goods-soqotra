
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SectorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SectorFilter: React.FC<SectorFilterProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by sector" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sectors</SelectItem>
        <SelectItem value="COLOMBO">Colombo</SelectItem>
        <SelectItem value="GALLE">Galle</SelectItem>
        <SelectItem value="KURUNEGALA">Kurunegala</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SectorFilter;
