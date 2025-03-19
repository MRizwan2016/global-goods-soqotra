
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobItem } from "../../types/jobTypes";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import PackageDescriptionSection from "./PackageDescriptionSection";
import { Save, ArrowLeft } from "lucide-react";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

const JobForm = ({ jobId, isNewJob = false, onSubmit, isSaving = false }: JobFormProps) => {
  const [jobData, setJobData] = useState({
    jobType: "COLLECTION",
    jobNumber: isNewJob ? "29912" : "",
    invoiceNumber: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: "",
    amPm: "AM",
    sameDay: "N",
    customer: "",
    mobileNumber: "",
    landNumber: "",
    country: "",  // New field
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...jobData,
      items: jobItems
    });
  };
  
  return (
    <form onSubmit={handleSubmit} id="job-form" className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <JobDetailsSection 
          jobData={jobData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        <CustomerInfoSection 
          jobData={jobData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
      </div>
      
      {isNewJob && (
        <PackageDescriptionSection 
          jobItems={jobItems}
          onAddItem={handleAddItem}
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
          disabled={isSaving}
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
