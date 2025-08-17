
import React from "react";
import { useJobForm } from "./context/JobFormContext";
import JobFormHeader from "./JobFormHeader";

interface JobNumberSectionProps {
  isNewJob?: boolean;
}

const JobNumberSection: React.FC<JobNumberSectionProps> = ({ isNewJob = true }) => {
  // This component should only be used within JobFormProvider context
  // If used standalone, it will cause context errors
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB INFORMATION</h3>
      <JobFormHeader isNewJob={isNewJob} />
    </div>
  );
};

export default JobNumberSection;
