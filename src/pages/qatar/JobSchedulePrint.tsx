
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import { groupBy } from "lodash";
import { QatarJob } from "./types/jobTypes";
import { useSchedulePrintForm } from "./hooks/useSchedulePrintForm";
import ViewModeToggle from "./components/schedule-print/ViewModeToggle";
import VehicleSelection from "./components/schedule-print/VehicleSelection";
import CitySelection from "./components/schedule-print/CitySelection";
import ScheduleForm from "./components/schedule-print/ScheduleForm";
import { JobStorageService } from "./services/JobStorageService";

const JobSchedulePrint: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState<QatarJob[]>([]);
  
  // Load jobs from storage
  useEffect(() => {
    try {
      const jobs = JobStorageService.getAllJobs();
      setAllJobs(jobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
      setAllJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Group jobs by vehicle and city
  const jobsByVehicle = groupBy(allJobs, 'vehicle');
  const jobsByCity = groupBy(allJobs, 'city');
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v);
  
  // State for selection modes
  const [viewMode, setViewMode] = useState<'vehicle' | 'city'>('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    vehicleNumbers.length > 0 ? vehicleNumbers[0] : null
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    Object.keys(jobsByCity).length > 0 ? Object.keys(jobsByCity)[0] : null
  );

  // Get jobs for the selected vehicle or city
  const selectedJobs = viewMode === 'vehicle' && selectedVehicle 
    ? jobsByVehicle[selectedVehicle] || []
    : viewMode === 'city' && selectedCity
      ? jobsByCity[selectedCity] || []
      : [];
  
  // Add sequence numbers to jobs
  const jobsWithSequence = selectedJobs.map((job, index) => ({
    ...job,
    sequenceNum: index + 1
  }));

  // Use custom hook for form handling
  const {
    formData,
    handleFormChange,
    handleSelectChange,
    handlePrint,
  } = useSchedulePrintForm(
    viewMode === 'vehicle' ? selectedVehicle : null,
    viewMode === 'city' ? selectedCity : null
  );

  if (isLoading) {
    return <div className="p-8 text-center">Loading jobs...</div>;
  }

  return (
    <div className="min-h-screen bg-white w-full print-container">
      <div className="p-4 no-print">
        <h2 className="text-xl font-bold mb-4">Job Schedule Print</h2>
        
        {/* View toggle */}
        <ViewModeToggle 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
        />
        
        {/* Vehicle Selection */}
        {viewMode === 'vehicle' && (
          <VehicleSelection
            jobsByVehicle={jobsByVehicle}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />
        )}
        
        {/* City Selection */}
        {viewMode === 'city' && (
          <CitySelection
            jobsByCity={jobsByCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        )}

        {/* Schedule Information Form */}
        <ScheduleForm
          formData={formData}
          handleFormChange={handleFormChange}
          handleSelectChange={handleSelectChange}
          handlePrint={handlePrint}
          vehicleNumbers={vehicleNumbers}
        />
      </div>

      {(selectedVehicle || selectedCity) ? (
        <PrintJobSchedule 
          jobs={jobsWithSequence} 
          scheduleData={formData}
        />
      ) : (
        <div className="p-8 text-center">
          <p>Select a {viewMode === 'vehicle' ? 'vehicle' : 'city'} to generate a job schedule</p>
        </div>
      )}
    </div>
  );
};

export default JobSchedulePrint;
