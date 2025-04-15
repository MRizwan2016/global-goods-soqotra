
import React from "react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";

interface CancelledJobsTableProps {
  currentEntries: QatarJob[];
  indexOfFirstEntry: number;
}

const CancelledJobsTable: React.FC<CancelledJobsTableProps> = ({
  currentEntries,
  indexOfFirstEntry
}) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="p-2 text-left border border-blue-700">Num</th>
          <th className="p-2 text-left border border-blue-700">JOB NUMBER</th>
          <th className="p-2 text-left border border-blue-700">JOB DATE</th>
          <th className="p-2 text-left border border-blue-700">JOB TYPE</th>
          <th className="p-2 text-left border border-blue-700">SECTOR</th>
          <th className="p-2 text-left border border-blue-700">CUSTOMER</th>
          <th className="p-2 text-left border border-blue-700">MOBILE NUMBER</th>
          <th className="p-2 text-left border border-blue-700">INVOICE</th>
          <th className="p-2 text-left border border-blue-700">REASON</th>
          <th className="p-2 text-left border border-blue-700">CANCELLED BY</th>
          <th className="p-2 text-left border border-blue-700">CANCEL DATE</th>
          <th className="p-2 text-left border border-blue-700 print:hidden">DISPLAY</th>
        </tr>
      </thead>
      <tbody>
        {currentEntries.length > 0 ? (
          currentEntries.map((job, index) => (
            <tr key={job.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-2 border border-gray-200">{indexOfFirstEntry + index + 1}</td>
              <td className="p-2 border border-gray-200">{job.jobNumber}</td>
              <td className="p-2 border border-gray-200">{job.date}</td>
              <td className="p-2 border border-gray-200">{job.jobType}</td>
              <td className="p-2 border border-gray-200">{job.sector}</td>
              <td className="p-2 border border-gray-200">{job.customer}</td>
              <td className="p-2 border border-gray-200">{job.mobileNumber}</td>
              <td className="p-2 border border-gray-200">{job.invoiceNumber || "-"}</td>
              <td className="p-2 border border-gray-200">{job.cancellationReason || "-"}</td>
              <td className="p-2 border border-gray-200">{job.entryBy}</td>
              <td className="p-2 border border-gray-200">{job.cancellationDate || job.date}</td>
              <td className="p-2 border border-gray-200 print:hidden">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => window.open(`/qatar/job/${job.id}`, '_blank')}
                >
                  Display
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="p-4 text-center">No cancelled jobs found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CancelledJobsTable;
