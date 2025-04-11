
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
  jobs = [],
  scheduleData = {},
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
  
  const handlePrint = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("Print triggered, schedule data:", scheduleData);
    console.log("Jobs to print:", jobs);
    
    // Always allow printing even if data validation fails
    try {
      validateScheduleData(scheduleData);
      window.print();
    } catch (error) {
      console.warn("Print proceeded with validation warnings:", error);
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
