
import React from "react";
import { mockJobs } from "./data/mockJobData";
import PrintJobSchedule from "./components/print/PrintJobSchedule";

const JobSchedulePrint: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PrintJobSchedule jobs={mockJobs} />
    </div>
  );
};

export default JobSchedulePrint;
