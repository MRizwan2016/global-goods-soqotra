
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "../job-tracking/JobStatusBadge";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobStatusTableProps {
  currentEntries: QatarJob[];
  indexOfFirstEntry: number;
}

const JobStatusTable: React.FC<JobStatusTableProps> = ({
  currentEntries,
  indexOfFirstEntry
}) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Vehicle mapping - maps generic vehicle types to specific vehicle numbers
  const vehicleNumberMapping: Record<string, string> = {
    "CAR": "41067",
    "VAN": "41070",
    "TRUCK": "41073",
    "LORRY": "514005"
  };

  // Function to get vehicle number based on job index or vehicle type
  const getVehicleNumber = (job: QatarJob, index: number) => {
    if (job.vehicle && vehicleNumberMapping[job.vehicle]) {
      return vehicleNumberMapping[job.vehicle];
    }
    
    // Fallback to specific vehicle numbers based on pattern
    const vehicleOptions = ["41067", "41070", "41073", "514005", "119927", "74827"];
    return vehicleOptions[index % vehicleOptions.length];
  };

  // Handle sorting logic
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to display sorting indicator
  const renderSortIcon = (field: string) => {
    return (
      <ArrowUpDown 
        className={`ml-1 h-4 w-4 inline ${sortField === field ? 'opacity-100' : 'opacity-50'}`}
      />
    );
  };

  // Handle view job details
  const handleViewJob = (jobId: string) => {
    console.log("Display button clicked for job:", jobId);
    navigate(`/qatar/job/${jobId}`);
  };

  // Sort entries if needed
  const sortedEntries = [...currentEntries];
  if (sortField) {
    sortedEntries.sort((a, b) => {
      const aValue = a[sortField as keyof QatarJob] || '';
      const bValue = b[sortField as keyof QatarJob] || '';
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="p-2 text-left border border-blue-700">Num</th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('jobNumber')}>
            JOB NUMBER {renderSortIcon('jobNumber')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('date')}>
            JOB DATE {renderSortIcon('date')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('jobType')}>
            JOB TYPE {renderSortIcon('jobType')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('status')}>
            STATUS {renderSortIcon('status')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('sector')}>
            SECTOR {renderSortIcon('sector')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('customer')}>
            CUSTOMER {renderSortIcon('customer')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('mobileNumber')}>
            MOBILE NUMBER {renderSortIcon('mobileNumber')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('town')}>
            TOWN {renderSortIcon('town')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('vehicle')}>
            VEHICLE {renderSortIcon('vehicle')}
          </th>
          <th className="p-2 text-left border border-blue-700 cursor-pointer" onClick={() => handleSort('invoiceNumber')}>
            INVOICE {renderSortIcon('invoiceNumber')}
          </th>
          <th className="p-2 text-left border border-blue-700 print:hidden">DISPLAY</th>
        </tr>
      </thead>
      <tbody>
        {sortedEntries.length > 0 ? (
          sortedEntries.map((job, index) => (
            <tr key={job.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-2 border border-gray-200">{indexOfFirstEntry + index + 1}</td>
              <td className="p-2 border border-gray-200">{job.jobNumber}</td>
              <td className="p-2 border border-gray-200">{job.date}</td>
              <td className="p-2 border border-gray-200">{job.jobType}</td>
              <td className="p-2 border border-gray-200">
                <JobStatusBadge status={job.status} />
              </td>
              <td className="p-2 border border-gray-200">{job.sector}</td>
              <td className="p-2 border border-gray-200">{job.customer}</td>
              <td className="p-2 border border-gray-200">{job.mobileNumber}</td>
              <td className="p-2 border border-gray-200">{job.town}</td>
              <td className="p-2 border border-gray-200">{getVehicleNumber(job, index)}</td>
              <td className="p-2 border border-gray-200">{job.invoiceNumber || "-"}</td>
              <td className="p-2 border border-gray-200 print:hidden">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleViewJob(job.id)}
                >
                  Display
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="p-4 text-center">No jobs found matching your filters</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default JobStatusTable;
