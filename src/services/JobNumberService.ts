
/**
 * Service for generating and managing job numbers
 */
export class JobNumberService {
  /**
   * Generates a new 5-digit job number
   */
  static generateJobNumber(): string {
    // Get the last job number from localStorage
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    
    // Find the highest job number
    let highestNum = 0;
    
    jobs.forEach((job: any) => {
      if (job.jobNumber) {
        // Extract just the numeric part if it's a string with non-numeric characters
        const numPart = parseInt(job.jobNumber.toString().replace(/\D/g, ''));
        if (!isNaN(numPart) && numPart > highestNum) {
          highestNum = numPart;
        }
      }
    });
    
    // Increment the highest number, or start at 10001 if no jobs exist
    const nextNum = highestNum > 0 ? highestNum + 1 : 10001;
    
    // Format to exactly 5 digits
    return nextNum.toString().padStart(5, '0');
  }
  
  /**
   * Gets a job number by invoice number
   */
  static getJobNumberByInvoice(invoiceNumber: string): string {
    if (!invoiceNumber) return '';
    
    // Get all jobs from localStorage
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    
    // Find a job with the matching invoice number
    const matchingJob = jobs.find((job: any) => job.invoiceNumber === invoiceNumber);
    
    return matchingJob ? matchingJob.jobNumber : '';
  }
}

export default JobNumberService;
