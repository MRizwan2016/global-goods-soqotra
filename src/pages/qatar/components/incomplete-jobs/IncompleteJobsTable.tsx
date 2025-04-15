
import React, { useState } from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Edit2, XCircle, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "../job-tracking/JobStatusBadge";
import JobCloseDialog from "../job-tracking/JobCloseDialog";
import { JobStorageService } from "../../services/JobStorageService";
import { toast } from "sonner";

interface IncompleteJobsTableProps {
  currentEntries: QatarJob[];
  indexOfFirstEntry: number;
  refreshJobs: () => void;
}

const IncompleteJobsTable: React.FC<IncompleteJobsTableProps> = ({ 
  currentEntries, 
  indexOfFirstEntry,
  refreshJobs 
}) => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<QatarJob | null>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  // Handle view job details
  const handleViewJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };

  // Handle edit job
  const handleEditJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };

  // Handle cancel job
  const handleCancelJob = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCloseDialog(true);
  };
  
  // Handle complete job
  const handleCompleteJob = (job: QatarJob) => {
    try {
      JobStorageService.completeJob(job.id, {
        notes: "Marked as completed from incomplete jobs list"
      });
      toast.success(`Job ${job.jobNumber} marked as completed`);
      refreshJobs(); // Refresh the job list
    } catch (error) {
      toast.error("Failed to complete job");
      console.error("Error completing job:", error);
    }
  };

  // Handle job closed successfully
  const handleJobClosed = () => {
    refreshJobs();
  };

  return (
    <>
      <div className="border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="w-14">NUM</TableHead>
              <TableHead className="w-20">JOB NUM</TableHead>
              <TableHead className="w-24">DATE</TableHead>
              <TableHead className="w-24">TYPE</TableHead>
              <TableHead className="w-24">SECTOR</TableHead>
              <TableHead>CUSTOMER</TableHead>
              <TableHead className="w-24">MOBILE</TableHead>
              <TableHead className="w-24">TOWN</TableHead>
              <TableHead className="w-20">LOCATION</TableHead>
              <TableHead className="w-20">VEHICLE</TableHead>
              <TableHead className="w-20">SCHED. NUM</TableHead>
              <TableHead className="w-16">MODIFY</TableHead>
              <TableHead className="w-16">CANCEL</TableHead>
              <TableHead className="w-16">COMPLETE</TableHead>
              <TableHead className="w-16">DISPLAY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEntries.length > 0 ? (
              currentEntries.map((job, index) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell>{indexOfFirstEntry + index + 1}</TableCell>
                  <TableCell>{job.jobNumber}</TableCell>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>{job.jobType}</TableCell>
                  <TableCell>{job.sector}</TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>{job.mobileNumber}</TableCell>
                  <TableCell>{job.town}</TableCell>
                  <TableCell>{job.location || "-"}</TableCell>
                  <TableCell>{job.vehicle}</TableCell>
                  <TableCell>{job.sequenceNum || "0"}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className="h-8 w-8 p-0 text-blue-500"
                      onClick={() => handleEditJob(job.id)}
                    >
                      <Edit2 size={18} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => handleCancelJob(job)}
                    >
                      <XCircle size={18} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-green-500"
                      onClick={() => handleCompleteJob(job)}
                    >
                      <CheckCircle size={18} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-indigo-500"
                      onClick={() => handleViewJob(job.id)}
                    >
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={15} className="h-32 text-center">
                  NO INCOMPLETE JOBS FOUND
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedJob && (
        <JobCloseDialog
          isOpen={showCloseDialog}
          onClose={() => setShowCloseDialog(false)}
          jobId={selectedJob.id}
          jobNumber={selectedJob.jobNumber}
          onSuccess={handleJobClosed}
        />
      )}
    </>
  );
};

export default IncompleteJobsTable;
