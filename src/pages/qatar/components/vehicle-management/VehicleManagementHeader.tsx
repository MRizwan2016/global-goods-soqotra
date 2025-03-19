
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Truck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VehicleManagementHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNewVehicle = () => {
    // TODO: Implement new vehicle functionality
    console.log("Add new vehicle clicked");
  };
  
  const handleGoToDrivers = () => {
    // TODO: Implement driver management navigation
    console.log("Go to drivers clicked");
  };
  
  const handleGoToJobs = () => {
    navigate("/qatar/jobs");
  };
  
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
      <h3 className="text-lg font-medium text-blue-800">QATAR LOGISTICS VEHICLE MANAGEMENT</h3>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleGoToJobs}
        >
          <Truck size={14} />
          JOB TRACKING
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleGoToDrivers}
        >
          <User size={14} />
          MANAGE DRIVERS
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          onClick={handleNewVehicle}
        >
          <Plus size={14} />
          ADD NEW VEHICLE
        </Button>
      </div>
    </div>
  );
};

export default VehicleManagementHeader;
