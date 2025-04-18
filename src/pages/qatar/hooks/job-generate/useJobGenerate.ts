
import { useState, useEffect } from 'react';
import { QatarJob } from '../../types/jobTypes';
import { JobStorageService } from '../../services/JobStorageService';
import { mockJobs } from '../../data/mockJobData';
import { toast } from 'sonner';

export const useJobGenerate = () => {
  const [jobsData, setJobsData] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load all jobs
    let allJobs = JobStorageService.getAllJobs();
    console.log("Initial job load:", allJobs.length);
    
    // If no jobs exist, initialize with mock data
    if (allJobs.length === 0) {
      console.log("No jobs found in storage, initializing with mock data");
      mockJobs.forEach(job => {
        // Ensure we have PENDING jobs for schedule generation
        const jobToSave = { ...job };
        if (Math.random() > 0.5) {
          jobToSave.status = 'PENDING';
          jobToSave.isAssigned = false;
        }
        JobStorageService.saveJob(jobToSave);
      });
      allJobs = JobStorageService.getAllJobs();
      toast.success("Sample jobs loaded successfully");
    }
    
    // Make sure we have at least a few pending jobs for scheduling
    const pendingJobs = allJobs.filter(job => job.status === 'PENDING' && !job.isAssigned);
    if (pendingJobs.length === 0) {
      console.log("No pending jobs found, converting some to pending");
      // Convert at least 3 jobs to pending status
      const jobsToConvert = allJobs.slice(0, 3);
      jobsToConvert.forEach(job => {
        JobStorageService.updateJob(job.id, { 
          status: 'PENDING', 
          isAssigned: false 
        });
      });
      
      // Reload all jobs after modifications
      allJobs = JobStorageService.getAllJobs();
      toast.success("Added pending jobs for scheduling");
    }
    
    console.log("Loaded jobs:", allJobs.length);
    console.log("Pending jobs:", allJobs.filter(job => job.status === 'PENDING' && !job.isAssigned).length);
    setJobsData(allJobs);
    setIsLoading(false);
  }, []);

  return {
    jobsData,
    isLoading,
    pendingJobs: jobsData.filter(job => job.status === 'PENDING' && !job.isAssigned)
  };
};
