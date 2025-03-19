
import Layout from "@/components/layout/Layout";
import { useJobTracking } from "./components/job-tracking/useJobTracking";
import JobTrackingHeader from "./components/job-tracking/JobTrackingHeader";
import JobFilters from "./components/job-tracking/JobFilters";
import JobTable from "./components/job-tracking/JobTable";
import TablePagination from "./components/job-tracking/TablePagination";

const JobTracking = () => {
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

  return (
    <Layout title="Qatar Job Tracking">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <JobTrackingHeader />
        
        <div className="p-4 flex flex-col gap-4">
          {/* Filters */}
          <JobFilters 
            searchText={searchText}
            setSearchText={setSearchText}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          
          {/* Job Table */}
          <JobTable currentEntries={currentEntries} />
          
          {/* Pagination */}
          <TablePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstEntry={indexOfFirstEntry}
            indexOfLastEntry={indexOfLastEntry}
            totalItems={filteredJobs.length}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobTracking;
