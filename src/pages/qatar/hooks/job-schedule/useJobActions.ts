
import { useState } from "react";
import { QatarJob } from "../../types/jobTypes";
import { JobStorageService } from "../../services/JobStorageService";
import { toast } from "sonner";

export const useJobActions = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);

  const toggleJobSelection = (job: QatarJob) => {
    const isSelected = selectedJobs.some(j => j.id === job.id);
    
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter(j => j.id !== job.id));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
    
    console.log("Toggled job selection:", job.id, "isSelected now:", !isSelected);
  };

  const handleCloseJobs = () => {
    try {
      const selectedJobIds = selectedJobs.map(job => job.id);
      
      selectedJobIds.forEach(id => {
        JobStorageService.updateJob(id, { 
          status: 'COMPLETED',
          isAssigned: true,
          completionDate: new Date().toISOString().split('T')[0]
        });
      });
      
      console.log(`Closing ${selectedJobs.length} jobs`);
      toast.success(`${selectedJobs.length} jobs have been closed`);
      
      setSelectedJobs([]);
    } catch (error) {
      toast.error("Failed to close jobs. Please try again.");
      console.error("Error closing jobs:", error);
    }
  };

  return {
    selectedJobs,
    setSelectedJobs,
    toggleJobSelection,
    handleCloseJobs
  };
};
