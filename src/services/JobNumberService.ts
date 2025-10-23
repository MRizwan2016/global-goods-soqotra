
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
    'Eritrea': 'ERT',
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
   * Gets a job number by invoice number with better error handling
   * @param invoiceNumber The invoice number to look up
   * @returns Associated job number or empty string if not found
   */
  static getJobNumberByInvoice(invoiceNumber: string): string {
    if (!invoiceNumber) return '';
    
    console.log(`Looking up job number for invoice: ${invoiceNumber}`);
    
    // Search in jobs first
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const matchingJob = jobs.find((job: any) => job.invoiceNumber === invoiceNumber);
    if (matchingJob?.jobNumber) {
      console.log(`Found job number in jobs: ${matchingJob.jobNumber}`);
      return matchingJob.jobNumber;
    }
    
    // Search in invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const matchingInvoice = invoices.find((inv: any) => inv.invoiceNumber === invoiceNumber);
    if (matchingInvoice?.jobNumber) {
      console.log(`Found job number in invoices: ${matchingInvoice.jobNumber}`);
      return matchingInvoice.jobNumber;
    }
    
    console.log(`No job number found for invoice: ${invoiceNumber}`);
    return '';
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
    
    console.log(`Linking job ${jobNumber} to invoice ${invoiceNumber}`);
    
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
   * Gets a job number by mobile number with enhanced search
   * @param mobileNumber The mobile number to look up
   * @returns Associated job number or empty string if not found
   */
  static getJobNumberByMobile(mobileNumber: string): string {
    if (!mobileNumber) return '';
    
    console.log(`Looking up job number for mobile: ${mobileNumber}`);
    
    // Search in jobs first
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const matchingJob = jobs.find((job: any) => 
      job.mobileNumber === mobileNumber || 
      job.mobile === mobileNumber ||
      job.mobileNumber === `+974${mobileNumber}` ||
      job.mobile === `+974${mobileNumber}`
    );
    if (matchingJob?.jobNumber) {
      console.log(`Found job number in jobs: ${matchingJob.jobNumber}`);
      return matchingJob.jobNumber;
    }
    
    // Search in invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const matchingInvoice = invoices.find((inv: any) => 
      inv.mobileNumber === mobileNumber || 
      inv.mobile === mobileNumber ||
      inv.mobileNumber === `+974${mobileNumber}` ||
      inv.mobile === `+974${mobileNumber}`
    );
    if (matchingInvoice?.jobNumber) {
      console.log(`Found job number in invoices: ${matchingInvoice.jobNumber}`);
      return matchingInvoice.jobNumber;
    }
    
    console.log(`No job number found for mobile: ${mobileNumber}`);
    return '';
  }
  
  /**
   * Gets a mobile number by job number
   * @param jobNumber The job number to look up
   * @returns Associated mobile number or empty string if not found
   */
  static getMobileNumberByJob(jobNumber: string): string {
    if (!jobNumber) return '';
    
    // Search in jobs first
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const matchingJob = jobs.find((job: any) => job.jobNumber === jobNumber);
    if (matchingJob?.mobileNumber || matchingJob?.mobile) {
      return matchingJob.mobileNumber || matchingJob.mobile;
    }
    
    // Search in invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const matchingInvoice = invoices.find((inv: any) => inv.jobNumber === jobNumber);
    return matchingInvoice ? (matchingInvoice.mobileNumber || matchingInvoice.mobile) : '';
  }
  
  /**
   * Associate a job number with a mobile number
   * @param jobNumber The job number to link
   * @param mobileNumber The mobile number to link
   */
  static linkJobToMobile(jobNumber: string, mobileNumber: string): void {
    if (!jobNumber || !mobileNumber) return;
    
    console.log(`Linking job ${jobNumber} to mobile ${mobileNumber}`);
    
    // Update in jobs
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex((j: any) => j.jobNumber === jobNumber);
    if (jobIndex >= 0) {
      jobs[jobIndex].mobileNumber = mobileNumber;
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
    
    // Update in invoices
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoiceIndex = invoices.findIndex((inv: any) => inv.jobNumber === jobNumber);
    if (invoiceIndex >= 0) {
      invoices[invoiceIndex].mobileNumber = mobileNumber;
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
  }

  /**
   * Fix specific invoice linkage issues
   * @param invoiceNumber The invoice number to fix
   * @param expectedJobNumber The expected job number
   * @param mobileNumber The mobile number to link
   */
  static fixInvoiceLinkage(invoiceNumber: string, expectedJobNumber: string, mobileNumber: string): void {
    console.log(`Fixing linkage for invoice ${invoiceNumber}, job ${expectedJobNumber}, mobile ${mobileNumber}`);
    
    // Update invoice with job number
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoiceIndex = invoices.findIndex((inv: any) => inv.invoiceNumber === invoiceNumber);
    if (invoiceIndex >= 0) {
      invoices[invoiceIndex].jobNumber = expectedJobNumber;
      invoices[invoiceIndex].mobileNumber = mobileNumber;
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
    
    // Update job with invoice number
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex((job: any) => job.jobNumber === expectedJobNumber);
    if (jobIndex >= 0) {
      jobs[jobIndex].invoiceNumber = invoiceNumber;
      jobs[jobIndex].mobileNumber = mobileNumber;
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
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
