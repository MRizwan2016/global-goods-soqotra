
import React from "react";
import { mockJobs } from "./data/mockJobData";
import JobScheduleForm from "./components/job-generate/job-schedule-form";
import JobSelectionTable from "./components/job-generate/JobSelectionTable";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import JobFilters from "./components/job-generate/JobFilters";
import { useJobFiltering } from "./hooks/useJobFiltering";
import { useJobSelection } from "./hooks/useJobSelection";

const JobGeneratePage: React.FC = () => {
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
  } = useJobFiltering(mockJobs);
  
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
              jobs={filteredJobs} 
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
