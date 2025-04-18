
import React, { useEffect } from "react";
import { mockVehicles } from "../../../data/mockVehicles";
import { mockSalesReps, mockDrivers, mockHelpers } from "../../../data/mockSalesReps";
import { cityVehicleMapping } from "../../../data/cityVehicleMapping";
import { filterVehicles, extractUniqueCities } from "./utils/vehicleUtils";
import { ScheduleFieldsProps } from "./types";
import {
  ScheduleNumberField,
  VehicleSelector,
  PersonnelSelector,
  DateSelector,
  CityDisplay
} from "./components";

// Vehicle type to number mapping
const vehicleNumberMap: { [key: string]: string } = {
  "CAR": "41070",
  "TRUCK": "41067",
  "VAN": "41073",
  "PICKUP": "514005",
  "LORRY": "119927",
  "HIACE": "74827"
};

const ScheduleFields: React.FC<ScheduleFieldsProps> = ({ 
  formData, 
  selectedJobs,
  handleInputChange, 
  handleSelectChange,
  handleDateChange,
  onVehicleChange 
}) => {
  // Extract cities and vehicle types from selected jobs
  const uniqueCities = extractUniqueCities(selectedJobs);
  const selectedVehicleTypes = [...new Set(selectedJobs.map(job => job.vehicle))];
  
  // Auto select vehicle based on selected jobs
  useEffect(() => {
    if (selectedJobs.length > 0 && !formData.vehicle) {
      // If all selected jobs have the same vehicle type, use its corresponding number
      if (selectedVehicleTypes.length === 1 && selectedVehicleTypes[0]) {
        const vehicleType = selectedVehicleTypes[0].toUpperCase();
        const recommendedVehicleNumber = vehicleNumberMap[vehicleType];
        if (recommendedVehicleNumber) {
          handleSelectChange("vehicle", recommendedVehicleNumber);
          if (onVehicleChange) onVehicleChange(recommendedVehicleNumber);
        }
      }
    }
  }, [selectedJobs, formData.vehicle]);

  // Filter vehicles based on vehicle types from selected jobs
  const filteredVehicles = filterVehicles(mockVehicles, selectedJobs, uniqueCities);

  // Handle vehicle change with notification
  const handleVehicleChange = (value: string) => {
    handleSelectChange("vehicle", value);
    if (onVehicleChange) onVehicleChange(value);
  };
  
  return (
    <>
      <ScheduleNumberField 
        value={formData.scheduleNumber}
        onChange={handleInputChange}
        readonly={true}
      />
      
      <VehicleSelector
        value={formData.vehicle}
        onChange={handleVehicleChange}
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
        selectedDate={formData.scheduleDate}
        onDateChange={(date) => handleDateChange(date)}
      />
      
      <CityDisplay uniqueCities={uniqueCities} />
    </>
  );
};

export default ScheduleFields;
