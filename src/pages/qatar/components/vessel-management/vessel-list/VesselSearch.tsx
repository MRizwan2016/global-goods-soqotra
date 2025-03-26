
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface VesselSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VesselSearch: React.FC<VesselSearchProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        placeholder="Search vessels..."
        value={searchTerm}
        onChange={onSearchChange}
        className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
      />
    </div>
  );
};

export default VesselSearch;
