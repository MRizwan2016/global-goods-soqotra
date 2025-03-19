
import React from "react";
import { QatarJob } from "../../../../types/jobTypes";

interface JobItemHeaderProps {
  job: QatarJob & { sequenceNum?: number };
}

const JobItemHeader: React.FC<JobItemHeaderProps> = ({ job }) => {
  return (
    <div className={`p-1 ${job.jobType === 'COLLECTION' ? 'bg-blue-100' : 'bg-green-100'} mb-1`}>
      <span className="font-bold">
        {job.sequenceNum || ''}.{job.jobType} Time: {job.time || "00:00"}{job.amPm}
      </span>
      <span className="ml-4">Job No: <span className="text-blue-700 font-bold">{job.jobNumber}</span></span>
      <span className="ml-4">Contact No: {job.mobileNumber}/ {job.landNumber || '0'}</span>
      <span className="ml-4">Name: {job.customer}</span>
      <span className="ml-4">Amount: {job.advanceAmount?.toFixed(2) || '0.00'}</span>
    </div>
  );
};

export default JobItemHeader;
