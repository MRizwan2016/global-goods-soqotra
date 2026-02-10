
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Truck, 
  MapPin, 
  User, 
  PhoneCall,
  Calendar,
  Edit,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "./JobStatusBadge";
import JobCloseDialog from "./JobCloseDialog";
import ViewJobModal from "../job-list/components/ViewJobModal";

interface JobTableProps {
  currentEntries: QatarJob[];
  refreshJobs?: () => void;
}

const JobTable = ({ currentEntries, refreshJobs }: JobTableProps) => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<QatarJob | null>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // View job details
  const handleViewJob = (job: QatarJob) => {
    if (job.status === "COMPLETED" || job.status === "CANCELLED") {
      // For completed or cancelled jobs, show modal instead of navigating
      setSelectedJob(job);
      setIsViewModalOpen(true);
    } else {
      // For other jobs, navigate to edit page
      navigate(`/qatar/job/${job.id}`);
    }
  };

  // Open close job dialog
  const handleOpenCloseDialog = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCloseDialog(true);
  };

  // Handle job completion
  const handleCompleteJob = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCloseDialog(true);
  };

  // Handle job cancellation
  const handleCancelJob = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCloseDialog(true);
  };

  // Handle successful job closing
  const handleJobClosed = () => {
    if (refreshJobs) {
      refreshJobs();
    }
  };

  const isJobCompleted = (job: QatarJob) => {
    return job.status === "COMPLETED" || job.status === "CANCELLED";
  };

  return (
    <>
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1e2a3a] hover:bg-[#1e2a3a]">
              <TableHead className="w-24">JOB #</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>CUSTOMER</TableHead>
              <TableHead>CONTACT</TableHead>
              <TableHead>LOCATION</TableHead>
              <TableHead className="w-28">DATE</TableHead>
              <TableHead className="w-24">VEHICLE</TableHead>
              <TableHead className="w-28">STATUS</TableHead>
              <TableHead className="w-48 text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEntries.length > 0 ? (
              currentEntries.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{job.jobNumber}</TableCell>
                  <TableCell>{job.jobType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User size={14} className="mr-1 text-gray-500" />
                      {job.customer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <PhoneCall size={14} className="mr-1 text-gray-500" />
                      {job.mobileNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1 text-gray-500" />
                      {job.town}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" />
                      {job.date}
                    </div>
                  </TableCell>
                  <TableCell>{job.vehicle}</TableCell>
                  <TableCell><JobStatusBadge status={job.status} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {isJobCompleted(job) ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleViewJob(job)}
                        >
                          <Eye size={12} className="mr-1" />
                          VIEW
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleViewJob(job)}
                        >
                          <Edit size={12} className="mr-1" />
                          EDIT
                        </Button>
                      )}
                      
                      {!isJobCompleted(job) && (
                        <>
                          <Button 
                            size="sm"
                            className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700"
                            onClick={() => handleCompleteJob(job)}
                          >
                            <CheckCircle size={12} className="mr-1" />
                            COMPLETE
                          </Button>
                          
                          <Button 
                            size="sm"
                            className="h-7 px-2 text-xs bg-red-600 hover:bg-red-700"
                            onClick={() => handleCancelJob(job)}
                          >
                            <XCircle size={12} className="mr-1" />
                            CANCEL
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                  NO JOB RECORDS FOUND
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedJob && (
        <>
          <JobCloseDialog
            isOpen={showCloseDialog}
            onClose={() => setShowCloseDialog(false)}
            jobId={selectedJob.id}
            jobNumber={selectedJob.jobNumber}
            onSuccess={handleJobClosed}
          />
          
          <ViewJobModal
            isOpen={isViewModalOpen}
            job={selectedJob}
            onClose={() => {
              setIsViewModalOpen(false);
              setSelectedJob(null);
            }}
          />
        </>
      )}
    </>
  );
};

export default JobTable;
