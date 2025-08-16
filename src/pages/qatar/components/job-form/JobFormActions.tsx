
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobForm } from "./context/JobFormContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import InvoicePrintButton from "./InvoicePrintButton";
import { QatarJob } from "../../types/jobTypes";

interface JobFormActionsProps {
  isNewJob: boolean;
  onSubmit: (data: any) => void;
  disabled?: boolean;
}

const JobFormActions: React.FC<JobFormActionsProps> = ({ 
  isNewJob, 
  onSubmit,
  disabled = false
}) => {
  const navigate = useNavigate();
  const { 
    jobData, 
    jobItems, 
    isJobNumberGenerated, 
    isSaving,
    readOnly
  } = useJobForm();

  const isFormDisabled = disabled || readOnly || isSaving || (!isJobNumberGenerated && isNewJob);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (disabled || readOnly) {
      toast.error("This job cannot be modified");
      return;
    }
    
    // Validate required fields
    if (!isJobNumberGenerated && isNewJob) {
      toast.error("Please generate a Job Number first");
      return;
    }
    
    if (!jobData.customer?.trim()) {
      toast.error("Please enter customer name");
      return;
    }

    console.log("All validations passed, proceeding with job submission...");
    
    // Ensure job has an ID
    const jobDataWithId = {
      ...jobData,
      id: jobData.id || uuidv4(),  // Use existing ID or generate a new one
      items: jobItems,
      // Convert advance amount to number for storage
      advanceAmount: parseFloat(String(jobData.advanceAmount)) || 0,
      // Set default status if not already set
      status: jobData.status || 'PENDING',
      timestamp: new Date().toISOString()
    };
    
    // Submit the form with complete data
    console.log("Submitting job form data:", jobDataWithId);
    try {
      onSubmit(jobDataWithId);
      // Dispatch event to notify all job lists to refresh
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('jobsUpdated'));
      }, 100);
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error(`Error submitting job: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleCancel = () => {
    navigate("/qatar");
  };

  // Create a complete job object for printing
  const jobForPrint: QatarJob = {
    ...jobData,
    id: jobData.id || uuidv4(), // Ensure id is always present
    items: jobItems,
    advanceAmount: parseFloat(String(jobData.advanceAmount)) || 0,
    jobType: (jobData.jobType === 'COLLECTION' || jobData.jobType === 'DELIVERY') 
      ? jobData.jobType 
      : 'COLLECTION' as const,
    status: (jobData.status as QatarJob['status']) || 'PENDING',
    date: jobData.date || new Date().toISOString().split('T')[0],
    time: jobData.time || '12:00',
    amPm: (jobData.amPm === 'AM' || jobData.amPm === 'PM') ? jobData.amPm : 'AM',
    location: jobData.location || '',
    city: jobData.city || '',
    mobileNumber: jobData.mobileNumber || '',
  };

  // Listen for form submission events
  React.useEffect(() => {
    const form = document.getElementById('job-form');
    const handleFormSubmit = (e: Event) => {
      e.preventDefault();
      console.log("JobFormActions: Form submit event received");
      // Create a synthetic React FormEvent
      const syntheticEvent = {
        preventDefault: () => {},
        currentTarget: e.currentTarget,
        target: e.target
      } as React.FormEvent;
      handleSubmit(syntheticEvent);
    };

    if (form) {
      form.addEventListener('submit', handleFormSubmit);
      return () => form.removeEventListener('submit', handleFormSubmit);
    }
  }, [handleSubmit]);

  return (
    <div className="flex justify-end gap-2 mt-6">
      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={handleCancel}
      >
        <ArrowLeft size={16} />
        BACK
      </Button>
      
      {/* Print Invoice Button - show for existing jobs */}
      {!isNewJob && jobData.jobNumber && (
        <InvoicePrintButton 
          job={jobForPrint} 
          disabled={!jobData.customer || !jobData.jobNumber}
        />
      )}
      
      {!disabled && !readOnly && (
        <Button 
          type="button"
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-colors"
          disabled={isFormDisabled}
          onClick={handleSubmit}
        >
          <Save size={16} />
          {isNewJob ? 'CREATE JOB' : 'UPDATE JOB'}
          {isSaving && <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>}
        </Button>
      )}
    </div>
  );
};

export default JobFormActions;
