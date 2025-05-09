
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobForm } from "./context/JobFormContext";
import { toast } from "sonner";

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
    
    if (!jobData.customer) {
      toast.error("Please enter customer name");
      return;
    }
    
    // Prepare the job data with all items included
    const completeJobData = {
      ...jobData,
      items: jobItems,
      // Convert advance amount to number for storage
      advanceAmount: parseFloat(String(jobData.advanceAmount)) || 0,
      // Set default status if not already set
      status: jobData.status || 'PENDING'
    };
    
    // Submit the form with complete data
    console.log("Submitting job form data:", completeJobData);
    try {
      onSubmit(completeJobData);
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error(`Error submitting job: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleCancel = () => {
    navigate("/qatar");
  };

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
      {!disabled && !readOnly && (
        <Button 
          type="submit" 
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
