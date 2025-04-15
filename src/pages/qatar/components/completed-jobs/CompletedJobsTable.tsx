
import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { QatarJob } from "../../types/jobTypes";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface CompletedJobsTableProps {
  currentEntries: QatarJob[];
  indexOfFirstEntry: number;
}

const CompletedJobsTable: React.FC<CompletedJobsTableProps> = ({ 
  currentEntries, 
  indexOfFirstEntry 
}) => {
  const navigate = useNavigate();

  // Format date to display in readable format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy hh:mm a");
    } catch (e) {
      return dateString;
    }
  };

  // Handle view job details
  const handleViewJob = (jobId: string) => {
    navigate(`/qatar/job/${jobId}`);
  };

  // Show notes dialog
  const showCompletionDetails = (job: QatarJob) => {
    // Implement a more detailed view of completion notes
    // For now, just use an alert
    alert(`Completion Details:\n\nDate: ${formatDate(job.completionDate)}\nNotes: ${job.completionNotes || "No notes provided"}`);
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            <TableHead className="w-14">NUM</TableHead>
            <TableHead className="w-20">JOB NUM</TableHead>
            <TableHead className="w-24">DATE</TableHead>
            <TableHead className="w-24">TYPE</TableHead>
            <TableHead className="w-24">CUSTOMER</TableHead>
            <TableHead className="w-24">LOCATION</TableHead>
            <TableHead className="w-24">VEHICLE</TableHead>
            <TableHead className="w-32">COMPLETION DATE</TableHead>
            <TableHead className="w-24">NOTES</TableHead>
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
                <TableCell>{job.customer}</TableCell>
                <TableCell>{job.location || "-"}</TableCell>
                <TableCell>{job.vehicle}</TableCell>
                <TableCell>
                  {formatDate(job.completionDate)}
                  {job.completionDate && 
                    <Badge className="ml-2 bg-green-500">Completed</Badge>
                  }
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-500"
                    onClick={() => showCompletionDetails(job)}
                    disabled={!job.completionNotes}
                  >
                    <FileText size={18} />
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
              <TableCell colSpan={10} className="h-32 text-center">
                NO COMPLETED JOBS FOUND
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedJobsTable;
