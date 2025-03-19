
import React, { useState, useMemo } from "react";
import { mockJobs } from "./data/mockJobData";
import JobScheduleForm from "./components/job-generate/JobScheduleForm";
import JobSelectionTable from "./components/job-generate/JobSelectionTable";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import { QatarJob } from "./types/jobTypes";
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
import { CalendarIcon, Clock, Filter, Printer, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const JobGeneratePage: React.FC = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    scheduleNumber: "5352",
    vehicle: "",
    salesRep: "",
    driver: "",
    helper: "",
    scheduleDate: new Date().toISOString().split('T')[0],
  });
  
  // Sorting and filtering states
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState<Date | undefined>(new Date());
  
  // Filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      // Status filter
      if (statusFilter !== "all" && job.status !== statusFilter) {
        return false;
      }
      
      // Date filter
      if (filterDate) {
        const jobDate = new Date(job.date);
        const filterDateObj = new Date(filterDate);
        
        if (
          jobDate.getDate() !== filterDateObj.getDate() ||
          jobDate.getMonth() !== filterDateObj.getMonth() ||
          jobDate.getFullYear() !== filterDateObj.getFullYear()
        ) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "jobNumber") {
        return a.jobNumber.localeCompare(b.jobNumber);
      } else {
        return 0;
      }
    });
  }, [mockJobs, statusFilter, sortBy, filterDate]);
  
  const toggleJobSelection = (job: QatarJob) => {
    const isSelected = selectedJobs.some(j => j.id === job.id);
    
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter(j => j.id !== job.id));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };
  
  const handleScheduleSubmit = (data: any) => {
    setScheduleData(data);
    setIsPrintMode(true);
  };
  
  const handleBackFromPrint = () => {
    setIsPrintMode(false);
  };
  
  const handleCloseJobs = () => {
    if (selectedJobs.length === 0) {
      toast.warning("Please select jobs to close");
      return;
    }
    
    // In a real app, this would update the backend
    toast.success(`${selectedJobs.length} jobs have been closed`);
    
    // Clear selections after closing
    setSelectedJobs([]);
  };

  const handleDirectPrint = () => {
    if (selectedJobs.length === 0) {
      toast.warning("Please select jobs to print");
      return;
    }

    // Go directly to print mode with current schedule data
    setIsPrintMode(true);
  };
  
  if (isPrintMode) {
    return (
      <PrintJobSchedule 
        jobs={selectedJobs} 
        scheduleData={scheduleData}
        onBack={handleBackFromPrint}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">JOB SCHEDULE GENERATION</h1>
        
        {/* Filters */}
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
              onClick={handleDirectPrint}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Selected Jobs
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <JobScheduleForm 
              onSubmit={handleScheduleSubmit} 
              formData={scheduleData}
              setFormData={setScheduleData}
              selectedJobs={selectedJobs}
              disabled={selectedJobs.length === 0}
            />
          </div>
          
          <div className="lg:col-span-2">
            <JobSelectionTable 
              jobs={filteredJobs} 
              selectedJobs={selectedJobs}
              onToggleSelect={toggleJobSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobGeneratePage;
