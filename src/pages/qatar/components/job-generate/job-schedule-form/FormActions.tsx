
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { QatarJob } from "../../../types/jobTypes";

interface FormActionsProps {
  selectedJobs: QatarJob[];
  disabled: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ selectedJobs, disabled }) => {
  return (
    <div className="pt-2">
      <div className="mb-2 text-sm text-gray-600">
        Selected Jobs: <span className="font-bold">{selectedJobs.length}</span>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
        disabled={disabled}
      >
        <Printer size={16} />
        GENERATE JOB SCHEDULE
      </Button>
    </div>
  );
};

export default FormActions;
