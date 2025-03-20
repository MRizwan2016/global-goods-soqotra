
import React from "react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import { Truck } from "lucide-react";
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
  const specificVehicles = ["41067", "41073", "514005", "119927", "74827", "41070"];
  
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
    
    return { vehicle, vehicleLabel, jobCount: jobs.length, cityCount: cities.length };
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Select Vehicle:</h3>
      <div className="flex flex-wrap gap-2">
        {vehicleJobCounts.length > 0 ? (
          vehicleJobCounts.map(({ vehicle, vehicleLabel, jobCount, cityCount }) => (
            <Button
              key={vehicle}
              variant={selectedVehicle === vehicle ? "default" : "outline"}
              onClick={() => setSelectedVehicle(vehicle)}
              className="mb-2"
            >
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
