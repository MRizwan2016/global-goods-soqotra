
import { JobNumberService } from "@/services/JobNumberService";
import { toast } from "sonner";

/**
 * Utility to fix invoice linkage issues
 */
export const fixInvoiceLinkage = () => {
  console.log("Fixing invoice linkage issues...");
  
  // Fix Invoice 010000 with Job Number QJB-050269-9166 and Mobile 31016616
  JobNumberService.fixInvoiceLinkage("010000", "QJB-050269-9166", "31016616");
  
  // Fix Invoice 010009 if it exists
  const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const invoice010009 = invoices.find((inv: any) => inv.invoiceNumber === "010009");
  if (invoice010009) {
    // Create a proper job number for invoice 010009
    const jobNumber = "QJB-010009-" + Math.floor(1000 + Math.random() * 9000);
    JobNumberService.fixInvoiceLinkage("010009", jobNumber, "31016616");
    console.log(`Fixed Invoice 010009 with job number: ${jobNumber}`);
  }
  
  // Remove any duplicate entries
  const uniqueInvoices = invoices.filter((inv: any, index: number, self: any[]) => 
    index === self.findIndex(i => i.invoiceNumber === inv.invoiceNumber)
  );
  
  if (uniqueInvoices.length !== invoices.length) {
    localStorage.setItem('invoices', JSON.stringify(uniqueInvoices));
    console.log(`Removed ${invoices.length - uniqueInvoices.length} duplicate invoices`);
  }
  
  toast.success("Invoice linkage issues fixed successfully");
};

/**
 * Clean up dummy data and keep only real jobs
 */
export const cleanupDummyData = () => {
  console.log("Cleaning up dummy data...");
  
  // Get all jobs
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  
  // Enhanced filter to remove more dummy/test data patterns
  const dummyCustomers = [
    "QATAR NATIONAL BANK", 
    "SAMPLE CUSTOMER", 
    "TEST CUSTOMER",
    "MRS. AMIRA SIED OSMAN",
    "DUMMY",
    "SAMPLE",
    "TEST",
    "DEMO",
    "DEFAULT",
    "EXAMPLE",
    "MOCK",
    "TEMPLATE",
    "QATAR COLLECTION & DELIVERY MANAGEMENT"
  ];
  
  // More aggressive cleanup to remove any suspicious test data
  const realJobs = jobs.filter((job: any) => {
    // Skip jobs with missing essential data
    if (!job.customer || !job.jobNumber || !job.mobileNumber) {
      return false;
    }
    
    // Check if customer name contains dummy indicators
    const customerCheck = !dummyCustomers.some(dummy => 
      job.customer.toUpperCase().includes(dummy.toUpperCase())
    );
    
    // Check if job number contains test/dummy indicators or suspicious patterns
    const jobNumberCheck = !job.jobNumber.toUpperCase().includes('TEST') && 
                          !job.jobNumber.toUpperCase().includes('DUMMY') &&
                          !job.jobNumber.toUpperCase().includes('SAMPLE') &&
                          !job.jobNumber.toUpperCase().includes('DEMO');
    
    // Check if mobile number is realistic (not test patterns)
    const mobileCheck = !job.mobileNumber.includes('000') && 
                       !job.mobileNumber.includes('111') &&
                       !job.mobileNumber.includes('123') &&
                       !job.mobileNumber.includes('999') &&
                       job.mobileNumber.length >= 8; // Minimum realistic length
    
    // Check for old/outdated entries (keep only recent 90 days)
    const jobDate = job.dateCreated ? new Date(job.dateCreated) : new Date(job.date || Date.now());
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);
    const isRecent = jobDate >= cutoffDate;
    
    return customerCheck && jobNumberCheck && mobileCheck && isRecent;
  });
  
  // Also clean up invoices with dummy data
  const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const realInvoices = invoices.filter((invoice: any) => {
    if (!invoice.shipper || !invoice.consignee) return false;
    
    return !dummyCustomers.some(dummy => 
      invoice.shipper.toUpperCase().includes(dummy.toUpperCase()) ||
      invoice.consignee.toUpperCase().includes(dummy.toUpperCase())
    );
  });
  
  // Update storage with cleaned data
  if (realJobs.length !== jobs.length) {
    localStorage.setItem('jobs', JSON.stringify(realJobs));
    console.log(`Removed ${jobs.length - realJobs.length} dummy jobs`);
  }
  
  if (realInvoices.length !== invoices.length) {
    localStorage.setItem('invoices', JSON.stringify(realInvoices));
    console.log(`Removed ${invoices.length - realInvoices.length} dummy invoices`);
  }
  
  const totalRemoved = (jobs.length - realJobs.length) + (invoices.length - realInvoices.length);
  if (totalRemoved > 0) {
    toast.success(`Cleaned up ${totalRemoved} dummy entries from system`);
  }
};
