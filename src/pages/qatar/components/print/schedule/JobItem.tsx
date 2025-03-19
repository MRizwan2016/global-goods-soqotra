
import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import { formatCurrency } from "../../../utils/formatters";
import JobItemHeader from "./components/JobItemHeader";
import JobItemDetails from "./components/JobItemDetails";

interface JobItemProps {
  job: QatarJob & { sequenceNum?: number };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  // Format the job data before passing to child components
  const jobWithFormattedAmount = {
    ...job,
    advanceAmount: job.advanceAmount 
      ? parseFloat(formatCurrency(job.advanceAmount).replace('QAR ', '')) 
      : 0
  };
  
  return (
    <div className="mb-4 border-b border-gray-300 pb-2">
      <JobItemHeader job={jobWithFormattedAmount} />
      <JobItemDetails job={jobWithFormattedAmount} />
    </div>
  );
};

export default JobItem;
