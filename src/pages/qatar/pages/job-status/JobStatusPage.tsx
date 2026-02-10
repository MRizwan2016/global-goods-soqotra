
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Filter, ArrowLeft } from "lucide-react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import JobStatusTable from "../../components/job-status/JobStatusTable";
import JobStatusSummaryView from "../../components/job-list/JobStatusSummaryView";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const JobStatusPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(() => {
    const initialJobs = JobStorageService.getAllJobs();
    console.log("JobStatusPage: Initial jobs loaded:", initialJobs.length);
    return initialJobs;
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  const vehicles = ["41067", "41070", "41073", "514005", "119927", "74827"];
  const jobTypes = ["ALL JOBS", "COLLECTION", "DELIVERY", "PACKING", "UNPACKING"];
  const statuses = ["ALL STATUSES", "PENDING", "IN_PROGRESS", "SCHEDULED", "COMPLETED", "CANCELLED"];
  
  const [statusFilter, setStatusFilter] = useState("ALL STATUSES");
  const [vehicleFilter, setVehicleFilter] = useState("ALL VEHICLES");
  const [jobTypeFilter, setJobTypeFilter] = useState("ALL JOBS");
  
  // Function to refresh jobs from localStorage
  const refreshJobs = useCallback(() => {
    console.log("Refreshing jobs from localStorage...");
    const updatedJobs = JobStorageService.getAllJobs();
    console.log("JobStatusPage: Refreshed jobs count:", updatedJobs.length);
    setJobs(updatedJobs);
  }, []);

  // Listen for storage changes to automatically refresh jobs
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jobs') {
        console.log("Jobs storage changed, refreshing...");
        refreshJobs();
      }
    };

    // Also listen for custom events for localStorage changes within the same tab
    const handleJobsUpdated = () => {
      console.log("Jobs updated event received, refreshing...");
      refreshJobs();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('jobsUpdated', handleJobsUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('jobsUpdated', handleJobsUpdated);
    };
  }, [refreshJobs]);
  
  const additionalFilters = (
    <>
      <div className="min-w-[150px]">
        <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
          <SelectTrigger className="w-full bg-blue-600 text-white">
            <SelectValue placeholder="ALL VEHICLES" />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map(vehicle => (
              <SelectItem key={vehicle} value={vehicle}>
                {vehicle}
              </SelectItem>
            ))}
            <SelectItem value="ALL VEHICLES">ALL VEHICLES</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="min-w-[150px]">
        <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
          <SelectTrigger className="w-full bg-blue-600 text-white">
            <SelectValue placeholder="ALL JOBS" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="min-w-[150px]">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full bg-blue-600 text-white">
            <SelectValue placeholder="ALL STATUSES" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={() => {
          console.log(`Filtering... applied status: ${statusFilter}, vehicle: ${vehicleFilter}, jobType: ${jobTypeFilter}`);
        }}
        className="bg-amber-600 hover:bg-amber-700"
        size="sm"
      >
        <Filter size={14} className="mr-1" />
        APPLY
      </Button>
    </>
  );

  return (
    <>
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          onClick={() => navigate("/qatar")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <JobListPage
        title="Job Status List"
        headerTitle="VIEW JOB STATUS LIST"
        headerSubtitle="Record Listed."
        headerClassName="bg-blue-50 border-blue-100"
        reportTitle="JOB STATUS REPORT"
        jobs={jobs}
        sectors={sectors}
        showVehicleFilter={true}
        showJobTypeFilter={true}
        extraFilters={additionalFilters}
        renderTable={({ currentEntries, indexOfFirstEntry }) => (
          <>
            <JobStatusSummaryView jobs={jobs} />
            <JobStatusTable
              currentEntries={currentEntries}
              indexOfFirstEntry={indexOfFirstEntry}
            />
          </>
        )}
        refreshJobs={refreshJobs}
      />
    </>
  );
};

export default JobStatusPage;
