
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
      
      // Date filter
      if (filterDate) {
        const jobDate = new Date(job.date);
        const filterDateObj = new Date(filterDate);
        
        if (
          jobDate.getDate() !== filterDateObj.getDate() ||
          jobDate.getMonth() !== filterDateObj.getMonth() ||
          jobDate.getFullYear() !== filterDateObj.getFullYear()
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
