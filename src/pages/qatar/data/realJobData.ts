import { QatarJob } from "../types/jobTypes";

// Real job data excluding dummy entries
export const realJobs: QatarJob[] = [
  // This array will contain only real jobs, fetched from the database
  // or real user-generated jobs, excluding all dummy/test data
];

// Function to filter out dummy data
export const filterRealJobs = (jobs: QatarJob[]): QatarJob[] => {
  return jobs.filter(job => {
    // Filter out jobs with dummy indicators
    const isDummy = job.jobNumber.includes('TEST') ||
                   job.jobNumber.includes('DUMMY') ||
                   job.customer.includes('TEST') ||
                   job.customer.includes('DUMMY') ||
                   job.customer.includes('Mock') ||
                   job.mobileNumber.includes('555-');
    
    return !isDummy;
  });
};

// Function to get vehicle statistics from real jobs
export const getVehicleStatistics = (jobs: QatarJob[]) => {
  const realJobsOnly = filterRealJobs(jobs);
  const vehicleStats: { [key: string]: { pending: number; completed: number; total: number } } = {};
  
  // Get last 10 dates
  const today = new Date();
  const last10Days = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });
  
  realJobsOnly.forEach(job => {
    if (last10Days.includes(job.date) && job.vehicle) {
      if (!vehicleStats[job.vehicle]) {
        vehicleStats[job.vehicle] = { pending: 0, completed: 0, total: 0 };
      }
      
      vehicleStats[job.vehicle].total++;
      
      if (job.status === 'COMPLETED') {
        vehicleStats[job.vehicle].completed++;
      } else if (job.status === 'PENDING' || job.status === 'IN_PROGRESS' || job.status === 'SCHEDULED') {
        vehicleStats[job.vehicle].pending++;
      }
    }
  });
  
  return vehicleStats;
};

// Function to get job statistics excluding dummy data
export const getRealJobStatistics = (jobs: QatarJob[]) => {
  const realJobsOnly = filterRealJobs(jobs);
  
  const stats = {
    total: realJobsOnly.length,
    completed: realJobsOnly.filter(job => job.status === 'COMPLETED').length,
    inProgress: realJobsOnly.filter(job => job.status === 'IN_PROGRESS').length,
    pending: realJobsOnly.filter(job => job.status === 'PENDING').length,
    scheduled: realJobsOnly.filter(job => job.status === 'SCHEDULED').length,
    cancelled: realJobsOnly.filter(job => job.status === 'CANCELLED').length
  };
  
  return stats;
};