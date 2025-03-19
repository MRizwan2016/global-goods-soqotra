
import React, { useRef } from "react";
import { QatarJob } from "../../../types/jobTypes";
import PrintStyles from "../PrintStyles";
import { PrintScheduleControls, ScheduleContent, validateScheduleData } from "./components";

interface ScheduleContainerProps {
  jobs: QatarJob[];
  scheduleData?: any;
  onBack?: () => void;
}

const ScheduleContainer: React.FC<ScheduleContainerProps> = ({
  jobs,
  scheduleData,
  onBack
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/qatar/jobs";
    }
  };
  
  const handlePrint = () => {
    // Validate the schedule data before printing
    if (validateScheduleData(scheduleData)) {
      window.print();
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <PrintStyles />
      
      <PrintScheduleControls 
        handleBack={handleBack}
        handlePrint={handlePrint}
      />
      
      <ScheduleContent 
        jobs={jobs}
        scheduleData={scheduleData}
        printRef={printRef}
      />
    </div>
  );
};

export default ScheduleContainer;
