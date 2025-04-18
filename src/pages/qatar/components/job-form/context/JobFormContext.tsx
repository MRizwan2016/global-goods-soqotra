
import React, { createContext, useContext, useState } from "react";

// Define the job data interface
export interface JobData {
  jobNumber: string;
  customer: string;
  mobileNumber: string;
  landNumber: string;
  country: string;
  sector: string;
  branch: string;
  vehicle: string;
  jobType: string;
  location: string;
  city: string;
  date: string;
  time: string;
  advanceAmount: string;
  remarks: string;
  packageDetails: string;
  // Add additional fields needed by the components
  invoiceNumber?: string;
  amPm?: string;
  sameDay?: string;
  collectDate?: string;
  status?: string;
}

// Define the context interface
interface JobFormContextType {
  jobData: JobData;
  isJobNumberGenerated: boolean;
  isSaving?: boolean;
  jobItems?: any[];
  setIsJobNumberGenerated: (value: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof JobData, value: string) => void;
  setJobData: React.Dispatch<React.SetStateAction<JobData>>;
  generateJobNumber: () => void;
  handleGenerateJobNumber?: () => void;
  handleAddItem?: (item: any) => void;
}

// Create context with a default value
const JobFormContext = createContext<JobFormContextType>({
  jobData: {
    jobNumber: "",
    customer: "",
    mobileNumber: "",
    landNumber: "",
    country: "",
    sector: "",
    branch: "",
    vehicle: "",
    jobType: "",
    location: "",
    city: "",
    date: "",
    time: "",
    advanceAmount: "",
    remarks: "",
    packageDetails: "",
  },
  isJobNumberGenerated: false,
  setIsJobNumberGenerated: () => {},
  handleInputChange: () => {},
  handleSelectChange: () => {},
  setJobData: () => {},
  generateJobNumber: () => {},
});

export const JobFormProvider: React.FC<{ 
  children: React.ReactNode;
  initialJobData?: Partial<JobData>;
  isEditMode?: boolean;
  jobId?: string;
  isNewJob?: boolean;
  onSubmit?: (data: any) => void;
  isSaving?: boolean;
}> = ({ children, initialJobData = {}, isEditMode = false, isNewJob = true, onSubmit = () => {}, isSaving = false, jobId }) => {
  // Initialize state with default values or provided initial data
  const [jobData, setJobData] = useState<JobData>({
    jobNumber: initialJobData.jobNumber || "",
    customer: initialJobData.customer || "",
    mobileNumber: initialJobData.mobileNumber || "",
    landNumber: initialJobData.landNumber || "",
    country: initialJobData.country || "",
    sector: initialJobData.sector || "",
    branch: initialJobData.branch || "",
    vehicle: initialJobData.vehicle || "",
    jobType: initialJobData.jobType || "Collection",
    location: initialJobData.location || "",
    city: initialJobData.city || "",
    date: initialJobData.date || "",
    time: initialJobData.time || "",
    advanceAmount: initialJobData.advanceAmount || "",
    remarks: initialJobData.remarks || "",
    packageDetails: initialJobData.packageDetails || "",
    invoiceNumber: initialJobData.invoiceNumber || "",
    amPm: initialJobData.amPm || "AM",
    sameDay: initialJobData.sameDay || "Y",
    collectDate: initialJobData.collectDate || "",
    status: initialJobData.status || "PENDING",
  });

  const [isJobNumberGenerated, setIsJobNumberGenerated] = useState(
    isEditMode || !!initialJobData.jobNumber || false
  );

  // Mock job items for type safety
  const [jobItems, setJobItems] = useState<any[]>([]);

  // Generate a job number
  const generateJobNumber = () => {
    if (!isJobNumberGenerated) {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2); // Last 2 digits of year
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (1-12)
      const day = String(date.getDate()).padStart(2, "0"); // Day
      const random = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number

      const newJobNumber = `QAT-${year}${month}${day}-${random}`;
      
      setJobData(prevData => ({
        ...prevData,
        jobNumber: newJobNumber
      }));
      
      setIsJobNumberGenerated(true);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (field: keyof JobData, value: string) => {
    setJobData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Mock handleAddItem function - updated to accept an item
  const handleAddItem = (item: any) => {
    setJobItems(prev => [...prev, item]);
  };

  // Alias for generateJobNumber for compatibility
  const handleGenerateJobNumber = generateJobNumber;

  return (
    <JobFormContext.Provider
      value={{
        jobData,
        isJobNumberGenerated,
        isSaving,
        jobItems,
        setIsJobNumberGenerated,
        handleInputChange,
        handleSelectChange,
        setJobData,
        generateJobNumber,
        handleGenerateJobNumber,
        handleAddItem,
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
};

export const useJobForm = () => useContext(JobFormContext);

export default JobFormContext;
