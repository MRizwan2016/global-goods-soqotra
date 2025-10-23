
import { useState, useEffect } from 'react';
import { QatarJob } from '../types/jobTypes';
import { JobStorageService } from '../services/JobStorageService';
import { mockJobs } from '../data/mockJobData';

export const useJobData = () => {
  const [jobs, setJobs] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load jobs from storage or use mock data as fallback
    const loadJobs = () => {
      try {
        const storedJobs = JobStorageService.getAllJobs();
        if (storedJobs.length === 0) {
          // Use mock data as initial data if no jobs exist
          setJobs(mockJobs);
          console.log('Loaded mock jobs for initial data');
        } else {
          setJobs(storedJobs as QatarJob[]);
          console.log('Loaded jobs from storage', storedJobs.length);
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
        // Fallback to mock data
        setJobs(mockJobs);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
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
