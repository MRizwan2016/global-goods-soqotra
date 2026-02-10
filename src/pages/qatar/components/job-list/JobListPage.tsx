
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useJobTracking } from "../../hooks/useJobTracking";
import JobListHeader from "./components/JobListHeader";
import JobListFilters from "./components/JobListFilters";
import ViewJobModal from "./components/ViewJobModal";
import { useJobDialogs } from "./hooks/useJobDialogs";
import { useJobPrint } from "./hooks/useJobPrint";
import TablePagination from "../../components/job-tracking/TablePagination";

interface JobListPageProps {
  title?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  headerClassName?: string;
  reportTitle?: string;
  jobs?: any[];
  sectors?: string[];
  initialStatus?: string;
  showVehicleFilter?: boolean;
  showJobTypeFilter?: boolean;
  extraFilters?: React.ReactNode;
  renderTable: (props: { currentEntries: any[]; indexOfFirstEntry: number }) => React.ReactNode;
  refreshJobs?: () => void;
}

const JobListPage: React.FC<JobListPageProps> = ({
  title = "Job List",
  reportTitle = "JOB REPORT",
  jobs = [],
  initialStatus = "all",
  renderTable,
  refreshJobs
}) => {
  const {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredJobs,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries
  } = useJobTracking();

  const {
    jobToDelete,
    showCancellationDialog,
    cancellationReason,
    selectedJob,
    isViewModalOpen,
    handleDeleteConfirmation,
    handleCancelDelete,
    handleCancellationConfirmation,
    handleCloseCancellationDialog,
    handleViewJob,
    handleCloseViewModal
  } = useJobDialogs(refreshJobs);

  const { printRef, handlePrintButtonClick } = useJobPrint(reportTitle);

  return (
    <div className="container mx-auto py-6">
      <JobListHeader title={title} />
      
      <JobListFilters
        searchText={searchText}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onSearchChange={(e) => setSearchText(e.target.value)}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
      />

      <div className="overflow-x-auto" ref={printRef}>
        {renderTable({ currentEntries, indexOfFirstEntry })}
      </div>

      <TablePagination
        indexOfFirstEntry={indexOfFirstEntry}
        indexOfLastEntry={indexOfLastEntry}
        totalItems={filteredJobs.length}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex justify-end mt-4">
        <Button 
           onClick={handlePrintButtonClick} 
          className="bg-[#3b5998] hover:bg-[#1e2a3a] text-white"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Job List
        </Button>
      </div>

      {selectedJob && (
        <ViewJobModal
          isOpen={isViewModalOpen}
          job={selectedJob}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
};

export default JobListPage;
