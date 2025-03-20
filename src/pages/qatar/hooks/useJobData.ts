
import { useState, useEffect } from 'react';
import { QatarJob } from '../types/jobTypes';
import { JobStorageService } from '../services/JobStorageService';
import { mockJobs } from '../data/mockJobData';

export const useJobData = () => {
  const [jobs, setJobs] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get jobs from storage service
    const storedJobs = JobStorageService.getAllJobs();
    
    // If there are no stored jobs yet, initialize with mock data once
    if (storedJobs.length === 0) {
      // Initialize with mock data once
      mockJobs.forEach(job => JobStorageService.saveJob(job));
      setJobs(JobStorageService.getAllJobs());
    } else {
      setJobs(storedJobs);
    }
    
    setIsLoading(false);
  }, []);

  const refreshJobs = () => {
    setJobs(JobStorageService.getAllJobs());
  };

  return {
    jobs,
    isLoading,
    refreshJobs
  };
};
