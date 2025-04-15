
import React from "react";
import Layout from "@/components/layout/Layout";
import { usePrintReport } from "../../hooks/usePrintReport";
import { useJobFilters } from "../../hooks/useJobFilters";
import FilterBar from "../shared/FilterBar";
import EntriesControl from "../shared/EntriesControl";
import PrintHeader from "../shared/PrintHeader";
import Pagination from "../shared/Pagination";
import { QatarJob } from "../../types/jobTypes";

interface JobListPageProps {
  title: string;
  headerTitle: string;
  headerSubtitle: string;
  headerClassName: string;
  reportTitle: string;
  jobs: QatarJob[];
  sectors: string[];
  initialStatus?: string;
  renderTable: (props: {
    currentEntries: QatarJob[];
    indexOfFirstEntry: number;
    refreshJobs?: () => void;
  }) => React.ReactNode;
  extraFilters?: React.ReactNode;
  refreshJobs?: () => void;
  showVehicleFilter?: boolean;
  showJobTypeFilter?: boolean;
}

const JobListPage: React.FC<JobListPageProps> = ({
  title,
  headerTitle,
  headerSubtitle,
  headerClassName,
  reportTitle,
  jobs,
  sectors,
  initialStatus,
  renderTable,
  extraFilters,
  refreshJobs,
  showVehicleFilter = false,
  showJobTypeFilter = false,
}) => {
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
  } = useJobFilters(jobs, initialStatus);
  
  const { printRef, handlePrint } = usePrintReport(`${reportTitle} - ${new Date().toLocaleDateString()}`);

  return (
    <Layout title={title}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className={`${headerClassName} p-4 border-b`}>
          <h3 className="text-lg font-medium">{headerTitle}</h3>
          <p className="text-sm">{headerSubtitle}</p>
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
            vehicleFilter={showVehicleFilter ? vehicleFilter : undefined}
            setVehicleFilter={showVehicleFilter ? setVehicleFilter : undefined}
            jobTypeFilter={showJobTypeFilter ? jobTypeFilter : undefined}
            setJobTypeFilter={showJobTypeFilter ? setJobTypeFilter : undefined}
            additionalFilters={extraFilters}
          />
          
          <EntriesControl
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
          
          <div ref={printRef} className="overflow-x-auto">
            <PrintHeader
              title={reportTitle}
              date={new Date().toLocaleDateString()}
              startDate={startDate}
              endDate={endDate}
            />
            
            {renderTable({
              currentEntries,
              indexOfFirstEntry,
              refreshJobs
            })}
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

export default JobListPage;
