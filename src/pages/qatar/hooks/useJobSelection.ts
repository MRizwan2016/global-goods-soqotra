
import { useState, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";
import { toast } from "sonner";
import { cityVehicleMapping } from "../data/cityVehicleMapping";
import { JobScheduleFormData } from "../components/job-generate/job-schedule-form/types";
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate unique schedule number
const generateUniqueScheduleNumber = (): string => {
  const timestamp = new Date().getTime();
  return `${timestamp % 10000}${Math.floor(Math.random() * 1000)}`;
};

export const useJobSelection = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
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
      scheduleNumber: generateUniqueScheduleNumber()
    };
    
    setScheduleData(formDataWithUniqueSchedule);
    
    // Attempt to save the selected jobs with the schedule data
    try {
      // In a real app, this would save to an API
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
    // Generate a new schedule number when returning from print mode
    setScheduleData(prev => ({
      ...prev,
      scheduleNumber: generateUniqueScheduleNumber()
    }));
  };
  
  const handleCloseJobs = () => {
    // In a real app, this would update the backend
    try {
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
    
    // Generate new schedule number before printing
    setScheduleData(prev => ({
      ...prev,
      scheduleNumber: generateUniqueScheduleNumber()
    }));
    
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
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
    handleBackFromPrint,
    handleCloseJobs,
    handleDirectPrint
  };
};
