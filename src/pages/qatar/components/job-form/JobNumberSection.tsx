
import React from "react";
import { useJobForm } from "./context/JobFormContext";
import JobFormHeader from "./JobFormHeader";

const JobNumberSection: React.FC = () => {
  const { isNewJob = true } = useJobForm();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB INFORMATION</h3>
      <JobFormHeader isNewJob={isNewJob} />
    </div>
  );
};

export default JobNumberSection;
