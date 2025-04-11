
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { JobItem } from "../../types/jobTypes";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import PackageDescriptionSection from "./PackageDescriptionSection";
import { Save, ArrowLeft, Hash } from "lucide-react";
import { JobStorageService } from "../../services/JobStorageService";
import { JobNumberService } from "@/services/JobNumberService";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

const JobForm = ({ jobId, isNewJob = false, onSubmit, isSaving = false }: JobFormProps) => {
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
    country: "",
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
          // Ensure advanceAmount is a string for form handling
          advanceAmount: existingJob.advanceAmount?.toString() || ""
        });
        setIsJobNumberGenerated(true);
      }
    }
  }, [jobId]);
  
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
    setJobItems(prev => [...prev, newItem]);
  };
  
  const handleGenerateJobNumber = () => {
    const newJobNumber = JobNumberService.generateJobNumber();
    setJobData(prev => ({
      ...prev,
      jobNumber: newJobNumber
    }));
    setIsJobNumberGenerated(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isJobNumberGenerated && isNewJob) {
      alert("Please generate a Job Number first");
      return;
    }
    
    onSubmit({
      ...jobData,
      items: jobItems,
      // Convert advance amount to number for storage
      advanceAmount: parseFloat(jobData.advanceAmount) || 0
    });
  };
  
  return (
    <form onSubmit={handleSubmit} id="job-form" className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="col-span-2 flex items-center space-x-3 mb-2">
          <div className="flex-1 relative">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label htmlFor="jobNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Number
                </label>
                <input
                  type="text"
                  id="jobNumber"
                  name="jobNumber"
                  value={jobData.jobNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded w-full bg-gray-50"
                  readOnly
                  placeholder={isJobNumberGenerated ? "" : "Job number will be auto-generated"}
                />
              </div>
              {isNewJob && !isJobNumberGenerated && (
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={handleGenerateJobNumber}
                    className="bg-blue-600 hover:bg-blue-700"
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
      
      {isNewJob && (
        <PackageDescriptionSection 
          jobItems={jobItems}
          onAddItem={handleAddItem}
          isEnabled={isJobNumberGenerated}
        />
      )}
      
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          CANCEL
        </Button>
        <Button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
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
