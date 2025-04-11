
import React from "react";
import { QatarJob } from "../../types/jobTypes";
import ScheduleContainer from "./schedule/ScheduleContainer";

interface PrintJobScheduleProps {
  jobs: QatarJob[];
  scheduleData?: any;
  onBack?: () => void;
}

const PrintJobSchedule: React.FC<PrintJobScheduleProps> = ({ 
  jobs = [], 
  scheduleData,
  onBack 
}) => {
  // Add default empty array to prevent null/undefined issues
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  
  return (
    <ScheduleContainer 
      jobs={safeJobs}
      scheduleData={scheduleData || {}}
      onBack={onBack}
    />
  );
};

export default PrintJobSchedule;
