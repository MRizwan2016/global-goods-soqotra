import { useState, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";
import { JobStorageService } from "../services/JobStorageService";
import { filterRealJobs, getRealJobStatistics, getVehicleStatistics } from "../data/realJobData";

export const useJobManagement = () => {
  const [allJobs, setAllJobs] = useState<QatarJob[]>([]);
  const [realJobs, setRealJobs] = useState<QatarJob[]>([]);
  const [jobStats, setJobStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    scheduled: 0,
    cancelled: 0
  });
  const [vehicleStats, setVehicleStats] = useState<{ [key: string]: { pending: number; completed: number; total: number } }>({});

  // Listen for job schedule events to refresh data
  useEffect(() => {
    const handleJobsScheduled = (event: CustomEvent) => {
      const { jobIds } = event.detail;
      console.log('Jobs scheduled, refreshing data:', jobIds);
      refreshJobs();
    };

    window.addEventListener('jobsScheduled', handleJobsScheduled as EventListener);
    
    return () => {
      window.removeEventListener('jobsScheduled', handleJobsScheduled as EventListener);
    };
  }, []);

  // Function to refresh jobs from storage
  const refreshJobs = () => {
    try {
      const jobs = JobStorageService.getAllJobs();
      setAllJobs(jobs);
      
      const filteredRealJobs = filterRealJobs(jobs);
      setRealJobs(filteredRealJobs);
      
      const stats = getRealJobStatistics(jobs);
      setJobStats(stats);
      
      const vStats = getVehicleStatistics(jobs);
      setVehicleStats(vStats);
      
      console.log('Jobs refreshed:', {
        total: jobs.length,
        real: filteredRealJobs.length,
        stats,
        vehicleStats: vStats
      });
    } catch (error) {
      console.error('Error refreshing jobs:', error);
    }
  };

  // Initial load
  useEffect(() => {
    refreshJobs();
  }, []);

  // Function to move job to completed
  const completeJob = (jobId: string) => {
    try {
      JobStorageService.updateJob(jobId, {
        status: 'COMPLETED',
        completionDate: new Date().toISOString().split('T')[0]
      });
      refreshJobs();
    } catch (error) {
      console.error('Error completing job:', error);
    }
  };

  // Function to get jobs for specific status
  const getJobsByStatus = (status: string) => {
    if (status === 'ALL') {
      return realJobs;
    }
    return realJobs.filter(job => job.status === status);
  };

  // Get unscheduled jobs (for job generation page)
  const getUnscheduledJobs = () => {
    return realJobs.filter(job => 
      job.status === 'PENDING' && !job.isAssigned && !job.scheduleNumber
    );
  };

  return {
    allJobs,
    realJobs,
    jobStats,
    vehicleStats,
    refreshJobs,
    completeJob,
    getJobsByStatus,
    getUnscheduledJobs
  };
};