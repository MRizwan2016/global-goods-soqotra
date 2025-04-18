
import { QatarJob } from "../../types/jobTypes";

export const filterJobs = (
  jobs: QatarJob[],
  statusFilter: string,
  filterDate: string,
  sortBy: string
): QatarJob[] => {
  // Filter by status if not "ALL"
  let filteredJobs = statusFilter === "ALL" 
    ? [...jobs]
    : jobs.filter(job => job.status === statusFilter);
  
  // Filter by date if specified
  if (filterDate) {
    filteredJobs = filteredJobs.filter(job => job.date === filterDate);
  }
  
  // Sort the filtered jobs based on the sortBy parameter
  switch (sortBy) {
    case "oldest":
      filteredJobs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case "newest":
      filteredJobs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case "amountAsc":
      filteredJobs.sort((a, b) => (a.advanceAmount || 0) - (b.advanceAmount || 0));
      break;
    case "amountDesc":
      filteredJobs.sort((a, b) => (b.advanceAmount || 0) - (a.advanceAmount || 0));
      break;
    default:
      // Default sort by sequence number if available
      filteredJobs.sort((a, b) => 
        (a.sequenceNum || 0) - (b.sequenceNum || 0)
      );
  }

  return filteredJobs;
};
