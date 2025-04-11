
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
  LockKeyhole,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QatarJob } from "../../types/jobTypes";
import JobStatusBadge from "./JobStatusBadge";
import JobCloseDialog from "./JobCloseDialog";

interface JobTableProps {
  currentEntries: QatarJob[];
  refreshJobs?: () => void;
}

const JobTable = ({ currentEntries, refreshJobs }: JobTableProps) => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<QatarJob | null>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  // View job details
  const handleViewJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };

  // Open close job dialog
  const handleOpenCloseDialog = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCloseDialog(true);
  };

  // Handle successful job closing
  const handleJobClosed = () => {
    if (refreshJobs) {
      refreshJobs();
    }
  };

  return (
    <>
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
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
                      {job.customer === "--" ? "Unnamed" : job.customer}
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 px-2 text-xs"
                        onClick={() => handleViewJob(job.id)}
                      >
                        <Edit size={12} className="mr-1" />
                        EDIT
                      </Button>
                      
                      {job.status !== "COMPLETED" && (
                        <Button 
                          size="sm"
                          className="h-7 px-2 text-xs bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover-scale transition-all duration-300"
                          onClick={() => handleOpenCloseDialog(job)}
                        >
                          <LockKeyhole size={12} className="mr-1" />
                          JOB CLOSE
                        </Button>
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

export default JobTable;
