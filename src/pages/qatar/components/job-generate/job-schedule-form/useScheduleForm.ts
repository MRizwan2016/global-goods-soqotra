
import { FormEvent, ChangeEvent } from "react";
import { JobScheduleFormData } from "./types";

export const useScheduleForm = (
  formData: JobScheduleFormData, 
  setFormData: React.Dispatch<React.SetStateAction<JobScheduleFormData>>,
  onSubmit: (data: JobScheduleFormData) => void
) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData(prev => ({
      ...prev,
      scheduleDate: date
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return {
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit
  };
};
