
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { QatarJob } from "../../../types/jobTypes";
import ScheduleFields from "./ScheduleFields";
import FormActions from "./FormActions";

interface JobScheduleFormProps {
  onSubmit: (data: any) => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  selectedJobs: QatarJob[];
  disabled: boolean;
}

const JobScheduleForm: React.FC<JobScheduleFormProps> = ({ 
  onSubmit, 
  formData, 
  setFormData,
  selectedJobs,
  disabled
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, scheduleDate: format(date, 'yyyy-MM-dd') });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader className="bg-blue-600 text-white py-2 px-4">
        <CardTitle className="text-md">SCHEDULE INFORMATION</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ScheduleFields 
            formData={formData}
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
