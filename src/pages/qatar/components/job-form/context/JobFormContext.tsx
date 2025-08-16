
import React from "react";
import { useState, useCallback, useEffect } from 'react';
import { JobStorageService } from "../../../services/JobStorageService";
import { QatarJob } from "../../../types/jobTypes";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export interface JobData {
  id?: string;
  jobNumber: string;
  customer: string;
  mobileNumber: string;
  landNumber?: string;
  country?: string;
  sector?: string;
  branch?: string;
  destination?: string;
  vehicle: string;
  jobType: string;
  location: string;
  city: string;
  town?: string;
  date: string;
  time: string;
  advanceAmount: number | string;
  remarks: string;
  packageDetails?: string;
  invoiceNumber?: string;
  amPm: "AM" | "PM";
  sameDay?: "Y" | "N";
  collectDate?: string;
  status: string;
}

interface JobFormContextType {
  jobData: JobData;
  jobItems: any[];
  setJobData: React.Dispatch<React.SetStateAction<JobData>>;
  setJobItems: React.Dispatch<React.SetStateAction<any[]>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleGenerateJobNumber: () => void;
  handleAddItem: (action: any) => void;
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
  const initialJobData: JobData = {
    jobNumber: '',
    customer: '',
    mobileNumber: '',
    jobType: 'COLLECTION',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    amPm: 'AM',
    location: '',
    city: '',
    town: '',
    sector: '',
    branch: '',
    destination: '',
    vehicle: '',
    status: 'PENDING',
    advanceAmount: '',
    remarks: ''
  };

  const [jobData, setJobData] = useState<JobData>({
    ...initialJobData,
    id: isNewJob ? uuidv4() : undefined  // Assign ID immediately for new jobs
  });
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
      // Reset form for new job but ensure we have an ID
      setJobData({
        ...initialJobData,
        id: uuidv4()  // Always ensure a new job has an ID
      });
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

  const handleSelectChange = useCallback((field: string, value: string) => {
    setJobData(prevData => ({
      ...prevData,
      [field]: value
    }));
  }, []);

  const handleGenerateJobNumber = useCallback(() => {
    console.log("=== GENERATING JOB NUMBER ===");
    // Generate a new job number
    const prefix = "QJB";
    const timestamp = Date.now().toString().slice(-6);
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const newJobNumber = `${prefix}-${timestamp}-${randomDigits}`;
    
    console.log("Generated job number:", newJobNumber);
    console.log("Current job data before update:", jobData);
    
    setJobData(prevData => {
      const updatedData = {
        ...prevData,
        jobNumber: newJobNumber,
        id: prevData.id || uuidv4()  // Ensure we have an ID
      };
      console.log("Updated job data:", updatedData);
      return updatedData;
    });
    
    setIsJobNumberGenerated(true);
    console.log("Job number generation completed");
    toast.success("Job Number Generated: " + newJobNumber);
  }, [jobData]);

  const handleAddItem = useCallback((action: any) => {
    setJobItems(prevItems => {
      switch (action.type) {
        case 'delete':
          return prevItems.filter(item => item.id !== action.id);
        case 'update':
          return prevItems.map(item => 
            item.id === action.id 
              ? { 
                  ...item, 
                  name: action.name || action.itemName || item.name || item.itemName || '', 
                  itemName: action.itemName || action.name || item.itemName || item.name || '',
                  sellPrice: action.sellPrice || item.sellPrice || 0,
                  quantity: action.quantity || item.quantity,
                  boxNumber: action.boxNumber || item.boxNumber || String(prevItems.length + 1),
                  description: action.description || item.description
                }
              : item
          );
        case 'add': {
          const itemName = action.itemName || action.name || '';
          const name = action.name || action.itemName || '';
          const boxNumber = action.boxNumber || String(prevItems.length + 1);
          
          const newItem = { 
            id: action.id || uuidv4(),
            name,
            itemName,
            jobId: action.jobId || jobData.id || 'temp',
            sellPrice: action.sellPrice || 0,
            quantity: action.quantity || 1,
            boxNumber,
            description: action.description || `${name} - Qty: ${action.quantity || 1}, Price: QAR ${action.sellPrice || 0}`
          };
          
          return [...prevItems, newItem];
        }
        default:
          return prevItems;
      }
    });
  }, [jobData.id]);

  return (
    <JobFormContext.Provider
      value={{
        jobData,
        jobItems,
        setJobData,
        setJobItems,
        handleInputChange,
        handleSelectChange,
        handleGenerateJobNumber,
        handleAddItem,
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
