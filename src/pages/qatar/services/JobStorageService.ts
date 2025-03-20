
import { QatarJob } from "../types/jobTypes";
import { v4 as uuidv4 } from 'uuid';

// Storage key for localStorage
const STORAGE_KEY = 'qatar_jobs';
const JOB_COUNTER_KEY = 'qatar_job_counter';

// Get initial jobs by combining mock data with any stored jobs
const getInitialJobs = (): QatarJob[] => {
  try {
    // Try to get jobs from local storage
    const storedJobs = localStorage.getItem(STORAGE_KEY);
    if (storedJobs) {
      return JSON.parse(storedJobs);
    }
    return [];
  } catch (error) {
    console.error('Error loading jobs from storage:', error);
    return [];
  }
};

// Get the next available job number (5-digit format)
const getNextJobNumber = (): string => {
  try {
    const currentCounter = localStorage.getItem(JOB_COUNTER_KEY);
    // Start from 10000 to ensure 5 digits
    let counterValue = currentCounter ? parseInt(currentCounter, 10) + 1 : 10000;
    
    // Reset to 10000 if it exceeds 99999
    if (counterValue > 99999) {
      counterValue = 10000;
    }
    
    localStorage.setItem(JOB_COUNTER_KEY, counterValue.toString());
    return counterValue.toString();
  } catch (error) {
    console.error('Error generating job number:', error);
    // Fallback to random 5-digit number
    return (10000 + Math.floor(Math.random() * 89999)).toString();
  }
};

// Initialize jobs array with data from localStorage
let jobs: QatarJob[] = getInitialJobs();

export const JobStorageService = {
  // Get all jobs
  getAllJobs: (): QatarJob[] => {
    return jobs;
  },

  // Get job by ID
  getJobById: (id: string): QatarJob | undefined => {
    return jobs.find(job => job.id === id);
  },

  // Save a new job
  saveJob: (jobData: Partial<QatarJob>): QatarJob => {
    // Create a new job with generated ID and default status
    const newJob: QatarJob = {
      id: uuidv4(),
      status: 'PENDING',
      date: new Date().toLocaleDateString("en-GB"),
      // Always generate a unique job number
      jobNumber: getNextJobNumber(),
      ...jobData,
    } as QatarJob;

    // Add to jobs array
    jobs = [...jobs, newJob];
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    
    return newJob;
  },

  // Update an existing job
  updateJob: (jobId: string, jobData: Partial<QatarJob>): QatarJob | null => {
    const index = jobs.findIndex(job => job.id === jobId);
    
    if (index === -1) return null;
    
    const updatedJob = { ...jobs[index], ...jobData };
    jobs = [...jobs.slice(0, index), updatedJob, ...jobs.slice(index + 1)];
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    
    return updatedJob;
  },

  // Delete a job
  deleteJob: (jobId: string): boolean => {
    const initialLength = jobs.length;
    jobs = jobs.filter(job => job.id !== jobId);
    
    // Save to localStorage if a job was removed
    if (jobs.length < initialLength) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
      return true;
    }
    
    return false;
  },

  // Mark jobs as scheduled
  markJobsAsScheduled: (jobIds: string[]): void => {
    jobs = jobs.map(job => 
      jobIds.includes(job.id) 
        ? { ...job, status: 'SCHEDULED' } 
        : job
    );
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }
};
