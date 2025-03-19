
import React from "react";
import { mockJobs } from "./data/mockJobData";
import PrintJobSchedule from "./components/print/PrintJobSchedule";

const JobSchedulePrint: React.FC = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      <PrintJobSchedule jobs={mockJobs} />
    </div>
  );
};

export default JobSchedulePrint;
