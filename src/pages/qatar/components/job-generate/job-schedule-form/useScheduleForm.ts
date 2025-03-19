
import { useCallback } from "react";
import { format } from "date-fns";
import { JobScheduleFormData } from "./types";

export function useScheduleForm(
  formData: JobScheduleFormData,
  setFormData: React.Dispatch<React.SetStateAction<JobScheduleFormData>>,
  onSubmit: (data: JobScheduleFormData) => void
) {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, [setFormData]);

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, [setFormData]);

  const handleDateChange = useCallback((date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, scheduleDate: format(date, 'yyyy-MM-dd') }));
    }
  }, [setFormData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  return {
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit
  };
}
