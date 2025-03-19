
import React from "react";
import { QatarJob } from "../../../../types/jobTypes";
import JobCounter from "./JobCounter";
import GenerateButton from "./GenerateButton";
import { Card } from "@/components/ui/card";

interface FormActionsProps {
  selectedJobs: QatarJob[];
  disabled: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ selectedJobs, disabled }) => {
  return (
    <Card className="pt-4 pb-4 px-3 border-t-2 border-blue-500 shadow-md animate-fade-in">
      <JobCounter selectedJobs={selectedJobs} />
      <GenerateButton disabled={disabled} />
    </Card>
  );
};

export default FormActions;
