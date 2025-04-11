
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { JobItem } from "../../../types/jobTypes";
import { JobStorageService } from "../../../services/JobStorageService";
import { JobNumberService } from "@/services/JobNumberService";
import { toast } from "sonner";

interface JobFormContextType {
  jobData: any;
  setJobData: React.Dispatch<React.SetStateAction<any>>;
  jobItems: JobItem[];
  setJobItems: React.Dispatch<React.SetStateAction<JobItem[]>>;
  isJobNumberGenerated: boolean;
  setIsJobNumberGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleAddItem: (newItem: JobItem) => void;
  handleGenerateJobNumber: () => void;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobFormContext = createContext<JobFormContextType | undefined>(undefined);

interface JobFormProviderProps {
  children: ReactNode;
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

export const JobFormProvider = ({
  children,
  jobId,
  isNewJob = false,
  onSubmit,
  isSaving: externalIsSaving = false,
}: JobFormProviderProps) => {
  const [jobData, setJobData] = useState({
    jobType: "COLLECTION",
    jobNumber: "",
    invoiceNumber: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: "",
    amPm: "AM",
    sameDay: "N",
    customer: "",
    mobileNumber: "",
    landNumber: "",
    country: "Qatar", // Default country
    sector: "",
    branch: "",
    city: "",
    town: "",
    location: "",
    vehicle: "",
    advanceAmount: "",
    remarks: "",
    collectDate: new Date().toLocaleDateString("en-GB")
  });
  
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isJobNumberGenerated, setIsJobNumberGenerated] = useState(false);
  const [isSaving, setIsSaving] = useState(externalIsSaving);
  
  // Load existing job data if editing
  useEffect(() => {
    if (jobId) {
      const existingJob = JobStorageService.getJobById(jobId);
      if (existingJob) {
        setJobData({
          ...existingJob,
          // Ensure jobNumber is properly formatted
          jobNumber: existingJob.jobNumber || "",
          // Ensure advanceAmount is a string for form handling
          advanceAmount: existingJob.advanceAmount?.toString() || ""
        });
        setIsJobNumberGenerated(!!existingJob.jobNumber);
        
        // Load job items if they exist
        if (existingJob.items && existingJob.items.length > 0) {
          setJobItems(existingJob.items);
        }
      }
    }
  }, [jobId]);
  
  // Set sector and branch when country changes
  useEffect(() => {
    if (jobData.country) {
      // Set default sector based on country
      let defaultSector = "";
      let defaultBranch = "";
      
      switch(jobData.country) {
        case "Sri Lanka":
          defaultSector = "COLOMBO : C";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Qatar":
          defaultSector = "DOHA : D";
          defaultBranch = "HEAD OFFICE";
          break;
        case "UAE":
          defaultSector = "DUBAI : D";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Bahrain":
          defaultSector = "MANAMA : M";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Saudi Arabia":
          defaultSector = "RIYADH : R";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Tunisia":
          defaultSector = "TUNIS : T";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Uganda":
          defaultSector = "KAMPALA : K";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Somalia":
          defaultSector = "MOGADISHU : M";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Ethiopia":
          defaultSector = "ADDIS ABABA : A";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Philippines":
          defaultSector = "MANILA : M";
          defaultBranch = "HEAD OFFICE";
          break;
        case "Oman":
          defaultSector = "MUSCAT : M";
          defaultBranch = "HEAD OFFICE";
          break;
        default:
          break;
      }
      
      if (defaultSector && !jobData.sector) {
        setJobData(prev => ({
          ...prev,
          sector: defaultSector,
          branch: defaultBranch
        }));
      }
    }
  }, [jobData.country]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddItem = (newItem: JobItem) => {
    if (newItem.quantity < 0) {
      // Handle item deletion
      setJobItems(prev => prev.filter(item => item.id !== newItem.id));
      return;
    }
    
    // Check if this is an edit of an existing item
    if (jobItems.some(item => item.id === newItem.id)) {
      // Update existing item
      setJobItems(prev => prev.map(item => 
        item.id === newItem.id ? { ...newItem, jobId: jobData.jobNumber || jobId || `temp-${Date.now()}` } : item
      ));
    } else {
      // Add new item
      const itemWithJobId = {
        ...newItem,
        jobId: jobData.jobNumber || jobId || `temp-${Date.now()}`
      };
      
      setJobItems(prev => [...prev, itemWithJobId]);
    }
  };
  
  const handleGenerateJobNumber = () => {
    // Generate job number based on country
    const newJobNumber = JobNumberService.generateJobNumber(jobData.country);
    
    setJobData(prev => ({
      ...prev,
      jobNumber: newJobNumber
    }));
    
    setIsJobNumberGenerated(true);
    toast.success(`Job number generated: ${newJobNumber}`);
  };

  const value = {
    jobData,
    setJobData,
    jobItems,
    setJobItems,
    isJobNumberGenerated,
    setIsJobNumberGenerated,
    handleInputChange,
    handleSelectChange,
    handleAddItem,
    handleGenerateJobNumber,
    isSaving,
    setIsSaving
  };

  return (
    <JobFormContext.Provider value={value}>
      {children}
    </JobFormContext.Provider>
  );
};

export const useJobForm = () => {
  const context = useContext(JobFormContext);
  if (context === undefined) {
    throw new Error("useJobForm must be used within a JobFormProvider");
  }
  return context;
};
