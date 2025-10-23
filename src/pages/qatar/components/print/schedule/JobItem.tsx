
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
    customer, 
    location, 
    mobileNumber, 
    jobType,
    advanceAmount, 
    status,
    invoiceNumber,
    items = [],
    packageDetails,
    remarks
  } = job;

  const displayJobNumber = jobNumber || id || "N/A";
  
  // Format currency to always show 2 decimal places
  const formattedAmount = advanceAmount !== undefined && advanceAmount !== null
    ? `${Number(advanceAmount).toFixed(2)} QAR`
    : "0.00 QAR";
  
  return (
    <div className="mb-3 p-3 border rounded bg-gray-50 print:bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold text-lg mr-2">{sequenceNum || "-"}.</span>
            <span className="font-bold">
              Job #: <span className="text-black print:text-black">{displayJobNumber}</span>
            </span>
            {invoiceNumber && (
              <span className="ml-2 text-sm">
                (AWB: {invoiceNumber})
              </span>
            )}
            <Badge 
              variant={jobType === "DELIVERY" ? "default" : "secondary"}
              className="ml-2 print:bg-gray-200 print:text-black"
            >
              {jobType || "Unknown"}
            </Badge>
          </div>
          <div className="mt-1">
            <span className="font-medium">{customer || "No Name"}</span>
          </div>
          <div className="text-sm">
            <span>{location || "No Address"}</span>
          </div>
          <div className="text-sm">
            <span>Phone: {mobileNumber || "No Contact"}</span>
          </div>
          
          {/* Package Details Section */}
          {packageDetails && (
            <div className="text-sm mt-1">
              <span className="font-medium">Package: </span>
              <span>{packageDetails}</span>
            </div>
          )}
          
          {/* Items Section */}
          {items && items.length > 0 && (
            <div className="text-sm mt-1">
              <span className="font-medium">Items: </span>
              {items.map((item, index) => (
                <span key={index} className="mr-2">
                  {item.itemName || item.name}: {item.quantity}
                  {index < items.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          )}
          
          {/* Remarks Section */}
          {remarks && (
            <div className="text-sm mt-1">
              <span className="font-medium">Remarks: </span>
              <span>{remarks}</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="font-semibold">
            {formattedAmount}
          </div>
          <Badge 
            variant={status === "COMPLETED" ? "outline" : "destructive"}
            className={`mt-1 print:border print:border-black ${
              status === "COMPLETED" ? "print:bg-white print:text-black" : "print:bg-gray-200 print:text-black"
            }`}
          >
            {status || "PENDING"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
