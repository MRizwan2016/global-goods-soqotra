
import React from "react";
import { JobFormProvider } from "./context/JobFormContext";
import JobHeader from "./JobHeader";
import JobNumberSection from "./JobNumberSection";
import JobDetailsSection from "./JobDetailsSection";
import CustomerDetailsSection from "./CustomerDetailsSection";
import JobFooter from "./JobFooter";

const JobForm: React.FC = () => {
  return (
    <JobFormProvider>
      <div className="max-w-5xl mx-auto p-4">
        <JobHeader />
        <div className="space-y-6 mt-6">
          <JobNumberSection />
          <JobDetailsSection />
          <CustomerDetailsSection />
        </div>
        <JobFooter />
      </div>
    </JobFormProvider>
  );
};

export default JobForm;
