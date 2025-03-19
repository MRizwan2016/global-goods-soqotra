
import React from "react";
import CompanyLogo from "./components/CompanyLogo";
import CompanyTitle from "./components/CompanyTitle";
import ScheduleTitle from "./components/ScheduleTitle";
import PrintTimestamp from "./components/PrintTimestamp";

interface PrintHeaderProps {
  scheduleNumber: string;
  formattedDate: string;
  formattedTime: string;
  userName: string;
}

const PrintHeader: React.FC<PrintHeaderProps> = ({ 
  scheduleNumber, 
  formattedDate, 
  formattedTime, 
  userName 
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <CompanyLogo />
        <CompanyTitle />
      </div>
      <ScheduleTitle scheduleNumber={scheduleNumber} />
      <PrintTimestamp 
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        userName={userName}
      />
    </div>
  );
};

export default PrintHeader;
