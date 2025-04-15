
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { JobStorageService } from "./services/JobStorageService";
import { usePrintReport } from "./hooks/usePrintReport";
import { useJobFilters } from "./hooks/useJobFilters";
import FilterBar from "./components/shared/FilterBar";
import EntriesControl from "./components/shared/EntriesControl";
import PrintHeader from "./components/shared/PrintHeader";
import Pagination from "./components/shared/Pagination";
import StatusSummary from "./components/job-status/StatusSummary";
import JobStatusTable from "./components/job-status/JobStatusTable";

const JobStatusList = () => {
  const [jobs] = useState(() => {
    return JobStorageService.getAllJobs();
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  const vehicles = ["ALL VEHICLES", "PICKUP", "SUZUKI", "HIACE VAN", "3 TON TRUCK", "7 TON TRUCK"];
  const jobTypes = ["ALL JOBS", "COLLECTION", "DELIVERY", "PACKING", "UNPACKING"];
  const statuses = ["ALL STATUSES", "PENDING", "IN_PROGRESS", "SCHEDULED", "COMPLETED", "CANCELLED"];
  
  const {
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
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    statusFilter,
    setStatusFilter,
    vehicleFilter,
    setVehicleFilter,
    jobTypeFilter,
    setJobTypeFilter,
    filteredJobs,
    currentEntries,
    indexOfFirstEntry,
    indexOfLastEntry,
    totalPages
  } = useJobFilters(jobs);
  
  const { printRef, handlePrint } = usePrintReport(`Job Status Report - ${new Date().toLocaleDateString()}`);

  // Status counts for summary
  const statusCounts = {
    total: filteredJobs.length,
    pending: filteredJobs.filter(job => job.status === "PENDING").length,
    inProgress: filteredJobs.filter(job => job.status === "IN_PROGRESS").length,
    scheduled: filteredJobs.filter(job => job.status === "SCHEDULED").length,
    completed: filteredJobs.filter(job => job.status === "COMPLETED").length,
    cancelled: filteredJobs.filter(job => job.status === "CANCELLED").length
  };

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
          if (startDate && endDate) {
            // Apply date filter
            console.log(`Filtering from ${startDate} to ${endDate}`);
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
    <Layout title="Job Status List">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">VIEW JOB STATUS LIST</h3>
          <p className="text-sm text-blue-700">
            Record Listed: {filteredJobs.length} jobs found
            {startDate && endDate && ` (${startDate} to ${endDate})`}
          </p>
        </div>
        
        <div className="p-4">
          <StatusSummary statusCounts={statusCounts} />
          
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sectorFilter={sectorFilter}
            setSectorFilter={setSectorFilter}
            jobNumberFilter={jobNumberFilter}
            setJobNumberFilter={setJobNumberFilter}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            sectors={sectors}
            handlePrint={handlePrint}
            additionalFilters={additionalFilters}
          />
          
          <EntriesControl
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
          
          <div ref={printRef} className="overflow-x-auto">
            <PrintHeader
              title="JOB STATUS REPORT"
              date={new Date().toLocaleDateString()}
              startDate={startDate}
              endDate={endDate}
              extraInfo={
                <div className="flex justify-center gap-4 my-4">
                  <p>Total: {statusCounts.total}</p>
                  <p>Pending: {statusCounts.pending}</p>
                  <p>In Progress: {statusCounts.inProgress}</p>
                  <p>Scheduled: {statusCounts.scheduled}</p>
                  <p>Completed: {statusCounts.completed}</p>
                  <p>Cancelled: {statusCounts.cancelled}</p>
                </div>
              }
            />
            
            <JobStatusTable
              currentEntries={currentEntries}
              indexOfFirstEntry={indexOfFirstEntry}
            />
          </div>
          
          <Pagination
            indexOfFirstEntry={indexOfFirstEntry}
            indexOfLastEntry={indexOfLastEntry}
            totalItems={filteredJobs.length}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobStatusList;
