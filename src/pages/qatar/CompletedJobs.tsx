
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { JobStorageService } from "./services/JobStorageService";
import { usePrintReport } from "./hooks/usePrintReport";
import { useJobFilters } from "./hooks/useJobFilters";
import FilterBar from "./components/shared/FilterBar";
import EntriesControl from "./components/shared/EntriesControl";
import PrintHeader from "./components/shared/PrintHeader";
import Pagination from "./components/shared/Pagination";
import CompletedJobsTable from "./components/completed-jobs/CompletedJobsTable";

const CompletedJobs = () => {
  const [jobs] = useState(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => job.status === "COMPLETED");
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
    filteredJobs,
    currentEntries,
    indexOfFirstEntry,
    indexOfLastEntry,
    totalPages
  } = useJobFilters(jobs, "COMPLETED");
  
  const { printRef, handlePrint } = usePrintReport(`Completed Jobs Report - ${new Date().toLocaleDateString()}`);

  return (
    <Layout title="Completed Jobs">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-green-50 p-4 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">VIEW COMPLETED JOB LIST</h3>
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
          />
          
          <EntriesControl
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
          
          <div ref={printRef} className="overflow-x-auto">
            <PrintHeader
              title="COMPLETED JOBS REPORT"
              date={new Date().toLocaleDateString()}
              startDate={startDate}
              endDate={endDate}
            />
            
            <CompletedJobsTable
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

export default CompletedJobs;
