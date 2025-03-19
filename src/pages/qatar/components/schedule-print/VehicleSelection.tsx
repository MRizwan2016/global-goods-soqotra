
import React from "react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import { Truck } from "lucide-react";

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
  const specificVehicles = ["41070", "41067", "41073", "514005", "119927", "74827"];
  
  // Filter jobs by these specific vehicles
  const vehicleJobCounts = specificVehicles.map(vehicle => {
    const jobs = jobsByVehicle[vehicle] || [];
    return { vehicle, jobCount: jobs.length };
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Select Vehicle:</h3>
      <div className="flex flex-wrap gap-2">
        {vehicleJobCounts.length > 0 ? (
          vehicleJobCounts.map(({ vehicle, jobCount }) => (
            <Button
              key={vehicle}
              variant={selectedVehicle === vehicle ? "default" : "outline"}
              onClick={() => setSelectedVehicle(vehicle)}
              className="mb-2"
            >
              <Truck className="mr-2 h-4 w-4" />
              {vehicle} ({jobCount} jobs)
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
