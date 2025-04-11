
import { QatarJob } from "../types/jobTypes";
import { v4 as uuidv4 } from 'uuid';
import { JobNumberService } from "@/services/JobNumberService";

// Storage key for localStorage
const STORAGE_KEY = 'qatar_jobs';

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

  // Get job by job number
  getJobByNumber: (jobNumber: string): QatarJob | undefined => {
    return jobs.find(job => job.jobNumber === jobNumber);
  },

  // Save a new job
  saveJob: (jobData: Partial<QatarJob>): QatarJob => {
    // Ensure job has a job number
    if (!jobData.jobNumber) {
      jobData.jobNumber = JobNumberService.generateJobNumber();
    }
    
    // Create a new job with generated ID and default status
    const newJob: QatarJob = {
      id: uuidv4(),
      status: 'PENDING',
      date: new Date().toLocaleDateString("en-GB"),
      ...jobData,
      // Ensure advanceAmount is a number
      advanceAmount: parseFloat(jobData.advanceAmount as unknown as string) || 0,
      entryBy: "System User",
      entryDate: new Date().toISOString()
    } as QatarJob;

    // Add to jobs array
    jobs = [...jobs, newJob];
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    
    // Make sure job number is registered as used
    if (newJob.jobNumber) {
      JobNumberService.addUsedJobNumber(newJob.jobNumber);
    }
    
    // Sync with invoice data if invoiceNumber is provided
    if (newJob.invoiceNumber) {
      try {
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const matchingInvoice = invoices.find((inv: any) => inv.invoiceNumber === newJob.invoiceNumber);
        if (matchingInvoice) {
          matchingInvoice.jobNumber = newJob.jobNumber;
          localStorage.setItem('invoices', JSON.stringify(invoices));
        }
      } catch (error) {
        console.error('Error syncing job number with invoice:', error);
      }
    }
    
    return newJob;
  },

  // Update an existing job
  updateJob: (jobId: string, jobData: Partial<QatarJob>): QatarJob | null => {
    const index = jobs.findIndex(job => job.id === jobId);
    
    if (index === -1) return null;
    
    const updatedJob = { 
      ...jobs[index], 
      ...jobData,
      // Ensure advanceAmount is a number
      advanceAmount: parseFloat(jobData.advanceAmount as unknown as string) || jobs[index].advanceAmount || 0
    };
    
    jobs = [...jobs.slice(0, index), updatedJob, ...jobs.slice(index + 1)];
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    
    // Sync with invoice data if invoiceNumber is provided
    if (updatedJob.invoiceNumber) {
      try {
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const matchingInvoice = invoices.find((inv: any) => inv.invoiceNumber === updatedJob.invoiceNumber);
        if (matchingInvoice) {
          matchingInvoice.jobNumber = updatedJob.jobNumber;
          localStorage.setItem('invoices', JSON.stringify(invoices));
        }
      } catch (error) {
        console.error('Error syncing job number with invoice:', error);
      }
    }
    
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
