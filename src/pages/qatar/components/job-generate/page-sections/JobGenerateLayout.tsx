
import React, { useState } from "react";
import { QatarJob } from "../../../types/jobTypes";
import JobScheduleForm from "../job-schedule-form";
import JobSelectionTable from "../JobSelectionTable";
import { JobScheduleFormData } from "../job-schedule-form/types";

interface JobGenerateLayoutProps {
  scheduleData: JobScheduleFormData;
  setScheduleData: React.Dispatch<React.SetStateAction<JobScheduleFormData>>;
  handleScheduleSubmit: (data: JobScheduleFormData) => void;
  jobsForSchedule: QatarJob[];
  filteredJobs: QatarJob[];
  selectedJobs: QatarJob[];
  onToggleSelect: (job: QatarJob) => void;
  disabled: boolean;
}

const JobGenerateLayout: React.FC<JobGenerateLayoutProps> = ({
  scheduleData,
  setScheduleData,
  handleScheduleSubmit,
  jobsForSchedule,
  filteredJobs,
  selectedJobs,
  onToggleSelect,
  disabled
}) => {
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState<string | undefined>(scheduleData.vehicle || undefined);
  
  // Handle vehicle change from the form
  const handleVehicleChange = (vehicle: string) => {
    setSelectedVehicleNumber(vehicle);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 animate-fade-in">
      <div className="lg:col-span-1">
        <div className="sticky top-4 transition-all duration-300">
          <JobScheduleForm 
            onSubmit={handleScheduleSubmit} 
            formData={scheduleData}
            setFormData={setScheduleData}
            selectedJobs={jobsForSchedule}
            disabled={disabled}
            onVehicleChange={handleVehicleChange}
          />
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <JobSelectionTable 
          jobs={filteredJobs} 
          selectedJobs={selectedJobs}
          onToggleSelect={onToggleSelect}
          selectedVehicleNumber={selectedVehicleNumber}
        />
      </div>
    </div>
  );
};

export default JobGenerateLayout;
