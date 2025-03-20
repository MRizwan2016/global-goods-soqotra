
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

  // Calculate job statistics
  const getJobStatistics = () => {
    return {
      total: jobs.length,
      completed: jobs.filter(job => job.status === 'COMPLETED').length,
      inProgress: jobs.filter(job => job.status === 'IN_PROGRESS').length,
      pending: jobs.filter(job => job.status === 'PENDING').length,
      scheduled: jobs.filter(job => job.status === 'SCHEDULED').length
    };
  };

  // Get recent jobs (last 10)
  const getRecentJobs = () => {
    return [...jobs]
      .sort((a, b) => (b.id || '').localeCompare(a.id || ''))
      .slice(0, 10);
  };

  // Get pending jobs
  const getPendingJobs = () => {
    return jobs.filter(job => job.status === 'PENDING');
  };

  return {
    jobs,
    isLoading,
    refreshJobs,
    getJobStatistics,
    getRecentJobs,
    getPendingJobs
  };
};
