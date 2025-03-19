
import React from "react";

interface ScheduleInfoProps {
  scheduleData: {
    scheduleNumber?: string;
    scheduleDate?: string;
    vehicle?: string;
    salesRep?: string;
    driver?: string;
  };
}

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({ scheduleData }) => {
  return (
    <div className="border border-gray-300 mb-6">
      <div className="bg-blue-600 text-white text-center py-1 font-bold">
        JOB SCHEDULE
      </div>
      <div className="grid grid-cols-3 text-sm">
        <div className="border-r border-gray-300 p-2">
          <div><span className="font-bold">SCHED. Num:</span> {scheduleData?.scheduleNumber || "5352"}</div>
          <div><span className="font-bold">DATE:</span> {scheduleData?.scheduleDate ? new Date(scheduleData.scheduleDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}</div>
        </div>
        <div className="border-r border-gray-300 p-2">
          <div><span className="font-bold">VEHICLE:</span> {scheduleData?.vehicle || ""}</div>
          <div><span className="font-bold">SALES REP:</span> {scheduleData?.salesRep || ""}</div>
        </div>
        <div className="p-2">
          <div><span className="font-bold">DRIVER:</span> {scheduleData?.driver || ""}</div>
          <div><span className="font-bold">SALES REP 2:</span></div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInfo;
