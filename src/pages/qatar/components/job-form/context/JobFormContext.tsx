import React from "react";
import { useState, useCallback, useEffect } from 'react';
import { JobStorageService } from "../../../services/JobStorageService";
import { QatarJob } from "../../../types/jobTypes";
import { toast } from "sonner";

interface JobFormContextType {
  jobData: any;
  jobItems: any[];
  setJobData: React.Dispatch<React.SetStateAction<any>>;
  setJobItems: React.Dispatch<React.SetStateAction<any[]>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isJobNumberGenerated: boolean;
  setIsJobNumberGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  isSaving: boolean;
  readOnly: boolean;
}

interface JobFormProviderProps {
  children: React.ReactNode;
  isNewJob?: boolean;
  jobId?: string;
  onSubmit?: (data: any) => void;
  isSaving?: boolean;
  readOnly?: boolean;
}

export const JobFormContext = React.createContext<JobFormContextType | undefined>(undefined);

export const JobFormProvider: React.FC<JobFormProviderProps> = ({
  children,
  isNewJob = true,
  jobId,
  isSaving = false,
  readOnly = false
}) => {
  const initialJobData = {
    customer: '',
    mobileNumber: '',
    jobType: 'DELIVERY',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    amPm: 'AM',
    location: '',
    city: '',
    town: '',
    sector: '',
    branch: '',
    vehicle: '',
    status: 'PENDING',
    advanceAmount: 0,
    items: [],
    remarks: ''
  };

  const [jobData, setJobData] = useState<any>(initialJobData);
  const [jobItems, setJobItems] = useState<any[]>([]);
  const [isJobNumberGenerated, setIsJobNumberGenerated] = useState(false);

  useEffect(() => {
    if (jobId) {
      const job = JobStorageService.getJobById(jobId);
      if (job) {
        setJobData(job);
        setJobItems(job.items || []);
        setIsJobNumberGenerated(true);
      } else {
        toast.error("Job not found!");
      }
    } else {
      // Reset form for new job
      setJobData(initialJobData);
      setJobItems([]);
      setIsJobNumberGenerated(false);
    }
  }, [jobId]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  return (
    <JobFormContext.Provider
      value={{
        jobData,
        jobItems,
        setJobData,
        setJobItems,
        handleInputChange,
        isJobNumberGenerated,
        setIsJobNumberGenerated,
        isSaving,
        readOnly
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
};

export const useJobForm = () => {
  const context = React.useContext(JobFormContext);
  if (!context) {
    throw new Error("useJobForm must be used within a JobFormProvider");
  }
  return context;
};
