import { useState, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";
import { toast } from "sonner";
import { cityVehicleMapping } from "../data/cityVehicleMapping";
import { JobScheduleFormData } from "../components/job-generate/job-schedule-form/types";
import { JobStorageService } from "../services/JobStorageService";

// Helper function to generate unique schedule number
const generateUniqueScheduleNumber = (): string => {
  const timestamp = new Date().getTime();
  return `${timestamp % 10000}${Math.floor(Math.random() * 1000)}`;
};

export const useJobSelection = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [scheduleData, setScheduleData] = useState<JobScheduleFormData>({
    scheduleNumber: generateUniqueScheduleNumber(),
    vehicle: "",
    salesRep: "",
    driver: "",
    helper: "",
    scheduleDate: new Date().toISOString().split('T')[0],
    city: ""
  });
  
  // Auto-recommend vehicle based on selected jobs' cities
  useEffect(() => {
    if (selectedJobs.length > 0 && !scheduleData.vehicle) {
      // Get all cities from selected jobs
      const cities = selectedJobs.map(job => job.city).filter(Boolean);
      const uniqueCities = [...new Set(cities)];
      
      if (uniqueCities.length === 1) {
        // If all jobs are for the same city, recommend the vehicle for that city
        const city = uniqueCities[0];
        const recommendedVehicles = cityVehicleMapping[city] || [];
        
        if (recommendedVehicles.length > 0) {
          setScheduleData(prev => ({
            ...prev,
            vehicle: recommendedVehicles[0],
            city: city
          }));
        }
      }
    }
  }, [selectedJobs]);
  
  const toggleJobSelection = (job: QatarJob) => {
    const isSelected = selectedJobs.some(j => j.id === job.id);
    
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter(j => j.id !== job.id));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
    
    console.log("Toggled job selection:", job.id, "isSelected now:", !isSelected);
  };

  const handleScheduleEdit = () => {
    setIsEditMode(true);
  };

  const handleScheduleSave = () => {
    // Validate required data
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
    // Validate required data
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
    
    // Always generate a new schedule number to ensure uniqueness
    const formDataWithUniqueSchedule = {
      ...data,
      scheduleNumber: data.scheduleNumber || generateUniqueScheduleNumber()
    };
    
    setScheduleData(formDataWithUniqueSchedule);
    
    // Attempt to save the selected jobs with the schedule data
    try {
      // Get selected job IDs
      const selectedJobIds = selectedJobs.map(job => job.id);
      
      // Mark the jobs as scheduled
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
      
      // Simulate successful save
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
    // Keep the same schedule number when returning from print mode for consistency
  };
  
  const handleCloseJobs = () => {
    // In a real app, this would update the backend
    try {
      // Get selected job IDs
      const selectedJobIds = selectedJobs.map(job => job.id);
      
      // Mark the jobs as closed/completed
      selectedJobIds.forEach(id => {
        JobStorageService.updateJob(id, { 
          status: 'COMPLETED',
          isAssigned: true,
          completionDate: new Date().toISOString().split('T')[0]
        });
      });
      
      console.log(`Closing ${selectedJobs.length} jobs`);
      toast.success(`${selectedJobs.length} jobs have been closed`);
      
      // Clear selections after closing
      setSelectedJobs([]);
    } catch (error) {
      toast.error("Failed to close jobs. Please try again.");
      console.error("Error closing jobs:", error);
    }
  };

  const handleDirectPrint = () => {
    // Validate required data
    if (!scheduleData.vehicle) {
      toast.error("Please select a vehicle before printing");
      return;
    }
    
    if (selectedJobs.length === 0) {
      toast.error("Please select at least one job before printing");
      return;
    }
    
    // Keep the current schedule number when printing directly
    
    // Small delay to ensure state is updated
    setTimeout(() => {
      setIsPrintMode(true);
    }, 100);
  };
  
  return {
    selectedJobs,
    setSelectedJobs,
    isPrintMode,
    setIsPrintMode,
    isEditMode,
    setIsEditMode,
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
    handleScheduleEdit,
    handleScheduleSave,
    handleBackFromPrint,
    handleCloseJobs,
    handleDirectPrint
  };
};
