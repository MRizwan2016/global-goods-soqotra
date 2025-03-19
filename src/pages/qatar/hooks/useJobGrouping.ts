
import { useState, useEffect } from "react";
import { QatarJob } from "../types/jobTypes";

export const useJobGrouping = (selectedJobs: QatarJob[]) => {
  const [showVehicleView, setShowVehicleView] = useState(false);
  const [showCityView, setShowCityView] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Update vehicle/city selection when jobs change
  useEffect(() => {
    // If we're showing vehicles but don't have one selected
    if (showVehicleView && !selectedVehicle && selectedJobs.length > 0) {
      // Get all vehicles from selected jobs
      const vehicles = selectedJobs
        .map(job => job.vehicle)
        .filter(Boolean);
      const uniqueVehicles = [...new Set(vehicles)];
      
      if (uniqueVehicles.length > 0) {
        setSelectedVehicle(uniqueVehicles[0]);
      }
    }
    
    // If we're showing cities but don't have one selected
    if (showCityView && !selectedCity && selectedJobs.length > 0) {
      // Get all cities from selected jobs
      const cities = selectedJobs
        .map(job => job.city)
        .filter(Boolean);
      const uniqueCities = [...new Set(cities)];
      
      if (uniqueCities.length > 0) {
        setSelectedCity(uniqueCities[0]);
      }
    }
  }, [selectedJobs, showVehicleView, showCityView, selectedVehicle, selectedCity]);
  
  // Get jobs for the selected vehicle
  const getSelectedVehicleJobs = () => {
    if (!selectedVehicle) return [];
    
    return selectedJobs
      .filter(job => job.vehicle === selectedVehicle)
      .map((job, index) => ({ ...job, sequenceNum: index + 1 }));
  };
  
  // Get jobs for the selected city
  const getSelectedCityJobs = () => {
    if (!selectedCity) return [];
    
    return selectedJobs
      .filter(job => job.city === selectedCity)
      .map((job, index) => ({ ...job, sequenceNum: index + 1 }));
  };
  
  // Determine which jobs to use based on current view mode
  const getJobsForSchedule = () => {
    if (showVehicleView && selectedVehicle) {
      return getSelectedVehicleJobs();
    } else if (showCityView && selectedCity) {
      return getSelectedCityJobs();
    } else {
      return selectedJobs;
    }
  };
  
  const jobsForSchedule = getJobsForSchedule();
  
  // Determine if form should be disabled
  const isFormDisabled = () => {
    return (showVehicleView && !selectedVehicle) || 
           (showCityView && !selectedCity) || 
           selectedJobs.length === 0;
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
    isFormDisabled: isFormDisabled()
  };
};
