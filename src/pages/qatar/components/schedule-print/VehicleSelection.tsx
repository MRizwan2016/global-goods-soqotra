
import React from "react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import { groupBy } from "lodash";

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
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Select Vehicle:</h3>
      <div className="flex flex-wrap gap-2">
        {vehicleNumbers.length > 0 ? (
          vehicleNumbers.map(vehicle => (
            <Button
              key={vehicle}
              variant={selectedVehicle === vehicle ? "default" : "outline"}
              onClick={() => setSelectedVehicle(vehicle)}
              className="mb-2"
            >
              {vehicle} ({jobsByVehicle[vehicle].length} jobs)
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
