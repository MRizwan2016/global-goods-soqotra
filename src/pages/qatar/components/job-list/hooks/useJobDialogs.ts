
import { useState } from "react";
import { QatarJob } from "../../../types/jobTypes";

export const useJobDialogs = (refreshJobs?: () => void) => {
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedJob, setSelectedJob] = useState<QatarJob | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleDeleteConfirmation = (jobId: string) => {
    setJobToDelete(jobId);
  };

  const handleCancelDelete = () => {
    setJobToDelete(null);
  };

  const handleCancellationConfirmation = (job: QatarJob) => {
    setSelectedJob(job);
    setShowCancellationDialog(true);
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

  return {
    jobToDelete,
    showCancellationDialog,
    cancellationReason,
    selectedJob,
    isViewModalOpen,
    setJobToDelete,
    setCancellationReason,
    handleDeleteConfirmation,
    handleCancelDelete,
    handleCancellationConfirmation,
    handleCloseCancellationDialog,
    handleViewJob,
    handleCloseViewModal
  };
};
