
import React, { useRef } from "react";
import { QatarJob } from "../../types/jobTypes";
import PrintControls from "./PrintControls";
import PrintStyles from "./PrintStyles";
import { useNavigate } from "react-router-dom";
import PrintHeader from "./schedule/PrintHeader";
import ScheduleInfo from "./schedule/ScheduleInfo";
import JobItem from "./schedule/JobItem";
import JobSummary from "./schedule/JobSummary";
import { useJobSummaryCalculations } from "./schedule/useJobSummaryCalculations";
import { useUserInfo } from "./schedule/useUserInfo";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    // Validate required fields
    if (!scheduleData?.vehicle) {
      toast.warning("Vehicle information is missing");
    }
    if (!scheduleData?.driver) {
      toast.warning("Driver information is missing");
    }
    if (!scheduleData?.salesRep) {
      toast.warning("Sales Rep information is missing");
    }
    window.print();
  };
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/qatar/jobs");
    }
  };

  // Use our custom hooks for calculations and user info
  const {
    deliveryCount,
    collectionCount,
    totalCollectionAmount,
    totalDeliveryAmount,
    totalAmount,
    itemCounts
  } = useJobSummaryCalculations(jobs);
  
  const { userName, formattedDate, formattedTime } = useUserInfo();
  
  return (
    <div className="min-h-screen bg-white">
      <PrintStyles />
      
      <PrintControls 
        handleBack={handleBack}
        handlePrint={handlePrint}
        title="JOB SCHEDULE PRINT"
      />
      
      <div className="p-4 w-full max-w-[1200px] mx-auto" ref={printRef}>
        <div className="bg-white p-6 shadow-md">
          {/* Header */}
          <PrintHeader 
            scheduleNumber={scheduleData?.scheduleNumber || "5352"}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
            userName={userName}
          />

          {/* Schedule Info */}
          <ScheduleInfo scheduleData={scheduleData} />

          {/* Job Details */}
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))
          ) : (
            <div className="p-4 text-center border my-4">
              <p className="text-gray-500">No jobs selected for this schedule</p>
            </div>
          )}

          {/* Summary Stats */}
          <JobSummary
            jobs={jobs}
            deliveryCount={deliveryCount}
            collectionCount={collectionCount}
            totalDeliveryAmount={totalDeliveryAmount}
            totalCollectionAmount={totalCollectionAmount}
            totalAmount={totalAmount}
            itemCounts={itemCounts}
          />
          
          <div className="text-right text-xs mt-4">Page 1/1</div>
        </div>
      </div>
    </div>
  );
};

export default PrintJobSchedule;
