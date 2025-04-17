
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import JobHeader from "./JobHeader";
import JobNumberSection from "./JobNumberSection";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import JobFormActions from "./JobFormActions";

interface JobFormProps {
  isNewJob?: boolean;
  jobId?: string;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ isNewJob = true, jobId, onSubmit, isSaving = false }) => {
  return (
    <JobFormProvider
      isNewJob={isNewJob}
      jobId={jobId}
      onSubmit={onSubmit}
      isSaving={isSaving}
    >
      <form id="job-form" className="max-w-5xl mx-auto p-4">
        <JobHeader />
        <div className="space-y-6 mt-6">
          <JobNumberSection isNewJob={isNewJob} />
          <JobDetailsSection />
          <CustomerInfoSection />
        </div>
        <JobFormActions isNewJob={isNewJob} onSubmit={onSubmit} />
      </form>
    </JobFormProvider>
  );
};

export default JobForm;
