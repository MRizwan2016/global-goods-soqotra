
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import JobFormHeader from "./JobFormHeader";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import PackageDescriptionSection from "./PackageDescriptionSection";
import JobFormActions from "./JobFormActions";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

const JobForm = ({ jobId, isNewJob = false, onSubmit, isSaving = false }: JobFormProps) => {
  return (
    <JobFormProvider 
      jobId={jobId} 
      isNewJob={isNewJob} 
      onSubmit={onSubmit} 
      isSaving={isSaving}
    >
      <form id="job-form" className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <JobFormHeader isNewJob={isNewJob} />
          
          <JobDetailsSection />
          
          <CustomerInfoSection />
        </div>
        
        <PackageDescriptionSection />
        
        <JobFormActions isNewJob={isNewJob} onSubmit={onSubmit} />
      </form>
    </JobFormProvider>
  );
};

export default JobForm;
