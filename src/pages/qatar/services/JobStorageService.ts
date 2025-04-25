
/**
 * Service to handle job storage operations
 */
import { JobNumberService } from '@/services/JobNumberService';
import { format } from 'date-fns';

export class JobStorageService {
  private static STORAGE_KEY = 'jobs';

  /**
   * Get all jobs from storage
   */
  static getAllJobs() {
    try {
      const jobs = localStorage.getItem(this.STORAGE_KEY);
      return jobs ? JSON.parse(jobs) : [];
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
      const jobs = this.getAllJobs();
      
      // Generate job number if not provided
      if (!jobData.jobNumber) {
        const nextJobNumber = JobNumberService.generateJobNumber(jobData.country);
        jobData.jobNumber = nextJobNumber;
      }
      
      // Add an ID if it doesn't exist
      if (!jobData.id) {
        jobData.id = `job-${Date.now()}`;
      }
      
      // Add timestamp
      jobData.timestamp = new Date().toISOString();
      
      jobs.push(jobData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
      
      // Update invoices with the job number if there's an invoice number
      if (jobData.invoiceNumber) {
        this.updateInvoiceWithJobNumber(jobData.invoiceNumber, jobData.jobNumber);
      }
      
      return jobData;
    } catch (error) {
      console.error('Error saving job:', error);
      throw new Error('Failed to save job');
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
   * Clear all jobs and initialize with today's jobs
   */
  static resetAndInitializeJobs() {
    try {
      // Format today's date
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Create four jobs with the specified job numbers
      const newJobs = [
        {
          id: 'job-1',
          jobNumber: 'QJB-778321-6039',
          customer: 'QATAR NATIONAL BANK',
          date: today,
          time: '10:00',
          amPm: 'AM' as 'AM', // TypeScript cast to ensure it's the correct type
          location: 'QNB TOWER',
          city: 'DOHA',
          town: 'WEST BAY',
          sector: 'BANKING',
          branch: 'DOHA MAIN BRANCH',
          mobileNumber: '555-1234',
          jobType: 'DELIVERY',
          status: 'COMPLETED',
          isAssigned: true,
          vehicle: 'CAR',
          completionDate: today,
          completionNotes: 'Delivered all items successfully',
          invoiceNumber: 'INV-2025-001'
        },
        {
          id: 'job-2',
          jobNumber: '933642-6093',
          customer: 'DOHA MUNICIPALITY',
          date: today,
          time: '11:30',
          amPm: 'AM' as 'AM', // TypeScript cast
          location: 'MUNICIPALITY OFFICE',
          city: 'DOHA',
          town: 'CENTRAL DOHA',
          sector: 'GOVERNMENT',
          branch: 'MAIN BRANCH',
          mobileNumber: '555-2345',
          jobType: 'COLLECTION',
          status: 'COMPLETED',
          isAssigned: true,
          vehicle: 'VAN',
          completionDate: today,
          completionNotes: 'Collected all items as scheduled',
          invoiceNumber: 'INV-2025-002'
        },
        {
          id: 'job-3',
          jobNumber: '044344-5405',
          customer: 'HAMAD INTERNATIONAL AIRPORT',
          date: today,
          time: '14:00',
          amPm: 'PM' as 'PM', // TypeScript cast
          location: 'HIA CARGO TERMINAL',
          city: 'DOHA',
          town: 'AIRPORT AREA',
          sector: 'AVIATION',
          branch: 'CARGO DIVISION',
          mobileNumber: '555-3456',
          jobType: 'DELIVERY',
          status: 'COMPLETED',
          isAssigned: true,
          vehicle: 'TRUCK',
          completionDate: today,
          completionNotes: 'Delivery completed on time',
          invoiceNumber: 'INV-2025-003'
        },
        {
          id: 'job-4',
          jobNumber: '192033-5923',
          customer: 'SIDRA MEDICAL CENTER',
          date: today,
          time: '16:30',
          amPm: 'PM' as 'PM', // TypeScript cast
          location: 'SIDRA HOSPITAL',
          city: 'DOHA',
          town: 'EDUCATION CITY',
          sector: 'HEALTHCARE',
          branch: 'MAIN FACILITY',
          mobileNumber: '555-4567',
          jobType: 'COLLECTION',
          status: 'COMPLETED',
          isAssigned: true,
          vehicle: 'CAR',
          completionDate: today,
          completionNotes: 'Items collected and properly documented',
          invoiceNumber: 'INV-2025-004'
        }
      ];

      // Save the new jobs to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newJobs));
      
      return newJobs;
    } catch (error) {
      console.error('Error resetting jobs:', error);
      throw new Error('Failed to reset and initialize jobs');
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
