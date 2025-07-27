
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import JobForm from "./components/JobForm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Truck } from "lucide-react";
import { JobStorageService } from "./services/JobStorageService";
import { JobNumberService } from "@/services/JobNumberService";
import { cityVehicleMapping } from "./data/cityVehicleMapping";
import { fixInvoiceLinkage, cleanupDummyData } from "./utils/fixInvoiceLinkage";

const NewJobForm = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // Fix invoice linkage issues on component mount
  useEffect(() => {
    fixInvoiceLinkage();
    cleanupDummyData();
  }, []);
  
  const handleCreateJob = async (jobData: any) => {
    try {
      setIsSaving(true);
      console.log("Creating new job:", jobData);
      
      // Validate essential fields
      if (!jobData.jobNumber) {
        toast.error("Job number is required");
        setIsSaving(false);
        return;
      }
      
      if (!jobData.customer) {
        toast.error("Customer name is required");
        setIsSaving(false);
        return;
      }
      
      // Ensure we have an ID
      if (!jobData.id) {
        jobData.id = crypto.randomUUID();
        console.log("Generated new job ID:", jobData.id);
      }
      
      // Add location-based vehicle assignment
      if (jobData.city && !jobData.vehicle) {
        try {
          jobData.vehicle = cityVehicleMapping[jobData.city]?.[0] || "";
        } catch (error) {
          console.error("Error loading city vehicle mapping:", error);
        }
      }
      
      // Save the job using our storage service
      try {
        console.log("About to save job with data:", jobData);
        const savedJob = JobStorageService.saveJob(jobData);
        console.log("Job saved successfully:", savedJob);

        // If there's an invoice number, update the invoice to include the job number
        if (savedJob.invoiceNumber) {
          try {
            const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
            const matchingInvoice = invoices.find((inv: any) => inv.invoiceNumber === savedJob.invoiceNumber);
            if (matchingInvoice) {
              matchingInvoice.jobNumber = savedJob.jobNumber;
              localStorage.setItem('invoices', JSON.stringify(invoices));
            }
            
            // Also link via the JobNumberService
            JobNumberService.linkJobToInvoice(savedJob.jobNumber, savedJob.invoiceNumber);
            
            // Link mobile number if available
            if (savedJob.mobileNumber) {
              JobNumberService.linkJobToMobile(savedJob.jobNumber, savedJob.mobileNumber);
            }
          } catch (error) {
            console.error('Error linking job number with invoice:', error);
          }
        }
        
        setTimeout(() => {
          toast.success("Job created successfully!");
          setIsSaving(false);
          navigate("/qatar/jobs");  // Navigate to jobs page after successful creation
        }, 800);
      } catch (error) {
        console.error("Error in JobStorageService.saveJob:", error);
        toast.error(`Failed to save job: ${error instanceof Error ? error.message : "Unknown error"}`);
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Error in overall job creation process:", error);
      toast.error(`Failed to save job: ${error instanceof Error ? error.message : "Unknown error"}`);
      setIsSaving(false);
    }
  };
  
  const handleClickSaveJob = () => {
    console.log("Save button clicked");
    document.getElementById('job-form')?.dispatchEvent(new Event('submit', { bubbles: true }));
  };
  
  return (
    <Layout title="Create New Qatar Job">
      <div className="space-y-6 bg-white p-8 rounded-lg shadow-sm animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">ADD NEW JOB</h1>
            <p className="text-gray-500">CREATE A NEW COLLECTION OR DELIVERY OF PERSONAL EFFECTS & HOUSEHOLD GOODS</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/qatar")}
              className="flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button 
              onClick={handleClickSaveJob}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-colors"
              disabled={isSaving}
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Job'}
            </Button>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
          <h3 className="flex items-center gap-2 font-medium text-yellow-800">
            <Truck className="h-5 w-5" />
            Personal Effects & Household Goods Only
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            This form is specifically for collection or delivery of personal effects and household goods, 
            not for commercial cargo.
          </p>
        </div>
        
        <JobForm 
          isNewJob={true}
          onSubmit={handleCreateJob}
          isSaving={isSaving}
        />
      </div>
    </Layout>
  );
};

export default NewJobForm;
