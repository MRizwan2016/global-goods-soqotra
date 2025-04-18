
import { Dispatch, SetStateAction } from "react";
import { JobData } from "../../components/job-form/context/JobFormContext";

export const useFormHandlers = (setJobData: Dispatch<SetStateAction<JobData>>) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (field: keyof JobData, value: string) => {
    setJobData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  return {
    handleInputChange,
    handleSelectChange,
  };
};
