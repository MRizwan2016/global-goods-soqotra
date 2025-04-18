
import { useMemo } from "react";
import { QatarJob } from "../types/jobTypes";
import { useStatusFilter } from "./job-filters/useStatusFilter";
import { useDateFilter } from "./job-filters/useDateFilter";
import { useSortFilter } from "./job-filters/useSortFilter";
import { filterJobs } from "./job-filters/filterUtils";

export const useJobFiltering = (jobs: QatarJob[]) => {
  const { statusFilter, setStatusFilter } = useStatusFilter();
  const { filterDate, setFilterDate } = useDateFilter();
  const { sortBy, setSortBy } = useSortFilter();
  
  // Filtered and sorted jobs using memoization
  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, statusFilter, filterDate, sortBy);
  }, [jobs, statusFilter, filterDate, sortBy]);

  // Enhanced debugging
  console.log('Total jobs:', jobs.length);
  console.log('Pending jobs:', jobs.filter(job => job.status === 'PENDING').length);
  console.log('Selected date:', filterDate);
  console.log('Status filter:', statusFilter);
  console.log('Filtered jobs:', filteredJobs.length);
  
  return {
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filterDate,
    setFilterDate,
    filteredJobs
  };
};
