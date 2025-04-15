
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { JobStorageService } from "./services/JobStorageService";
import { usePrintReport } from "./hooks/usePrintReport";
import { useJobFilters } from "./hooks/useJobFilters";
import FilterBar from "./components/shared/FilterBar";
import EntriesControl from "./components/shared/EntriesControl";
import PrintHeader from "./components/shared/PrintHeader";
import Pagination from "./components/shared/Pagination";
import IncompleteJobsTable from "./components/incomplete-jobs/IncompleteJobsTable";

const IncompleteJobs = () => {
  const [jobs, setJobs] = useState(() => {
    const allJobs = JobStorageService.getAllJobs();
    // Filter for jobs that are not completed or cancelled
    return allJobs.filter(job => 
      job.status !== "COMPLETED" && job.status !== "CANCELLED"
    );
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  
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

  const { printRef, handlePrint } = usePrintReport(`Incomplete Jobs Report - ${new Date().toLocaleDateString()}`);

  const refreshJobs = () => {
    const allJobs = JobStorageService.getAllJobs();
    setJobs(allJobs.filter(job => 
      job.status !== "COMPLETED" && job.status !== "CANCELLED"
    ));
  };

  return (
    <Layout title="Incomplete Jobs">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-green-50 p-4 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">VIEW INCOMPLETE JOB LIST</h3>
          <p className="text-sm text-green-700">Record Listed.</p>
        </div>
        
        <div className="p-4">
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
            vehicleFilter={vehicleFilter}
            setVehicleFilter={setVehicleFilter}
            jobTypeFilter={jobTypeFilter}
            setJobTypeFilter={setJobTypeFilter}
          />
          
          <EntriesControl
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
          
          <div ref={printRef} className="overflow-x-auto">
            <PrintHeader
              title="INCOMPLETE JOBS REPORT"
              date={new Date().toLocaleDateString()}
              startDate={startDate}
              endDate={endDate}
            />
            
            <IncompleteJobsTable
              currentEntries={currentEntries}
              indexOfFirstEntry={indexOfFirstEntry}
              refreshJobs={refreshJobs}
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

export default IncompleteJobs;
