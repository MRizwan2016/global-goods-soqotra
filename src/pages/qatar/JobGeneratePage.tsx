
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

const JobGeneratePage: React.FC = () => {
  const [jobsData, setJobsData] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load jobs from storage
  useEffect(() => {
    // Get all jobs from storage
    const allJobs = JobStorageService.getAllJobs();
    setJobsData(allJobs);
    setIsLoading(false);
  }, []);
  
  // Use our custom hooks
  const {
    selectedJobs,
    isPrintMode,
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
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
      <PrintJobSchedule 
        jobs={jobsForSchedule.map((job, index) => ({...job, sequenceNum: index + 1}))}
        scheduleData={{
          ...scheduleData, 
          vehicle: selectedVehicle || scheduleData.vehicle,
          city: selectedCity || ''
        }}
        onBack={handleBackFromPrint}
      />
    );
  }
  
  return (
    <Layout title="Job Schedule Generation">
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <JobGenerateHeader title="SOQOTRA LOGISTICS - JOB SCHEDULE GENERATION" />
          
          {/* Filters */}
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
          />
          
          {/* Grouping Toggle Buttons */}
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
            handleScheduleSubmit={handleScheduleSubmit}
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
