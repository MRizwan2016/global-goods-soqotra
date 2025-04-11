
/**
 * Service for generating and managing job numbers
 */
export class JobNumberService {
  private static readonly JOB_NUMBER_KEY = 'jobNumberCounters';
  private static readonly DEFAULT_PREFIX = 'JOB';
  private static readonly COUNTRY_PREFIXES: Record<string, string> = {
    'Qatar': 'QAT',
    'UAE': 'UAE',
    'Bahrain': 'BHR',
    'Saudi Arabia': 'KSA',
    'Sri Lanka': 'LKA',
    // Add more country prefixes as needed
  };

  /**
   * Generates a new job number, optionally by country
   * @param country Optional country code to prefix the job number
   * @returns A unique job number
   */
  static generateJobNumber(country?: string): string {
    // Get the existing counters from localStorage or initialize
    const counters = this.getCounters();
    
    // Determine prefix based on country
    const prefix = country && this.COUNTRY_PREFIXES[country] 
      ? this.COUNTRY_PREFIXES[country] 
      : this.DEFAULT_PREFIX;
    
    // Get or initialize the counter for this prefix
    const counterKey = prefix.toLowerCase();
    const currentCount = (counters[counterKey] || 10000) + 1;
    
    // Update the counter in storage
    counters[counterKey] = currentCount;
    this.saveCounters(counters);
    
    // Generate formatted job number: prefix-XXXXX (5 digits)
    return `${prefix}-${currentCount.toString().padStart(5, '0')}`;
  }
  
  /**
   * Gets a job number by invoice number
   * @param invoiceNumber The invoice number to look up
   * @returns Associated job number or empty string if not found
   */
  static getJobNumberByInvoice(invoiceNumber: string): string {
    if (!invoiceNumber) return '';
    
    // Search in invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const matchingInvoice = invoices.find((inv: any) => inv.invoiceNumber === invoiceNumber);
    if (matchingInvoice?.jobNumber) {
      return matchingInvoice.jobNumber;
    }
    
    // If not found in invoices, try jobs
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const matchingJob = jobs.find((job: any) => job.invoiceNumber === invoiceNumber);
    return matchingJob ? matchingJob.jobNumber : '';
  }
  
  /**
   * Gets an invoice number by job number
   * @param jobNumber The job number to look up
   * @returns Associated invoice number or empty string if not found
   */
  static getInvoiceNumberByJob(jobNumber: string): string {
    if (!jobNumber) return '';
    
    // Search in jobs first
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const matchingJob = jobs.find((job: any) => job.jobNumber === jobNumber);
    if (matchingJob?.invoiceNumber) {
      return matchingJob.invoiceNumber;
    }
    
    // If not found in jobs, try invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const matchingInvoice = invoices.find((inv: any) => inv.jobNumber === jobNumber);
    return matchingInvoice ? matchingInvoice.invoiceNumber : '';
  }
  
  /**
   * Associate a job number with an invoice number
   * @param jobNumber The job number to link
   * @param invoiceNumber The invoice number to link
   */
  static linkJobToInvoice(jobNumber: string, invoiceNumber: string): void {
    if (!jobNumber || !invoiceNumber) return;
    
    // Update in jobs
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex((j: any) => j.jobNumber === jobNumber);
    if (jobIndex >= 0) {
      jobs[jobIndex].invoiceNumber = invoiceNumber;
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
    
    // Update in invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoiceIndex = invoices.findIndex((inv: any) => inv.invoiceNumber === invoiceNumber);
    if (invoiceIndex >= 0) {
      invoices[invoiceIndex].jobNumber = jobNumber;
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
  }
  
  /**
   * Get the next job number without incrementing the counter
   * @param country Optional country to generate for
   * @returns The next job number that would be generated
   */
  static peekNextJobNumber(country?: string): string {
    const counters = this.getCounters();
    const prefix = country && this.COUNTRY_PREFIXES[country] 
      ? this.COUNTRY_PREFIXES[country] 
      : this.DEFAULT_PREFIX;
      
    const counterKey = prefix.toLowerCase();
    const nextCount = (counters[counterKey] || 10000) + 1;
    
    return `${prefix}-${nextCount.toString().padStart(5, '0')}`;
  }
  
  /**
   * Helper to get the job number counters from localStorage
   */
  private static getCounters(): Record<string, number> {
    const stored = localStorage.getItem(this.JOB_NUMBER_KEY);
    if (!stored) return {};
    
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing job number counters:', e);
      return {};
    }
  }
  
  /**
   * Helper to save the job number counters to localStorage
   */
  private static saveCounters(counters: Record<string, number>): void {
    localStorage.setItem(this.JOB_NUMBER_KEY, JSON.stringify(counters));
  }
}

export default JobNumberService;
