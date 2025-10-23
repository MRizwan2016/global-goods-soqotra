
import { useState, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";
import { cityVehicleMapping } from "../data/cityVehicleMapping";
import { VehicleJobStorageService } from "../services/VehicleJobStorageService";

export const useJobGrouping = (selectedJobs: QatarJob[]) => {
  const [showVehicleView, setShowVehicleView] = useState(false);
  const [showCityView, setShowCityView] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Make sure to display all jobs when selecting a vehicle
  const jobsForSchedule = selectedJobs.filter(job => {
    if (selectedVehicle) {
      // Show all jobs that either match the selected vehicle OR have no vehicle assigned yet
      return job.vehicle === selectedVehicle || !job.vehicle;
    } else if (selectedCity) {
      return job.city === selectedCity;
    } else {
      return true;
    }
  });
  
  // Auto-recommend vehicle for a city
  useEffect(() => {
    if (selectedCity && !selectedVehicle) {
      const recommendedVehicle = cityVehicleMapping[selectedCity]?.[0];
      if (recommendedVehicle) {
        setSelectedVehicle(recommendedVehicle);
      }
    }
  }, [selectedCity]);
  
  // Check if form should be disabled
  const isFormDisabled = selectedJobs.length === 0 || 
                        (jobsForSchedule.length === 0);

  // Handle job assignment to vehicle
  const assignJobsToVehicle = (jobIds: string[], vehicleId: string) => {
    jobIds.forEach(jobId => {
      VehicleJobStorageService.assignJobToVehicle(jobId, vehicleId);
    });
    
    // Update vehicle statistics
    VehicleJobStorageService.updateVehicleStatistics();
  };
  
  return {
    showVehicleView,
    setShowVehicleView,
    showCityView,
    setShowCityView,
    selectedVehicle,
    setSelectedVehicle,
    selectedCity,
    setSelectedCity,
    jobsForSchedule,
    isFormDisabled,
    assignJobsToVehicle
  };
};
