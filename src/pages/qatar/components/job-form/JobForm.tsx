
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobItem } from "../../types/jobTypes";
import JobDetailsSection from "./JobDetailsSection";
import CustomerInfoSection from "./CustomerInfoSection";
import PackageDescriptionSection from "./PackageDescriptionSection";

interface JobFormProps {
  jobId?: string;
  isNewJob?: boolean;
  onSubmit: (data: any) => void;
}

const JobForm = ({ jobId, isNewJob = false, onSubmit }: JobFormProps) => {
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
    <form onSubmit={handleSubmit}>
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
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          CANCEL
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {isNewJob ? 'CREATE JOB' : 'UPDATE JOB'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
