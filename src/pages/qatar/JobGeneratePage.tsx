import React, { useEffect, useState } from "react";
import { useJobFiltering } from "./hooks/useJobFiltering";
import { useJobSelection } from "./hooks/useJobSelection";
import { useJobGrouping } from "./hooks/useJobGrouping";
import Layout from "@/components/layout/Layout";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import JobFilters from "./components/job-generate/JobFilters";
import JobGenerateHeader from "./components/job-generate/page-sections/JobGenerateHeader";
import GroupControlPanel from "./components/job-generate/page-sections/GroupControlPanel";
import JobGenerateLayout from "./components/job-generate/page-sections/JobGenerateLayout";
import { JobStorageService } from "./services/JobStorageService";
import { QatarJob } from "./types/jobTypes";
import ScheduleDetailsEditor from "./components/job-generate/schedule-details/ScheduleDetailsEditor";
import { mockJobs } from "./data/mockJobData";
import { toast } from "sonner";

const JobGeneratePage: React.FC = () => {
  const [jobsData, setJobsData] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let allJobs = JobStorageService.getAllJobs();
    
    if (allJobs.length === 0) {
      console.log("No jobs found in storage, initializing with mock data");
      mockJobs.forEach(job => {
        JobStorageService.saveJob(job);
      });
      allJobs = JobStorageService.getAllJobs();
      toast.success("Sample jobs loaded successfully");
    }
    
    console.log("Loaded jobs:", allJobs.length);
    setJobsData(allJobs);
    setIsLoading(false);
  }, []);
  
  const {
    selectedJobs,
    isPrintMode,
    isEditMode,
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
    handleScheduleEdit,
    handleScheduleSave,
    handleBackFromPrint,
    handleCloseJobs,
    handleDirectPrint
  } = useJobSelection();
  
  const {
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filterDate,
    setFilterDate,
    filteredJobs
  } = useJobFiltering(jobsData);
  
  const {
    showVehicleView,
    setShowVehicleView,
    showCityView,
    setShowCityView,
    selectedVehicle,
    setSelectedVehicle,
    selectedCity,
    setSelectedCity,
    jobsForSchedule,
    isFormDisabled
  } = useJobGrouping(selectedJobs);
  
  if (isLoading) {
    return (
      <Layout title="Job Schedule Generation">
        <div className="w-full text-center py-8">
          <p>Loading jobs...</p>
        </div>
      </Layout>
    );
  }
  
  if (isPrintMode) {
    return (
      <div id="print-job-schedule-wrapper" className="print-job-schedule-container">
        <PrintJobSchedule 
          jobs={jobsForSchedule.map((job, index) => ({...job, sequenceNum: index + 1}))}
          scheduleData={{
            ...scheduleData, 
            vehicle: selectedVehicle || scheduleData.vehicle,
            city: selectedCity || ''
          }}
          onBack={handleBackFromPrint}
        />
      </div>
    );
  }

  if (isEditMode) {
    return (
      <Layout title="Edit Schedule Details">
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Schedule Details</h2>
          <ScheduleDetailsEditor 
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            onSave={handleScheduleSave}
            onCancel={() => handleBackFromPrint()}
            selectedJobs={jobsForSchedule}
          />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Job Schedule Generation">
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <JobGenerateHeader title="SOQOTRA LOGISTICS - JOB SCHEDULE GENERATION" />
          
          <JobFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            selectedJobs={selectedJobs}
            onCloseJobs={handleCloseJobs}
            onPrintJobs={handleDirectPrint}
            onEditSchedule={handleScheduleEdit}
          />
          
          {jobsData.length === 0 && (
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200 my-4">
              <p className="text-amber-800">No jobs available. Please add jobs in the job management section.</p>
            </div>
          )}
          
          <GroupControlPanel 
            selectedJobs={selectedJobs}
            showVehicleView={showVehicleView}
            setShowVehicleView={setShowVehicleView}
            showCityView={showCityView}
            setShowCityView={setShowCityView}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
          
          <JobGenerateLayout 
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            handleScheduleSubmit={handleScheduleEdit}
            jobsForSchedule={jobsForSchedule}
            filteredJobs={filteredJobs}
            selectedJobs={selectedJobs}
            onToggleSelect={toggleJobSelection}
            disabled={isFormDisabled}
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobGeneratePage;
