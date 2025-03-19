
import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import VehicleGroupView from "./VehicleGroupView";
import CityGroupView from "./CityGroupView";
import { groupBy } from "lodash";

interface GroupControlPanelProps {
  selectedJobs: QatarJob[];
  showVehicleView: boolean;
  setShowVehicleView: (show: boolean) => void;
  showCityView: boolean;
  setShowCityView: (show: boolean) => void;
  selectedVehicle: string | null;
  setSelectedVehicle: (vehicle: string | null) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
}

const GroupControlPanel: React.FC<GroupControlPanelProps> = ({
  selectedJobs,
  showVehicleView,
  setShowVehicleView,
  showCityView,
  setShowCityView,
  selectedVehicle,
  setSelectedVehicle,
  selectedCity,
  setSelectedCity,
}) => {
  // Group selected jobs by vehicle
  const jobsByVehicle = groupBy(selectedJobs, 'vehicle');
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v); // Filter out empty vehicle values
  
  // Group selected jobs by city
  const jobsByCity = groupBy(selectedJobs, 'city');
  const cityNames = Object.keys(jobsByCity).filter(c => c); // Filter out empty city values

  const toggleVehicleView = () => {
    if (showCityView) setShowCityView(false);
    
    setShowVehicleView(!showVehicleView);
    if (!showVehicleView && vehicleNumbers.length > 0) {
      setSelectedVehicle(vehicleNumbers[0]);
    } else {
      setSelectedVehicle(null);
    }
  };
  
  const toggleCityView = () => {
    if (showVehicleView) setShowVehicleView(false);
    
    setShowCityView(!showCityView);
    if (!showCityView && cityNames.length > 0) {
      setSelectedCity(cityNames[0]);
    } else {
      setSelectedCity(null);
    }
  };

  if (selectedJobs.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center gap-2">
      <VehicleGroupView 
        showVehicleView={showVehicleView}
        toggleVehicleView={toggleVehicleView}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        jobsByVehicle={jobsByVehicle}
        vehicleNumbers={vehicleNumbers}
      />
      
      <CityGroupView 
        showCityView={showCityView}
        toggleCityView={toggleCityView}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        jobsByCity={jobsByCity}
        cityNames={cityNames}
      />
    </div>
  );
};

export default GroupControlPanel;
