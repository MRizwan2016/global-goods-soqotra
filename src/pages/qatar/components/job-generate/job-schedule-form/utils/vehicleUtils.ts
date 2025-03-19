
import { QatarVehicle } from "../../../../types/vehicleTypes";
import { QatarJob } from "../../../../types/jobTypes";
import { cityVehicleMapping } from "../../../../data/cityVehicleMapping";

export const filterVehicles = (vehicles: QatarVehicle[], selectedJobs: QatarJob[], uniqueCities: string[]): QatarVehicle[] => {
  // Show all vehicles if no jobs are selected
  if (selectedJobs.length === 0) return vehicles;
  
  // City-based truck assignment logic
  if (uniqueCities.length === 1) {
    const city = uniqueCities[0];
    const recommendedVehicles = cityVehicleMapping[city] || [];
    return vehicles.filter(vehicle => recommendedVehicles.includes(vehicle.number));
  }
  
  // If multiple cities, show all vehicles that are used for any of the cities
  if (uniqueCities.length > 1) {
    return vehicles.filter(vehicle => 
      uniqueCities.some(city => {
        const cityVehicles = cityVehicleMapping[city] || [];
        return cityVehicles.includes(vehicle.number);
      })
    );
  }
  
  // Show FORK LIFT only for warehouse jobs
  return vehicles.filter(vehicle => 
    vehicle.type === "FORK LIFT" ? 
      selectedJobs.some(job => job.location?.includes('WAREHOUSE')) : 
      true
  );
};

export const extractUniqueCities = (jobs: QatarJob[]): string[] => {
  const jobCities = jobs.map(job => job.city).filter(Boolean);
  return [...new Set(jobCities)];
};
