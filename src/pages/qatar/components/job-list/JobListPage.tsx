
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, RefreshCcw, File, Edit, Eye, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobTracking } from "../job-tracking/useJobTracking";
import { JobStorageService } from "../../services/JobStorageService";
import { QatarJob } from "../../types/jobTypes";
import usePrintReport from "../../hooks/usePrintReport";

interface JobListPageProps {
  title?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  headerClassName?: string;
  reportTitle?: string;
  jobs?: any[];
  sectors?: string[];
  initialStatus?: string;
  showVehicleFilter?: boolean;
  showJobTypeFilter?: boolean;
  extraFilters?: React.ReactNode;
  renderTable: ({ currentEntries, indexOfFirstEntry }: { currentEntries: any[]; indexOfFirstEntry: number }) => React.ReactNode;
  refreshJobs?: () => void;
}

const JobListPage: React.FC<JobListPageProps> = ({
  title = "Job List",
  headerTitle = "VIEW JOB LIST",
  headerSubtitle = "Record Listed.",
  headerClassName = "",
  reportTitle = "JOB REPORT",
  jobs = [],
  sectors = [],
  initialStatus = "all",
  showVehicleFilter = false,
  showJobTypeFilter = false,
  extraFilters,
  renderTable,
  refreshJobs
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = usePrintReport(printRef, { documentTitle: reportTitle });
  const navigate = useNavigate();
  const {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredJobs,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries
  } = useJobTracking(jobs, initialStatus);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedJob, setSelectedJob] = useState<QatarJob | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDeleteConfirmation = (jobId: string) => {
    setJobToDelete(jobId);
  };

  const handleDelete = () => {
    if (jobToDelete) {
      try {
        JobStorageService.deleteJob(jobToDelete);
        toast.success("Job deleted successfully!");
        setJobToDelete(null); // Clear the job to delete
        // Refresh the job list by resetting the search text
        setSearchText(searchText);
        if (refreshJobs) refreshJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job.");
      }
    }
  };

  const handleCancelDelete = () => {
    setJobToDelete(null); // Clear the job to delete
  };

  const handleCancellationConfirmation = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCancellationDialog(true);
  };

  const handleCancelJob = async () => {
    if (selectedJob) {
      try {
        // Update job status to "CANCELLED" and add cancellation reason
        const updatedJob = { ...selectedJob, status: "CANCELLED", cancellationReason: cancellationReason, cancellationDate: new Date().toLocaleDateString() };
        JobStorageService.updateJob(updatedJob);
        toast.success("Job cancelled successfully!");
        setShowCancellationDialog(false);
        setCancellationReason("");
        setSelectedJob(null);
        // Refresh the job list by resetting the search text
        setSearchText(searchText);
        if (refreshJobs) refreshJobs();
      } catch (error) {
        console.error("Error cancelling job:", error);
        toast.error("Failed to cancel job.");
      }
    }
  };

  const handleCloseCancellationDialog = () => {
    setShowCancellationDialog(false);
    setCancellationReason("");
    setSelectedJob(null);
  };

  const handleViewJob = (job: QatarJob) => {
    setSelectedJob(job);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedJob(null);
  };

  // Handler for the print button click that wraps the handlePrint function
  const handlePrintButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlePrint();
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={() => navigate("/qatar/new")} className="bg-blue-600 hover:bg-blue-700 text-white">
          Create New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Job Number, Customer, Mobile, or Town..."
          value={searchText}
          onChange={handleSearch}
        />

        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={handleTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="COLLECTION">Collection</SelectItem>
            <SelectItem value="DELIVERY">Delivery</SelectItem>
            <SelectItem value="PACKING">Packing</SelectItem>
            <SelectItem value="UNPACKING">Unpacking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto" ref={printRef}>
        {renderTable({ currentEntries, indexOfFirstEntry })}
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {indexOfFirstEntry + 1} to {indexOfLastEntry > filteredJobs.length ? filteredJobs.length : indexOfLastEntry} of {filteredJobs.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <Button 
          onClick={handlePrintButtonClick} 
          className="bg-gray-700 hover:bg-gray-800 text-white"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Job List
        </Button>
      </div>

      {/* Cancellation Confirmation Dialog */}
      <AlertDialog open={showCancellationDialog} onOpenChange={setShowCancellationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this job? Please provide a reason for cancellation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="reason">Cancellation Reason</Label>
            <Textarea
              id="reason"
              placeholder="Reason for cancellation"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseCancellationDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelJob}>Confirm Cancellation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Job Modal */}
      {selectedJob && (
        <div
          className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 ${isViewModalOpen ? 'block' : 'none'}`}
        >
          <div className="relative w-full max-w-md p-4 mx-auto mt-20">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Job Details</h2>
                <Button onClick={handleCloseViewModal} variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Job Number:</Label>
                  <p>{selectedJob.jobNumber}</p>
                </div>
                <div>
                  <Label>Customer:</Label>
                  <p>{selectedJob.customer}</p>
                </div>
                <div>
                  <Label>Mobile Number:</Label>
                  <p>{selectedJob.mobileNumber}</p>
                </div>
                <div>
                  <Label>Job Type:</Label>
                  <p>{selectedJob.jobType}</p>
                </div>
                <div>
                  <Label>Date:</Label>
                  <p>{selectedJob.date}</p>
                </div>
                <div>
                  <Label>Time:</Label>
                  <p>{selectedJob.time} {selectedJob.amPm}</p>
                </div>
                <div>
                  <Label>Status:</Label>
                  <p>{selectedJob.status}</p>
                </div>
                {selectedJob.cancellationReason && (
                  <div>
                    <Label>Cancellation Reason:</Label>
                    <p>{selectedJob.cancellationReason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
