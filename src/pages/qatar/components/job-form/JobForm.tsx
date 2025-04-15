
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import JobHeader from "./JobHeader";
import JobNumberSection from "./JobNumberSection";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import JobFooter from "./JobFooter";

interface JobFormProps {
  isNewJob?: boolean;
  jobId?: string;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ isNewJob = true, jobId, onSubmit, isSaving }) => {
  return (
    <JobFormProvider
      jobId={jobId}
      isNewJob={isNewJob}
      onSubmit={onSubmit}
      isSaving={isSaving}
    >
      <div className="max-w-5xl mx-auto p-4">
        <JobHeader />
        <div className="space-y-6 mt-6">
          <JobNumberSection isNewJob={isNewJob} />
          <JobDetailsSection />
          <CustomerInfoSection />
        </div>
        <JobFooter />
      </div>
    </JobFormProvider>
  );
};

export default JobForm;
