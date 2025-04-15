
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Printer,
  Search,
  Calendar
} from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sectorFilter: string;
  setSectorFilter: (value: string) => void;
  jobNumberFilter: string;
  setJobNumberFilter: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  sectors: string[];
  handlePrint: () => Promise<void>;
  additionalFilters?: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  sectorFilter,
  setSectorFilter,
  jobNumberFilter,
  setJobNumberFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sectors,
  handlePrint,
  additionalFilters
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="min-w-[150px]">
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-full bg-blue-600 text-white">
            <SelectValue placeholder="ALL SECTORS" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="min-w-[150px]">
        <Select value={jobNumberFilter} onValueChange={setJobNumberFilter}>
          <SelectTrigger className="w-full bg-blue-600 text-white">
            <SelectValue placeholder="JOB NUMBER" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">ASCENDING</SelectItem>
            <SelectItem value="desc">DESCENDING</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-blue-600" />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-[150px]"
          placeholder="Start Date"
        />
        <span>to</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-[150px]"
          placeholder="End Date"
        />
      </div>

      {additionalFilters}
      
      <div className="flex-grow">
        <div className="relative">
          <Input 
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>
      
      <Button 
        type="button"
        onClick={handlePrint}
        className="bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2"
      >
        <Printer size={16} />
        PRINT REPORT
      </Button>
    </div>
  );
};

export default FilterBar;
