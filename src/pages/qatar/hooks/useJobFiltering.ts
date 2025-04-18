
import { useState, useMemo } from "react";
import { QatarJob } from "../types/jobTypes";

export const useJobFiltering = (jobs: QatarJob[]) => {
  const [statusFilter, setStatusFilter] = useState("ALL"); // Changed from "PENDING" to "ALL" to show all jobs initially
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    // Add more detailed logging
    console.log('Filtering jobs with the following criteria:');
    console.log('- Status filter:', statusFilter);
    console.log('- Date filter:', filterDate);
    console.log('- Sort by:', sortBy);
    
    return jobs.filter(job => {
      // Status filter - only apply if not "ALL" or "all"
      if (statusFilter && statusFilter !== "all" && statusFilter !== "ALL" && job.status !== statusFilter) {
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

  // Enhanced debugging
  console.log('Total jobs:', jobs.length);
  console.log('Pending jobs:', jobs.filter(job => job.status === 'PENDING').length);
  console.log('Selected date:', filterDate);
  console.log('Status filter:', statusFilter);
  console.log('Filtered jobs:', filteredJobs.length);
  
  // Log each pending job for debugging
  const pendingJobs = jobs.filter(job => job.status === 'PENDING');
  console.log('Pending jobs details:', pendingJobs.map(job => ({
    id: job.id,
    jobNumber: job.jobNumber,
    date: job.date,
    isAssigned: job.isAssigned
  })));

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
