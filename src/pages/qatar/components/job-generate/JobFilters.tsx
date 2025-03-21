
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QatarJob } from "../../types/jobTypes";
import { Calendar, Printer, CheckSquare, Edit } from "lucide-react";

interface JobFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
  selectedJobs: QatarJob[];
  onCloseJobs: () => void;
  onPrintJobs: () => void;
  onEditSchedule: () => void;
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
  onEditSchedule
}) => {
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="status-filter">Job Status</Label>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Jobs</SelectItem>
              <SelectItem value="PENDING">Pending Jobs</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled Jobs</SelectItem>
              <SelectItem value="COMPLETED">Completed Jobs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sort-by">Sort By</Label>
          <Select 
            value={sortBy} 
            onValueChange={setSortBy}
          >
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DATE_ASC">Date (Oldest First)</SelectItem>
              <SelectItem value="DATE_DESC">Date (Newest First)</SelectItem>
              <SelectItem value="CUSTOMER_ASC">Customer Name (A-Z)</SelectItem>
              <SelectItem value="CUSTOMER_DESC">Customer Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="date-filter">Date Filter</Label>
          <div className="flex">
            <Input 
              id="date-filter"
              type="date" 
              className="rounded-r-none" 
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)}
              max={today}
            />
            <Button 
              type="button" 
              variant="outline" 
              className="rounded-l-none border-l-0"
              onClick={() => setFilterDate('')}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            className="flex gap-2 border-blue-300"
            onClick={onCloseJobs}
            disabled={selectedJobs.length === 0}
          >
            <CheckSquare className="h-4 w-4" />
            <span className="whitespace-nowrap">Close Selected</span>
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            className="flex gap-2 border-green-300"
            onClick={onEditSchedule}
            disabled={selectedJobs.length === 0}
          >
            <Edit className="h-4 w-4" />
            <span className="whitespace-nowrap">Edit Schedule</span>
          </Button>
          
          <Button 
            type="button"
            className="bg-blue-600 hover:bg-blue-700 flex gap-2"
            onClick={onPrintJobs}
            disabled={selectedJobs.length === 0}
          >
            <Printer className="h-4 w-4" />
            <span className="whitespace-nowrap">Print Jobs</span>
          </Button>
        </div>
      </div>
      
      {selectedJobs.length > 0 && (
        <div className="mt-2 text-sm bg-blue-50 p-2 rounded flex items-center justify-between">
          <span className="font-medium text-blue-700">
            {selectedJobs.length} job{selectedJobs.length !== 1 && 's'} selected
          </span>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
