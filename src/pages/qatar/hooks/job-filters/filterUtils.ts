
import { QatarJob } from "../../types/jobTypes";

export const filterJobs = (
  jobs: QatarJob[],
  statusFilter: string,
  filterDate: string,
  sortBy: string
) => {
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
    }
    return 0;
  });
};
