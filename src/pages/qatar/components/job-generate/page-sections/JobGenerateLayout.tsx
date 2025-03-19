
import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import JobScheduleForm from "../job-schedule-form";
import JobSelectionTable from "../JobSelectionTable";

interface JobGenerateLayoutProps {
  scheduleData: any;
  setScheduleData: React.Dispatch<React.SetStateAction<any>>;
  handleScheduleSubmit: (data: any) => void;
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
          />
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <JobSelectionTable 
          jobs={filteredJobs} 
          selectedJobs={selectedJobs}
          onToggleSelect={onToggleSelect}
        />
      </div>
    </div>
  );
};

export default JobGenerateLayout;
