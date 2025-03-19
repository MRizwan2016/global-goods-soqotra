
import React, { RefObject } from "react";
import { QatarJob } from "../../../../types/jobTypes";
import PrintHeader from "../../schedule/PrintHeader";
import ScheduleInfo from "../../schedule/ScheduleInfo";
import JobItem from "../../schedule/JobItem";
import JobSummary from "../../schedule/JobSummary";
import { useJobSummaryCalculations } from "../../schedule/useJobSummaryCalculations";
import { useUserInfo } from "../../schedule/useUserInfo";

interface ScheduleContentProps {
  jobs: QatarJob[];
  scheduleData?: any;
  printRef: RefObject<HTMLDivElement>;
}

const ScheduleContent: React.FC<ScheduleContentProps> = ({ 
  jobs, 
  scheduleData,
  printRef 
}) => {
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
  );
};

export default ScheduleContent;
