
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobForm } from "./context/JobFormContext";
import { toast } from "sonner";

interface JobFormActionsProps {
  isNewJob: boolean;
  onSubmit: (data: any) => void;
}

const JobFormActions: React.FC<JobFormActionsProps> = ({ isNewJob, onSubmit }) => {
  const navigate = useNavigate();
  const { 
    jobData, 
    jobItems, 
    isJobNumberGenerated, 
    isSaving 
  } = useJobForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isJobNumberGenerated && isNewJob) {
      toast.error("Please generate a Job Number first");
      return;
    }
    
    onSubmit({
      ...jobData,
      items: jobItems,
      // Convert advance amount to number for storage
      advanceAmount: parseFloat(jobData.advanceAmount) || 0
    });
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
        CANCEL
      </Button>
      <Button 
        type="submit" 
        className="bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-colors"
        disabled={isSaving || (!isJobNumberGenerated && isNewJob)}
        onClick={handleSubmit}
      >
        <Save size={16} />
        {isNewJob ? 'CREATE JOB' : 'UPDATE JOB'}
        {isSaving && <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>}
      </Button>
    </div>
  );
};

export default JobFormActions;
