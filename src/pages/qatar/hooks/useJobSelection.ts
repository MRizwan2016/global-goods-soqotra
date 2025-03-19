
import { useState, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";
import { toast } from "sonner";
import { cityVehicleMapping } from "../data/cityVehicleMapping";
import { JobScheduleFormData } from "../components/job-generate/job-schedule-form/types";

export const useJobSelection = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [scheduleData, setScheduleData] = useState<JobScheduleFormData>({
    scheduleNumber: "5352",
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
    // Validate required data
    if (!scheduleData.vehicle) {
      toast.error("Please select a vehicle before printing");
      return;
    }
    
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
