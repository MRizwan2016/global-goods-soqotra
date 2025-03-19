
import React, { useEffect } from "react";
import { QatarJob } from "../../../types/jobTypes";
import { mockVehicles } from "../../../data/mockVehicles";
import { mockSalesReps, mockDrivers, mockHelpers } from "../../../data/mockSalesReps";
import { cityVehicleMapping } from "../../../data/cityVehicleMapping";
import { filterVehicles, extractUniqueCities } from "./utils/vehicleUtils";
import {
  ScheduleNumberField,
  VehicleSelector,
  PersonnelSelector,
  DateSelector,
  CityDisplay
} from "./components";

interface ScheduleFieldsProps {
  formData: any;
  selectedJobs: QatarJob[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
}

const ScheduleFields: React.FC<ScheduleFieldsProps> = ({ 
  formData, 
  selectedJobs,
  handleInputChange, 
  handleSelectChange,
  handleDateChange 
}) => {
  const selectedDate = formData.scheduleDate 
    ? new Date(formData.scheduleDate) 
    : new Date();
    
  // Extract cities from selected jobs
  const uniqueCities = extractUniqueCities(selectedJobs);
  
  // Auto select vehicle based on city
  useEffect(() => {
    if (uniqueCities.length === 1 && !formData.vehicle) {
      const city = uniqueCities[0];
      const recommendedVehicles = cityVehicleMapping[city] || [];
      if (recommendedVehicles.length > 0) {
        handleSelectChange("vehicle", recommendedVehicles[0]);
      }
    }
  }, [uniqueCities, formData.vehicle]);
  
  // Filter vehicles based on cities and job assignments
  const filteredVehicles = filterVehicles(mockVehicles, selectedJobs, uniqueCities);

  return (
    <>
      <ScheduleNumberField 
        value={formData.scheduleNumber}
        onChange={handleInputChange}
      />
      
      <VehicleSelector
        value={formData.vehicle}
        onChange={(value) => handleSelectChange("vehicle", value)}
        filteredVehicles={filteredVehicles}
        uniqueCities={uniqueCities}
        selectedJobs={selectedJobs}
      />
      
      <PersonnelSelector
        label="SALES REP"
        id="salesRep"
        value={formData.salesRep}
        onChange={(value) => handleSelectChange("salesRep", value)}
        options={mockSalesReps}
        placeholder="SELECT SALES REP"
      />
      
      <PersonnelSelector
        label="DRIVER"
        id="driver"
        value={formData.driver}
        onChange={(value) => handleSelectChange("driver", value)}
        options={mockDrivers}
        placeholder="SELECT DRIVER"
      />
      
      <PersonnelSelector
        label="HELPER"
        id="helper"
        value={formData.helper}
        onChange={(value) => handleSelectChange("helper", value)}
        options={mockHelpers}
        placeholder="SELECT HELPER"
      />
      
      <DateSelector
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      
      <CityDisplay uniqueCities={uniqueCities} />
    </>
  );
};

export default ScheduleFields;
