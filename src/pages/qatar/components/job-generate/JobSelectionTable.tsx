
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "../job-tracking/JobStatusBadge";
import { formatCurrency } from "../../utils/formatters";

interface JobSelectionTableProps {
  jobs: QatarJob[];
  selectedJobs: QatarJob[];
  onToggleSelect: (job: QatarJob) => void;
}

const JobSelectionTable: React.FC<JobSelectionTableProps> = ({
  jobs,
  selectedJobs,
  onToggleSelect,
}) => {
  // Determine if a job is selected
  const isSelected = (job: QatarJob) => {
    return selectedJobs.some((j) => j.id === job.id);
  };

  return (
    <div className="border rounded-md shadow-sm bg-white">
      <div className="p-3 border-b bg-gray-50">
        <h2 className="font-bold text-lg">Select Jobs for Schedule</h2>
        <p className="text-sm text-gray-500">
          {selectedJobs.length} jobs selected - Showing {jobs.length} jobs
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-32 font-bold text-blue-700">Job #</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className={`${
                    isSelected(job) ? "bg-blue-50" : ""
                  } hover:bg-gray-50 cursor-pointer`}
                  onClick={() => onToggleSelect(job)}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected(job)}
                      onCheckedChange={() => onToggleSelect(job)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="font-bold text-blue-600">{job.jobNumber}</TableCell>
                  <TableCell>{job.jobType}</TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>{job.town}</TableCell>
                  <TableCell>
                    {job.date} {job.time}{job.amPm}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(job.advanceAmount || 0)}
                  </TableCell>
                  <TableCell>
                    <JobStatusBadge status={job.status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No jobs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobSelectionTable;
