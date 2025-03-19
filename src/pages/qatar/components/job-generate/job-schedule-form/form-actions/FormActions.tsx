
import React from "react";
import { QatarJob } from "../../../../../types/jobTypes";
import JobCounter from "./JobCounter";
import GenerateButton from "./GenerateButton";

interface FormActionsProps {
  selectedJobs: QatarJob[];
  disabled: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ selectedJobs, disabled }) => {
  return (
    <div className="pt-2">
      <JobCounter selectedJobs={selectedJobs} />
      <GenerateButton disabled={disabled} />
    </div>
  );
};

export default FormActions;
