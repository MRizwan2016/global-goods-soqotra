
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ContainerSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ContainerSearch: React.FC<ContainerSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      <Input 
        className="pl-10 pr-4 py-2" 
        placeholder="Search containers..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ContainerSearch;
