
import { useState, useEffect } from "react";
import { QatarJob } from "../../types/jobTypes";
import { JobScheduleFormData } from "../../components/job-generate/job-schedule-form/types";
import { cityVehicleMapping } from "../../data/cityVehicleMapping";
import { generateUniqueScheduleNumber } from "./utils";

export const useScheduleState = (selectedJobs: QatarJob[]) => {
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
      const cities = selectedJobs.map(job => job.city).filter(Boolean);
      const uniqueCities = [...new Set(cities)];
      
      if (uniqueCities.length === 1) {
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

  return {
    isPrintMode,
    setIsPrintMode,
    isEditMode,
    setIsEditMode,
    scheduleData,
    setScheduleData
  };
};
