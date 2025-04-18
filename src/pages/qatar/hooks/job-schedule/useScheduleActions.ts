
import { JobScheduleFormData } from "../../components/job-generate/job-schedule-form/types";
import { QatarJob } from "../../types/jobTypes";
import { JobStorageService } from "../../services/JobStorageService";
import { generateUniqueScheduleNumber } from "./utils";
import { toast } from "sonner";

export const useScheduleActions = (
  selectedJobs: QatarJob[],
  scheduleData: JobScheduleFormData,
  setScheduleData: React.Dispatch<React.SetStateAction<JobScheduleFormData>>,
  setIsPrintMode: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleScheduleEdit = () => {
    setIsEditMode(true);
  };

  const handleScheduleSave = () => {
    if (!scheduleData.vehicle) {
      toast.error("Please select a vehicle before saving schedule details");
      return;
    }
    
    if (!scheduleData.driver) {
      toast.warning("Driver information is missing");
    }
    
    if (!scheduleData.salesRep) {
      toast.warning("Sales Rep information is missing");
    }
    
    setIsEditMode(false);
    toast.success("Schedule details have been saved");
  };

  const handleScheduleSubmit = (data: JobScheduleFormData) => {
    if (!data.vehicle) {
      toast.error("Please select a vehicle before generating schedule");
      return;
    }
    
    if (!data.driver) {
      toast.warning("Driver information is missing");
    }
    
    if (!data.salesRep) {
      toast.warning("Sales Rep information is missing");
    }
    
    const formDataWithUniqueSchedule = {
      ...data,
      scheduleNumber: data.scheduleNumber || generateUniqueScheduleNumber()
    };
    
    setScheduleData(formDataWithUniqueSchedule);
    
    try {
      const selectedJobIds = selectedJobs.map(job => job.id);
      
      selectedJobIds.forEach(id => {
        JobStorageService.updateJob(id, { 
          status: 'SCHEDULED',
          isAssigned: true,
          vehicle: data.vehicle,
          driver: data.driver,
          helper: data.helper,
          scheduleNumber: formDataWithUniqueSchedule.scheduleNumber
        });
      });
      
      console.log("Saving schedule with jobs:", formDataWithUniqueSchedule, selectedJobs);
      
      toast.success(`Schedule ${formDataWithUniqueSchedule.scheduleNumber} generated successfully`);
      setIsPrintMode(true);
    } catch (error) {
      toast.error("Failed to save schedule. Please try again.");
      console.error("Error saving schedule:", error);
    }
  };

  const handleBackFromPrint = () => {
    setIsPrintMode(false);
    setIsEditMode(false);
  };

  const handleDirectPrint = () => {
    if (!scheduleData.vehicle) {
      toast.error("Please select a vehicle before printing");
      return;
    }
    
    if (selectedJobs.length === 0) {
      toast.error("Please select at least one job before printing");
      return;
    }
    
    setTimeout(() => {
      setIsPrintMode(true);
    }, 100);
  };

  return {
    handleScheduleEdit,
    handleScheduleSave,
    handleScheduleSubmit,
    handleBackFromPrint,
    handleDirectPrint
  };
};
