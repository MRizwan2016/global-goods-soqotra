
import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import { formatCurrency } from "../../../utils/formatters";

interface JobItemProps {
  job: QatarJob & { sequenceNum?: number };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  return (
    <div className="mb-4 border-b border-gray-300 pb-2">
      <div className={`p-1 ${job.jobType === 'COLLECTION' ? 'bg-blue-100' : 'bg-green-100'} mb-1`}>
        <span className="font-bold">{job.sequenceNum || ''}.{job.jobType} Time: {job.time || "00:00"}{job.amPm}</span>
        <span className="ml-4">Job No: <span className="text-blue-700 font-bold">{job.jobNumber}</span></span>
        <span className="ml-4">Contact No: {job.mobileNumber}/ {job.landNumber || '0'}</span>
        <span className="ml-4">Name: {job.customer}</span>
        <span className="ml-4">Amount: {formatCurrency(job.advanceAmount || 0).replace('QAR ', '')}</span>
      </div>
      <div className="pl-2 text-sm">
        <div><span className="font-bold">Location:</span> {job.city}-{job.town}-{job.location}</div>
        <div><span className="font-bold">Remarks:</span> {job.remarks || '-'}</div>
        <div>
          <span className="font-bold">Description:</span>{" "}
          {job.items && job.items.length > 0
            ? job.items.map((item, i) => (
                <span key={i}>
                  {item.itemName}: {item.quantity}
                  {i < job.items!.length - 1 ? ", " : ""}
                </span>
              ))
            : "-"}
        </div>
      </div>
    </div>
  );
};

export default JobItem;
