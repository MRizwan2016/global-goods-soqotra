
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Filter, Printer } from "lucide-react";
import { format } from "date-fns";
import { QatarJob } from "../../types/jobTypes";
import { toast } from "sonner";

interface JobFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  filterDate: Date | undefined;
  setFilterDate: (date: Date | undefined) => void;
  selectedJobs: QatarJob[];
  onCloseJobs: () => void;
  onPrintJobs: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  filterDate,
  setFilterDate,
  selectedJobs,
  onCloseJobs,
  onPrintJobs,
}) => {
  const handleCloseJobs = () => {
    if (selectedJobs.length === 0) {
      toast.warning("Please select jobs to close");
      return;
    }
    
    onCloseJobs();
  };

  const handlePrintJobs = () => {
    if (selectedJobs.length === 0) {
      toast.warning("Please select jobs to print");
      return;
    }
    
    onPrintJobs();
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1">
          <Filter size={16} className="text-gray-400" />
          <span className="font-medium">Filters:</span>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="jobNumber">Job Number</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-48 justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterDate ? format(filterDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterDate}
              onSelect={setFilterDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="destructive" 
          className="ml-auto"
          onClick={handleCloseJobs}
        >
          <Clock className="mr-2 h-4 w-4" />
          Close Selected Jobs
        </Button>
        
        <Button 
          variant="outline" 
          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
          onClick={handlePrintJobs}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Selected Jobs
        </Button>
      </div>
    </div>
  );
};

export default JobFilters;
