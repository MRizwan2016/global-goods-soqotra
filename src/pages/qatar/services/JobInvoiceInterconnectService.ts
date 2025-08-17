import { QatarJob } from "../types/jobTypes";

export class JobInvoiceInterconnectService {
  // Get job information by mobile number for invoice auto-population
  static getJobByMobile(mobileNumber: string): QatarJob | null {
    try {
      // Check both 'jobs' and 'qatarJobs' keys for comprehensive search
      const jobs1 = JSON.parse(localStorage.getItem('jobs') || '[]') as QatarJob[];
      const jobs2 = JSON.parse(localStorage.getItem('qatarJobs') || '[]') as QatarJob[];
      const allJobs = [...jobs1, ...jobs2];
      
      console.log(`Searching for mobile ${mobileNumber} in ${allJobs.length} total jobs`);
      
      // Clean mobile number for comparison
      const cleanMobile = mobileNumber.replace(/\D/g, '');
      
      // Find most recent job for this mobile number
      const matchingJobs = allJobs.filter(job => {
        const jobMobile = job.mobileNumber?.replace(/\D/g, '') || '';
        const isMatch = jobMobile === cleanMobile || jobMobile.includes(cleanMobile);
        if (isMatch) {
          console.log(`Found matching job: ${job.jobNumber} for mobile ${job.mobileNumber}`);
        }
        return isMatch;
      });
      
      console.log(`Found ${matchingJobs.length} matching jobs for mobile ${mobileNumber}`);
      
      // Return the most recent job (sorted by date descending)
      if (matchingJobs.length > 0) {
        const recentJob = matchingJobs.sort((a, b) => 
          new Date(b.date || b.collectDate || '').getTime() - new Date(a.date || a.collectDate || '').getTime()
        )[0];
        
        console.log(`Returning most recent job: ${recentJob.jobNumber} - ${recentJob.customer}`);
        return recentJob;
      }
      
      console.log(`No matching jobs found for mobile ${mobileNumber}`);
      return null;
    } catch (error) {
      console.error('Error getting job by mobile:', error);
      return null;
    }
  }

  // Update invoice with job details when mobile number matches
  static linkJobToInvoice(job: QatarJob, invoiceNumber: string): void {
    try {
      // Update invoices with job details
      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const invoiceIndex = invoices.findIndex((inv: any) => inv.invoiceNumber === invoiceNumber);
      
      if (invoiceIndex !== -1) {
        invoices[invoiceIndex] = {
          ...invoices[invoiceIndex],
          jobNumber: job.jobNumber,
          shipperName: job.customer,
          mobileNumber: job.mobileNumber,
          city: job.city,
          destination: job.destination,
          linkedJobId: job.id
        };
        
        localStorage.setItem('invoices', JSON.stringify(invoices));
        console.log('Invoice linked with job details:', invoices[invoiceIndex]);
      }

      // Also update the job with invoice number
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]') as QatarJob[];
      const jobIndex = jobs.findIndex(j => j.id === job.id);
      
      if (jobIndex !== -1) {
        jobs[jobIndex].invoiceNumber = invoiceNumber;
        localStorage.setItem('jobs', JSON.stringify(jobs));
      }
    } catch (error) {
      console.error('Error linking job to invoice:', error);
    }
  }

  // Get all jobs for a specific destination
  static getJobsByDestination(destination: string): QatarJob[] {
    try {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]') as QatarJob[];
      return jobs.filter(job => job.destination === destination);
    } catch (error) {
      console.error('Error getting jobs by destination:', error);
      return [];
    }
  }

  // Auto-populate invoice shipper details based on mobile number
  static getShipperDetailsByMobile(mobileNumber: string): {
    jobNumber?: string;
    shipperName?: string;
    city?: string;
    destination?: string;
  } | null {
    const job = this.getJobByMobile(mobileNumber);
    
    if (job) {
      return {
        jobNumber: job.jobNumber,
        shipperName: job.customer,
        city: job.city,
        destination: job.destination
      };
    }
    
    return null;
  }
}