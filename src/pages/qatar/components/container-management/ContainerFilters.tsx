
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContainerFiltersProps {
  sectorFilter: string;
  setSectorFilter: (sector: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const ContainerFilters: React.FC<ContainerFiltersProps> = ({
  sectorFilter,
  setSectorFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex gap-4">
      <Select value={sectorFilter} onValueChange={setSectorFilter}>
        <SelectTrigger className="w-44 bg-blue-500 text-white">
          <SelectValue placeholder="Select Sector" />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectItem value="all">All Sectors</SelectItem>
          <SelectItem value="COLOMBO">COLOMBO : C</SelectItem>
          <SelectItem value="DUBAI">DUBAI : D</SelectItem>
          <SelectItem value="KUWAIT">KUWAIT : K</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44 bg-blue-500 text-white">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="NEW">NEW</SelectItem>
          <SelectItem value="LOADED">LOADED</SelectItem>
          <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="default" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
        <FileText size={18} />
        Import
      </Button>
    </div>
  );
};

export default ContainerFilters;
