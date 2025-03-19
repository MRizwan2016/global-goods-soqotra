
import React from "react";
import { QatarJob } from "../../types/jobTypes";
import ScheduleContainer from "./schedule/ScheduleContainer";

interface PrintJobScheduleProps {
  jobs: QatarJob[];
  scheduleData?: any;
  onBack?: () => void;
}

const PrintJobSchedule: React.FC<PrintJobScheduleProps> = ({ 
  jobs, 
  scheduleData,
  onBack 
}) => {
  return (
    <ScheduleContainer 
      jobs={jobs}
      scheduleData={scheduleData}
      onBack={onBack}
    />
  );
};

export default PrintJobSchedule;
