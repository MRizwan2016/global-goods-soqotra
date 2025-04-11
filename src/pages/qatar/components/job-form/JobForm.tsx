
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { JobItem } from "../../types/jobTypes";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import PackageDescriptionSection from "./PackageDescriptionSection";
import { Save, ArrowLeft, Hash } from "lucide-react";
import { JobStorageService } from "../../services/JobStorageService";
import { JobNumberService } from "@/services/JobNumberService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

const JobForm = ({ jobId, isNewJob = false, onSubmit, isSaving = false }: JobFormProps) => {
  const navigate = useNavigate();
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
    
    // If country changes, city will be reset by the CitySelector component
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isJobNumberGenerated && isNewJob) {
      toast.error("Please generate a Job Number first");
      return;
    }
    
    onSubmit({
      ...jobData,
      items: jobItems,
      // Convert advance amount to number for storage
      advanceAmount: parseFloat(jobData.advanceAmount) || 0
    });
  };

  const handleCancel = () => {
    navigate("/qatar");
  };
  
  return (
    <form onSubmit={handleSubmit} id="job-form" className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="col-span-2 flex items-center space-x-3 mb-2">
          <div className="flex-1 relative">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label htmlFor="jobNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  JOB NUMBER
                </label>
                <input
                  type="text"
                  id="jobNumber"
                  name="jobNumber"
                  value={jobData.jobNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded w-full bg-gray-50 font-bold text-lg"
                  readOnly
                  placeholder={isJobNumberGenerated ? "" : "Job number will be auto-generated"}
                />
              </div>
              {isNewJob && !isJobNumberGenerated && (
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={handleGenerateJobNumber}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Hash className="mr-1 h-4 w-4" /> Generate Job No
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <JobDetailsSection 
          jobData={jobData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          isEnabled={isJobNumberGenerated}
        />
        
        <CustomerInfoSection 
          jobData={jobData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          isEnabled={isJobNumberGenerated}
        />
      </div>
      
      <PackageDescriptionSection 
        jobItems={jobItems}
        onAddItem={handleAddItem}
        isEnabled={isJobNumberGenerated}
      />
      
      <div className="flex justify-end gap-2 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleCancel}
        >
          <ArrowLeft size={16} />
          CANCEL
        </Button>
        <Button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-colors"
          disabled={isSaving || (!isJobNumberGenerated && isNewJob)}
        >
          <Save size={16} />
          {isNewJob ? 'CREATE JOB' : 'UPDATE JOB'}
          {isSaving && <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
