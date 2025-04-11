
import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import { Badge } from "@/components/ui/badge";

interface JobItemProps {
  job: QatarJob;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const {
    jobNumber,
    id,
    sequenceNum,
    consigneeName,
    address,
    contactNumber,
    jobType,
    amount,
    status,
    awbNumber
  } = job;

  const displayJobNumber = jobNumber || id || "N/A";
  
  return (
    <div className="mb-3 p-3 border rounded bg-gray-50 print:bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold text-lg mr-2">{sequenceNum || "-"}.</span>
            <span className="font-bold">
              Job #: <span className="text-black print:text-black">{displayJobNumber}</span>
            </span>
            {awbNumber && (
              <span className="ml-2 text-sm">
                (AWB: {awbNumber})
              </span>
            )}
            <Badge 
              variant={jobType === "Delivery" ? "default" : "secondary"}
              className="ml-2 print:bg-gray-200 print:text-black"
            >
              {jobType || "Unknown"}
            </Badge>
          </div>
          <div className="mt-1">
            <span className="font-medium">{consigneeName || "No Name"}</span>
          </div>
          <div className="text-sm">
            <span>{address || "No Address"}</span>
          </div>
          <div className="text-sm">
            <span>Phone: {contactNumber || "No Contact"}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">
            {amount ? `${Number(amount).toFixed(2)} QAR` : "0.00 QAR"}
          </div>
          <Badge 
            variant={status === "Completed" ? "outline" : "destructive"}
            className={`mt-1 print:border print:border-black ${
              status === "Completed" ? "print:bg-white print:text-black" : "print:bg-gray-200 print:text-black"
            }`}
          >
            {status || "Pending"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
