
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFiltersProps {
  statusFilter: string;
  typeFilter: string;
  searchText: string;
  setStatusFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
  setSearchText: (value: string) => void;
}

const JobFilters = ({
  statusFilter,
  typeFilter,
  searchText,
  setStatusFilter,
  setTypeFilter,
  setSearchText
}: JobFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-1">
        <Filter size={14} className="text-gray-500" />
        <span className="text-sm text-gray-500">FILTERS:</span>
      </div>
      
      <Select value={statusFilter || "all"} onValueChange={setStatusFilter}>
        <SelectTrigger className="h-8 w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL STATUSES</SelectItem>
          <SelectItem value="PENDING">PENDING</SelectItem>
          <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
          <SelectItem value="SCHEDULED">SCHEDULED</SelectItem>
          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={typeFilter || "all"} onValueChange={setTypeFilter}>
        <SelectTrigger className="h-8 w-40">
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL TYPES</SelectItem>
          <SelectItem value="COLLECTION">COLLECTION</SelectItem>
          <SelectItem value="DELIVERY">DELIVERY</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="relative ml-auto">
        <Input
          type="text"
          placeholder="SEARCH JOBS..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
      </div>
    </div>
  );
};

export default JobFilters;
