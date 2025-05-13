
import React from "react";
import { useJobForm } from "./context/JobFormContext";
import JobTypeSelector from "./details/JobTypeSelector";
import DateTimeSelector from "./details/DateTimeSelector";
import LocationSelector from "./details/LocationSelector";
import CitySelector from "./details/CitySelector";
import VehicleSelector from "./details/VehicleSelector";
import AdvanceAmount from "./details/AdvanceAmount";

const JobDetailsSection: React.FC = () => {
  const { readOnly } = useJobForm();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB DETAILS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobTypeSelector />
        <DateTimeSelector />
        <LocationSelector />
        <CitySelector />
        <VehicleSelector />
        <AdvanceAmount />
      </div>
    </div>
  );
};

export default JobDetailsSection;
