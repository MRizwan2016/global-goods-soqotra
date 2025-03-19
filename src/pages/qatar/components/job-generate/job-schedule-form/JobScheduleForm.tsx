
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { QatarJob } from "../../../types/jobTypes";
import ScheduleFields from "./ScheduleFields";
import FormActions from "./form-actions";

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
    <Card className="shadow-md border-0 overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4">
        <CardTitle className="text-lg font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          SCHEDULE INFORMATION
        </CardTitle>
      </CardHeader>
      
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
