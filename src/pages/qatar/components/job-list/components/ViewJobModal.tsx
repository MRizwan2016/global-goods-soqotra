
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QatarJob } from "../../../types/jobTypes";

interface ViewJobModalProps {
  isOpen: boolean;
  job: QatarJob;
  onClose: () => void;
}

const ViewJobModal: React.FC<ViewJobModalProps> = ({ isOpen, job, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4 mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Job Details</h2>
            <Button onClick={onClose} variant="ghost" className="h-8 w-8 p-0">
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
              <p>{job.jobNumber}</p>
            </div>
            <div>
              <Label>Customer:</Label>
              <p>{job.customer}</p>
            </div>
            <div>
              <Label>Mobile Number:</Label>
              <p>{job.mobileNumber}</p>
            </div>
            <div>
              <Label>Job Type:</Label>
              <p>{job.jobType}</p>
            </div>
            <div>
              <Label>Date:</Label>
              <p>{job.date}</p>
            </div>
            <div>
              <Label>Time:</Label>
              <p>{job.time} {job.amPm}</p>
            </div>
            <div>
              <Label>Status:</Label>
              <p>{job.status}</p>
            </div>
            {job.cancellationReason && (
              <div>
                <Label>Cancellation Reason:</Label>
                <p>{job.cancellationReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;
