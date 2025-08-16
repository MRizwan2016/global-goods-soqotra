
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import CustomerInfoSection from "./customer-info/CustomerInfoSection";
import JobDetailsSection from "./JobDetailsSection";
import PackageDescriptionSection from "./PackageDescriptionSection";
import PackageItemsTable from "./PackageItemsTable";
import JobFormHeader from "./JobFormHeader";
import JobFormActions from "./JobFormActions";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (jobData: any) => void;
  isSaving?: boolean;
  readOnly?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  jobId,
  isNewJob = false,
  onSubmit,
  isSaving = false,
  readOnly = false
}) => {
  return (
    <JobFormProvider
      jobId={jobId}
      isNewJob={isNewJob}
      isSaving={isSaving}
      readOnly={readOnly}
    >
      <form id="job-form" className="space-y-6" onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered - calling onSubmit via ref");
        // This will be handled by JobFormActions via useImperativeHandle
      }}>
        <JobFormHeader isNewJob={isNewJob} />
        
        <CustomerInfoSection />
        
        <JobDetailsSection />
        
        <PackageDescriptionSection />
        
        <PackageItemsTable />
        
        <JobFormActions 
          isNewJob={isNewJob} 
          onSubmit={onSubmit} 
          disabled={isSaving || readOnly}
        />
      </form>
    </JobFormProvider>
  );
};

export default JobForm;
