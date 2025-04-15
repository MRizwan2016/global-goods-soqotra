
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import JobFormHeader from "./JobFormHeader";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import { Button } from "@/components/ui/button";

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
        <JobFormHeader isNewJob={isNewJob} />
        <div className="space-y-6 mt-6">
          <JobDetailsSection />
          <CustomerInfoSection />
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Job'}
          </Button>
        </div>
      </div>
    </JobFormProvider>
  );
};

export default JobForm;
