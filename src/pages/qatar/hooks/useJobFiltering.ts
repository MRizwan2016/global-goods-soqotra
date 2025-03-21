
import { useState, useMemo } from "react";
import { QatarJob } from "../types/jobTypes";

export const useJobFiltering = (jobs: QatarJob[]) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Status filter
      if (statusFilter !== "all" && job.status !== statusFilter) {
        return false;
      }
      
      // Date filter - only if filterDate is provided
      if (filterDate) {
        const jobDate = new Date(job.date);
        const filterDateObj = new Date(filterDate);
        
        // Check if the dates match by comparing year, month, and day
        // This is more reliable than comparing full date strings
        if (
          jobDate.getFullYear() !== filterDateObj.getFullYear() ||
          jobDate.getMonth() !== filterDateObj.getMonth() ||
          jobDate.getDate() !== filterDateObj.getDate()
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
  }, [jobs, statusFilter, sortBy, filterDate]);

  // Debug the filtering process
  console.log('Total jobs:', jobs.length);
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
