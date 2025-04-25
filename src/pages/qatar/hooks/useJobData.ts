
import { useState, useEffect } from 'react';
import { QatarJob } from '../types/jobTypes';
import { JobStorageService } from '../services/JobStorageService';
import { mockJobs } from '../data/mockJobData';

export const useJobData = () => {
  const [jobs, setJobs] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset and initialize jobs with today's data
    const initializeJobs = () => {
      try {
        // First clear all existing jobs and initialize with today's jobs
        const initializedJobs = JobStorageService.resetAndInitializeJobs();
        setJobs(initializedJobs);
        console.log('Jobs initialized with today\'s data', initializedJobs.length);
      } catch (error) {
        console.error('Error initializing jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeJobs();
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
