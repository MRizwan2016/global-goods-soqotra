
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import JobStatusTable from "../../components/job-status/JobStatusTable";
import JobStatusSummaryView from "../../components/job-list/JobStatusSummaryView";

const JobStatusPage = () => {
  const [jobs] = useState(() => {
    return JobStorageService.getAllJobs();
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  const vehicles = ["ALL VEHICLES", "PICKUP", "SUZUKI", "HIACE VAN", "3 TON TRUCK", "7 TON TRUCK"];
  const jobTypes = ["ALL JOBS", "COLLECTION", "DELIVERY", "PACKING", "UNPACKING"];
  const statuses = ["ALL STATUSES", "PENDING", "IN_PROGRESS", "SCHEDULED", "COMPLETED", "CANCELLED"];
  
  const [statusFilter, setStatusFilter] = useState("ALL STATUSES");
  const [vehicleFilter, setVehicleFilter] = useState("ALL VEHICLES");
  const [jobTypeFilter, setJobTypeFilter] = useState("ALL JOBS");
  
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
          if (Date() && Date()) {
            console.log(`Filtering... applied status: ${statusFilter}`);
          } else {
            alert("Please select both start and end dates");
          }
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
    />
  );
};

export default JobStatusPage;
