
import React, { useState } from "react";
import { mockJobs } from "./data/mockJobData";
import JobScheduleForm from "./components/job-generate/JobScheduleForm";
import JobSelectionTable from "./components/job-generate/JobSelectionTable";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import { QatarJob } from "./types/jobTypes";

const JobGeneratePage: React.FC = () => {
  const [selectedJobs, setSelectedJobs] = useState<QatarJob[]>([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    scheduleNumber: "5352",
    vehicle: "",
    salesRep: "",
    driver: "",
    helper: "",
    scheduleDate: new Date().toISOString().split('T')[0],
  });
  
  const toggleJobSelection = (job: QatarJob) => {
    const isSelected = selectedJobs.some(j => j.id === job.id);
    
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter(j => j.id !== job.id));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };
  
  const handleScheduleSubmit = (data: any) => {
    setScheduleData(data);
    setIsPrintMode(true);
  };
  
  const handleBackFromPrint = () => {
    setIsPrintMode(false);
  };
  
  if (isPrintMode) {
    return (
      <PrintJobSchedule 
        jobs={selectedJobs} 
        scheduleData={scheduleData}
        onBack={handleBackFromPrint}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">JOB SCHEDULE GENERATION</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <JobScheduleForm 
              onSubmit={handleScheduleSubmit} 
              formData={scheduleData}
              setFormData={setScheduleData}
              selectedJobs={selectedJobs}
              disabled={selectedJobs.length === 0}
            />
          </div>
          
          <div className="lg:col-span-2">
            <JobSelectionTable 
              jobs={mockJobs} 
              selectedJobs={selectedJobs}
              onToggleSelect={toggleJobSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobGeneratePage;
