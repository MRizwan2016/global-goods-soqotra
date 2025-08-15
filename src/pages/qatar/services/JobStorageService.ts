/**
 * Service to handle job storage operations
 */
import { JobNumberService } from '@/services/JobNumberService';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export class JobStorageService {
  private static STORAGE_KEY = 'jobs';

  /**
   * Get all jobs from storage
   */
  static getAllJobs() {
    try {
      const jobs = localStorage.getItem(this.STORAGE_KEY);
      const parsedJobs = jobs ? JSON.parse(jobs) : [];
      
      // Auto-cleanup dummy data on first access
      if (parsedJobs.length > 0) {
        this.cleanupDummyData();
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      }
      
      return parsedJobs;
    } catch (error) {
      console.error('Error retrieving jobs:', error);
      return [];
    }
  }

  /**
   * Get a job by ID
   */
  static getJobById(id: string) {
    const jobs = this.getAllJobs();
    return jobs.find((job: any) => job.id === id) || null;
  }

  /**
   * Get a job number by invoice number
   */
  static getJobNumberByInvoiceNumber(invoiceNumber: string) {
    const jobs = this.getAllJobs();
    const job = jobs.find((job: any) => job.invoiceNumber === invoiceNumber);
    return job ? job.jobNumber : '';
  }

  /**
   * Save a new job
   */
  static saveJob(jobData: any) {
    try {
      if (!jobData) {
        throw new Error('No job data provided');
      }

      console.log("Starting to save job with data:", jobData);
      
      const jobs = this.getAllJobs();
      
      // Generate job number if not provided
      if (!jobData.jobNumber) {
        const nextJobNumber = JobNumberService.generateJobNumber(jobData.country);
        jobData.jobNumber = nextJobNumber;
        console.log("Generated job number:", nextJobNumber);
      }
      
      // Add an ID if it doesn't exist
      if (!jobData.id) {
        jobData.id = uuidv4();
        console.log("Generated new job ID:", jobData.id);
      }
      
      // Add timestamp if missing
      if (!jobData.timestamp) {
        jobData.timestamp = new Date().toISOString();
      }
      
      // Make a copy of the job data before modifying
      const jobToSave = { ...jobData };
      
      // Ensure items are properly structured
      if (Array.isArray(jobToSave.items)) {
        jobToSave.items = jobToSave.items.map((item: any) => ({
          ...item,
          id: item.id || uuidv4(),
          jobId: jobToSave.id
        }));
      } else {
        jobToSave.items = [];
      }

      // Ensure required fields are set
      if (!jobToSave.status) {
        jobToSave.status = 'PENDING';
      }
      
      if (!jobToSave.jobType) {
        jobToSave.jobType = jobToSave.jobType || 'COLLECTION';
      }

      console.log("Checking if job exists with ID:", jobToSave.id);
      // Check if a job with this ID already exists
      const existingJobIndex = jobs.findIndex((job: any) => job.id === jobToSave.id);
      
      if (existingJobIndex >= 0) {
        console.log("Updating existing job at index:", existingJobIndex);
        // Update existing job
        jobs[existingJobIndex] = {
          ...jobs[existingJobIndex],
          ...jobToSave,
          lastUpdated: new Date().toISOString()
        };
      } else {
        console.log("Adding new job to jobs array");
        // Add new job
        jobs.push(jobToSave);
      }
      
      console.log("Saving jobs to localStorage, count:", jobs.length);
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
      
      // Update invoices with the job number if there's an invoice number
      if (jobToSave.invoiceNumber) {
        this.updateInvoiceWithJobNumber(jobToSave.invoiceNumber, jobToSave.jobNumber);
      }
      
      return jobToSave;
    } catch (error) {
      console.error('Error saving job:', error);
      throw new Error(`Failed to save job: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Update an existing job
   */
  static updateJob(id: string, updatedJobData: any) {
    try {
      const jobs = this.getAllJobs();
      const jobIndex = jobs.findIndex((job: any) => job.id === id);
      
      if (jobIndex === -1) {
        throw new Error(`Job with ID ${id} not found`);
      }
      
      // Update the job
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        ...updatedJobData,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
      
      // Update invoices with the job number if there's an invoice number
      if (updatedJobData.invoiceNumber) {
        this.updateInvoiceWithJobNumber(updatedJobData.invoiceNumber, updatedJobData.jobNumber);
      }
      
      return jobs[jobIndex];
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error('Failed to update job');
    }
  }

  /**
   * Delete a job
   */
  static deleteJob(id: string) {
    try {
      const jobs = this.getAllJobs();
      const updatedJobs = jobs.filter((job: any) => job.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedJobs));
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      return false;
    }
  }

  /**
   * Mark jobs as scheduled
   */
  static markJobsAsScheduled(jobIds: string[]) {
    try {
      const jobs = this.getAllJobs();
      let updated = false;

      // Update status for each job ID
      jobIds.forEach(id => {
        const jobIndex = jobs.findIndex((job: any) => job.id === id);
        if (jobIndex !== -1) {
          jobs[jobIndex].status = 'SCHEDULED';
          jobs[jobIndex].lastUpdated = new Date().toISOString();
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
      }
      
      return true;
    } catch (error) {
      console.error('Error marking jobs as scheduled:', error);
      return false;
    }
  }

  /**
   * Complete a job - marks status as COMPLETED and adds completion details
   */
  static completeJob(id: string, completionDetails?: { notes?: string, date?: string }) {
    try {
      const jobs = this.getAllJobs();
      const jobIndex = jobs.findIndex((job: any) => job.id === id);
      
      if (jobIndex === -1) {
        throw new Error(`Job with ID ${id} not found`);
      }
      
      const completionDate = completionDetails?.date || new Date().toISOString();
      const completionNotes = completionDetails?.notes || "Job completed successfully";
      
      // Update the job status and add completion details
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        status: 'COMPLETED',
        completionDate,
        completionNotes,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
      
      return jobs[jobIndex];
    } catch (error) {
      console.error('Error completing job:', error);
      throw new Error('Failed to complete job');
    }
  }

  /**
   * Clear all jobs and sample data
   */
  static clearAllJobs() {
    try {
      // Clear all jobs - start with empty array
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
      console.log("All jobs cleared from localStorage");
      return [];
    } catch (error) {
      console.error('Error clearing jobs:', error);
      throw new Error('Failed to clear jobs');
    }
  }

  /**
   * Clean up dummy data automatically
   */
  private static cleanupDummyData() {
    try {
      // Always return empty array to prevent dummy data loading
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
      console.log('Dummy data cleanup completed - storage cleared');
    } catch (error) {
      console.error('Error cleaning up dummy data:', error);
    }
  }

  /**
   * Update an invoice with a job number
   */
  private static updateInvoiceWithJobNumber(invoiceNumber: string, jobNumber: string) {
    try {
      // Get stored invoices
      const storedInvoices = localStorage.getItem('invoices');
      
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        
        // Find the invoice with the matching invoice number
        const invoiceIndex = invoices.findIndex((invoice: any) => 
          invoice.invoiceNumber === invoiceNumber
        );
        
        if (invoiceIndex !== -1) {
          // Update the invoice with the job number
          invoices[invoiceIndex].jobNumber = jobNumber;
          
          // Save back to localStorage
          localStorage.setItem('invoices', JSON.stringify(invoices));
        }
      }
    } catch (error) {
      console.error('Error updating invoice with job number:', error);
    }
  }

  /**
   * Generate a job number using JobNumberService based on country
   */
  private static generateJobNumber(country?: string): string {
    return JobNumberService.generateJobNumber(country);
  }
}

export default JobStorageService;
