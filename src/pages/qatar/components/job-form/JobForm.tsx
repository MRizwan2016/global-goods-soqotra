
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import JobHeader from "./JobHeader";
import JobNumberSection from "./JobNumberSection";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import JobFormActions from "./JobFormActions";
import PackageDescriptionSection from "./PackageDescriptionSection";

interface JobFormProps {
  isNewJob?: boolean;
  jobId?: string;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
  readOnly?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ 
  isNewJob = true, 
  jobId, 
  onSubmit, 
  isSaving = false,
  readOnly = false 
}) => {
  return (
    <JobFormProvider
      isNewJob={isNewJob}
      jobId={jobId}
      onSubmit={onSubmit}
      isSaving={isSaving}
      readOnly={readOnly}
    >
      <form id="job-form" className="max-w-5xl mx-auto p-4">
        <JobHeader />
        <div className="space-y-6 mt-6">
          <JobNumberSection isNewJob={isNewJob} />
          <JobDetailsSection />
          <CustomerInfoSection />
          <PackageDescriptionSection />
        </div>
        <JobFormActions isNewJob={isNewJob} onSubmit={onSubmit} disabled={readOnly} />
      </form>
    </JobFormProvider>
  );
};

export default JobForm;
