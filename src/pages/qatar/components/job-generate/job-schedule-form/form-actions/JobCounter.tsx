
import React from "react";
import { QatarJob } from "../../../../../types/jobTypes";

interface JobCounterProps {
  selectedJobs: QatarJob[];
}

const JobCounter: React.FC<JobCounterProps> = ({ selectedJobs }) => {
  return (
    <div className="mb-2 text-sm text-gray-600">
      Selected Jobs: <span className="font-bold">{selectedJobs.length}</span>
    </div>
  );
};

export default JobCounter;
