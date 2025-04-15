
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SECTORS } from "../constants/vesselData";

interface SectorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SectorFilter: React.FC<SectorFilterProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="hover:border-blue-400 transition-colors">
        <SelectValue placeholder="Filter by sector" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sectors</SelectItem>
        {SECTORS.filter(sector => sector !== "").map(sector => (
          <SelectItem key={sector} value={sector}>{sector || "Unknown Sector"}</SelectItem>
        ))}
        {/* Add a specific item for unknown sectors if needed */}
        <SelectItem value="unknown-sector">Unknown Sector</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SectorFilter;
