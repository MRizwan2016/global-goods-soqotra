
import React from "react";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { QatarJob } from "../../../types/jobTypes";

interface VehicleGroupViewProps {
  showVehicleView: boolean;
  toggleVehicleView: () => void;
  selectedVehicle: string | null;
  setSelectedVehicle: (vehicle: string) => void;
  jobsByVehicle: Record<string, QatarJob[]>;
  vehicleNumbers: string[];
}

const VehicleGroupView: React.FC<VehicleGroupViewProps> = ({
  showVehicleView,
  toggleVehicleView,
  selectedVehicle,
  setSelectedVehicle,
  jobsByVehicle,
  vehicleNumbers,
}) => {
  return (
    <>
      <Button 
        onClick={toggleVehicleView}
        variant="outline"
        className={showVehicleView ? "bg-blue-50" : ""}
      >
        <Truck className="mr-2 h-4 w-4" />
        {showVehicleView ? "Show All Jobs" : "Group by Vehicle"}
      </Button>
      
      {/* Vehicle Selection */}
      {showVehicleView && (
        <div className="flex-1 p-4 border rounded-md bg-gray-50">
          <h3 className="font-bold mb-2">Select Vehicle:</h3>
          <div className="flex flex-wrap gap-2">
            {vehicleNumbers.length > 0 ? (
              vehicleNumbers.map(vehicle => (
                <Button
                  key={vehicle}
                  variant={selectedVehicle === vehicle ? "default" : "outline"}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="mb-2"
                  size="sm"
                >
                  {vehicle} ({jobsByVehicle[vehicle].length} jobs)
                </Button>
              ))
            ) : (
              <p>No vehicles assigned to selected jobs</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleGroupView;
