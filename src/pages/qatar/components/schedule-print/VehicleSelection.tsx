
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QatarJob } from "../../types/jobTypes";
import { Truck, Circle } from "lucide-react";
import { getCitiesForVehicle } from "../../data/cityVehicleMapping";

interface VehicleSelectionProps {
  jobsByVehicle: Record<string, QatarJob[]>;
  selectedVehicle: string | null;
  setSelectedVehicle: (vehicle: string) => void;
}

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ 
  jobsByVehicle, 
  selectedVehicle, 
  setSelectedVehicle 
}) => {
  // Use specific vehicle numbers as requested
  const specificVehicles = ["41067", "41073", "41070", "514005", "119927", "74827"];
  
  // Vehicle availability status (in real app, this would come from backend)
  const vehicleStatus: Record<string, boolean> = {
    "41067": true,  // available
    "41073": true,
    "41070": true,
    "514005": false, // busy
    "119927": false,
    "74827": true,
  };
  
  // Filter jobs by these specific vehicles
  const vehicleJobCounts = specificVehicles.map(vehicle => {
    const jobs = jobsByVehicle[vehicle] || [];
    const cities = getCitiesForVehicle(vehicle);
    let vehicleLabel = vehicle;
    
    // Add label for vehicle based on general area
    if (vehicle === "41067") {
      vehicleLabel += " (West Bay/Dafna)";
    } else if (vehicle === "41073") {
      vehicleLabel += " (Wakra/Najma)";
    } else if (vehicle === "514005") {
      vehicleLabel += " (Industrial Area)";
    } else if (vehicle === "119927") {
      vehicleLabel += " (Warehouse)";
    } else if (vehicle === "74827") {
      vehicleLabel += " (Special Areas)";
    } else if (vehicle === "41070") {
      vehicleLabel += " (International)";
    }
    
    return { 
      vehicle, 
      vehicleLabel, 
      jobCount: jobs.length, 
      cityCount: cities.length, 
      isAvailable: vehicleStatus[vehicle] || false
    };
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Select Vehicle:</h3>
      <div className="flex flex-wrap gap-2">
        {vehicleJobCounts.length > 0 ? (
          vehicleJobCounts.map(({ vehicle, vehicleLabel, jobCount, cityCount, isAvailable }) => (
            <Button
              key={vehicle}
              variant={selectedVehicle === vehicle ? "default" : "outline"}
              onClick={() => setSelectedVehicle(vehicle)}
              className="mb-2"
            >
              <Circle 
                className={`mr-1 h-3 w-3 ${isAvailable ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'}`}
              />
              <Truck className="mr-2 h-4 w-4" />
              {vehicleLabel} ({jobCount} jobs, {cityCount} locations)
            </Button>
          ))
        ) : (
          <p>No vehicles with assigned jobs found</p>
        )}
      </div>
    </div>
  );
};

export default VehicleSelection;
