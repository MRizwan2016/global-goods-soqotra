
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
  
  // Filter out dummy jobs (jobs with dummy customer names, test data, or old irrelevant data)
  const dummyCustomers = [
    "QATAR NATIONAL BANK", 
    "SAMPLE CUSTOMER", 
    "TEST CUSTOMER", 
    "MRS. AMIRA SIED OSMAN", 
    "DUMMY", 
    "Sample",
    "QATAR COLLECTION & DELIVERY MANAGEMENT",
    "TEST",
    "DEMO"
  ];
  
  const realJobs = jobs.filter((job: any) => {
    // Check if customer name contains dummy indicators
    const customerCheck = job.customer && !dummyCustomers.some(dummy => 
      job.customer.toUpperCase().includes(dummy.toUpperCase())
    );
    
    // Check if job number contains test/dummy indicators
    const jobNumberCheck = job.jobNumber && !job.jobNumber.toUpperCase().includes('TEST') && 
                          !job.jobNumber.toUpperCase().includes('DUMMY');
    
    // Check if mobile number is not a test number
    const mobileCheck = job.mobileNumber && !job.mobileNumber.includes('000') && 
                       !job.mobileNumber.includes('111');
    
    return customerCheck && jobNumberCheck && mobileCheck;
  });
  
  if (realJobs.length !== jobs.length) {
    localStorage.setItem('jobs', JSON.stringify(realJobs));
    console.log(`Removed ${jobs.length - realJobs.length} dummy jobs`);
    toast.success(`Cleaned up ${jobs.length - realJobs.length} dummy entries`);
  }
};
