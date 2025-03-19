
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QatarJob } from "../../../types/jobTypes";
import ScheduleFormHeader from "./components/ScheduleFormHeader";
import ScheduleFields from "./ScheduleFields";
import FormActions from "./form-actions";
import { useScheduleForm } from "./useScheduleForm";
import { JobScheduleFormProps } from "./types";

const JobScheduleForm: React.FC<JobScheduleFormProps> = ({ 
  onSubmit, 
  formData, 
  setFormData,
  selectedJobs,
  disabled
}) => {
  const {
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit
  } = useScheduleForm(formData, setFormData, onSubmit);

  return (
    <Card className="shadow-md border-0 overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <ScheduleFormHeader />
      
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ScheduleFields 
            formData={formData}
            selectedJobs={selectedJobs}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
          />
          
          <FormActions 
            selectedJobs={selectedJobs}
            disabled={disabled}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default JobScheduleForm;
