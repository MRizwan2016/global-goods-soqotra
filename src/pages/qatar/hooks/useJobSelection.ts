
import { useState } from "react";
import { QatarJob } from "../types/jobTypes";
import { toast } from "sonner";

export const useJobSelection = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    scheduleNumber: "5352",
    vehicle: "",
    salesRep: "",
    driver: "",
    helper: "",
    scheduleDate: new Date().toISOString().split('T')[0],
  });
  
  const toggleJobSelection = (job: QatarJob) => {
    const isSelected = selectedJobs.some(j => j.id === job.id);
    
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter(j => j.id !== job.id));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };
  
  const handleScheduleSubmit = (data: any) => {
    setScheduleData(data);
    setIsPrintMode(true);
  };
  
  const handleBackFromPrint = () => {
    setIsPrintMode(false);
  };
  
  const handleCloseJobs = () => {
    // In a real app, this would update the backend
    toast.success(`${selectedJobs.length} jobs have been closed`);
    
    // Clear selections after closing
    setSelectedJobs([]);
  };

  const handleDirectPrint = () => {
    // Go directly to print mode with current schedule data
    setIsPrintMode(true);
  };
  
  return {
    selectedJobs,
    setSelectedJobs,
    isPrintMode,
    setIsPrintMode,
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
    handleBackFromPrint,
    handleCloseJobs,
    handleDirectPrint
  };
};
