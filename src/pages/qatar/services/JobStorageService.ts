
/**
 * Service to handle job storage operations
 */
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
      
      // Ensure job number is 5 digits
      if (!jobData.jobNumber || jobData.jobNumber.length !== 5) {
        const nextJobNumber = this.generateNextJobNumber();
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
   * Generate a 5-digit job number
   */
  private static generateNextJobNumber(): string {
    const jobs = this.getAllJobs();
    
    // Find the highest job number
    let highestNumber = 10000; // Start at 10000 so first job will be 10001
    
    jobs.forEach((job: any) => {
      if (job.jobNumber) {
        const jobNum = parseInt(job.jobNumber);
        if (!isNaN(jobNum) && jobNum > highestNumber) {
          highestNumber = jobNum;
        }
      }
    });
    
    // Generate next job number
    const nextNumber = highestNumber + 1;
    
    // Format as 5-digit string with leading zeros if needed
    return nextNumber.toString().padStart(5, '0');
  }
}

export default JobStorageService;
