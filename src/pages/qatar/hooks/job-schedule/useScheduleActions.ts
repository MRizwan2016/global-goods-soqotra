import { JobScheduleFormData } from "../../components/job-generate/job-schedule-form/types";
import { QatarJob } from "../../types/jobTypes";
import { JobStorageService } from "../../services/JobStorageService";
import { ScheduleService } from "@/services/ScheduleService";
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

  const handleScheduleSave = async () => {
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
    
    // Save schedule data with jobs to database
    try {
      const updatedJobs = selectedJobs.map(job => ({
        ...job,
        vehicle: scheduleData.vehicle,
        driver: scheduleData.driver,
        helper: scheduleData.helper,
        scheduleNumber: scheduleData.scheduleNumber,
        status: 'SCHEDULED',
        isAssigned: true
      }));
      
      // Save to database using ScheduleService
      const schedulePayload = {
        schedule_number: scheduleData.scheduleNumber,
        schedule_date: scheduleData.scheduleDate,
        vehicle: scheduleData.vehicle,
        sales_rep: scheduleData.salesRep,
        driver: scheduleData.driver,
        helper: scheduleData.helper,
        country: 'qatar',
        jobs: updatedJobs
      };
      
      const result = await ScheduleService.saveSchedule(schedulePayload);
      
      if (result.success) {
        // Also update local storage for immediate UI updates
        updatedJobs.forEach(job => {
          JobStorageService.updateJob(job.id, job);
        });
        
        toast.success("Schedule details saved to database successfully!");
      } else {
        throw new Error(result.error || 'Failed to save to database');
      }
    } catch (error) {
      console.error("Error saving schedule details:", error);
      toast.error("Failed to save schedule details: " + (error as Error).message);
    }
  };

  const handleScheduleSubmit = async (data: JobScheduleFormData) => {
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
      // Save all jobs with vehicle and schedule info
      const updatedJobs = selectedJobs.map(job => ({
        ...job,
        status: 'SCHEDULED',
        isAssigned: true,
        vehicle: data.vehicle,
        driver: data.driver,
        helper: data.helper,
        scheduleNumber: formDataWithUniqueSchedule.scheduleNumber
      }));
      
      // Save to database using ScheduleService
      const schedulePayload = {
        schedule_number: formDataWithUniqueSchedule.scheduleNumber,
        schedule_date: formDataWithUniqueSchedule.scheduleDate,
        vehicle: formDataWithUniqueSchedule.vehicle,
        sales_rep: formDataWithUniqueSchedule.salesRep,
        driver: formDataWithUniqueSchedule.driver,
        helper: formDataWithUniqueSchedule.helper,
        country: 'qatar',
        jobs: updatedJobs
      };
      
      const result = await ScheduleService.saveSchedule(schedulePayload);
      
      if (result.success) {
        // Also update local storage for immediate UI updates
        updatedJobs.forEach(job => {
          JobStorageService.updateJob(job.id, {
            ...job,
            status: 'SCHEDULED',
            isAssigned: true
          });
        });
        
        toast.success(`Schedule ${formDataWithUniqueSchedule.scheduleNumber} saved successfully! Jobs moved to scheduled status.`);
        setIsPrintMode(true);
        
        // Clear selected jobs from job generation page after successful schedule creation
        window.dispatchEvent(new CustomEvent('jobsScheduled', { detail: { jobIds: updatedJobs.map(j => j.id) } }));
      } else {
        throw new Error(result.error || 'Failed to save to database');
      }
    } catch (error) {
      toast.error("Failed to save schedule: " + (error as Error).message);
      console.error("Error saving schedule:", error);
    }
  };

  const handleBackFromPrint = () => {
    setIsPrintMode(false);
    setIsEditMode(false);
  };

  const handleDirectPrint = async () => {
    if (!scheduleData.vehicle) {
      toast.error("Please select a vehicle before printing");
      return;
    }
    
    if (selectedJobs.length === 0) {
      toast.error("Please select at least one job before printing");
      return;
    }
    
    // Save schedule data before printing
    try {
      const updatedJobs = selectedJobs.map(job => ({
        ...job,
        vehicle: scheduleData.vehicle,
        driver: scheduleData.driver,
        helper: scheduleData.helper,
        scheduleNumber: scheduleData.scheduleNumber,
        status: 'SCHEDULED',
        isAssigned: true
      }));
      
      // Save to database using ScheduleService
      const schedulePayload = {
        schedule_number: scheduleData.scheduleNumber,
        schedule_date: scheduleData.scheduleDate,
        vehicle: scheduleData.vehicle,
        sales_rep: scheduleData.salesRep,
        driver: scheduleData.driver,
        helper: scheduleData.helper,
        country: 'qatar',
        jobs: updatedJobs
      };
      
      const result = await ScheduleService.saveSchedule(schedulePayload);
      
      if (result.success) {
        // Also update local storage for immediate UI updates
        updatedJobs.forEach(job => {
          JobStorageService.updateJob(job.id, job);
        });
        
        toast.success(`Schedule ${scheduleData.scheduleNumber} saved to database. Preparing print view...`);
        
        // Set print mode after a short delay
        setTimeout(() => {
          setIsPrintMode(true);
        }, 100);
      } else {
        throw new Error(result.error || 'Failed to save to database');
      }
    } catch (error) {
      console.error("Error saving schedule before print:", error);
      toast.error("Failed to save schedule: " + (error as Error).message);
    }
  };

  return {
    handleScheduleEdit,
    handleScheduleSave,
    handleScheduleSubmit,
    handleBackFromPrint,
    handleDirectPrint
  };
};