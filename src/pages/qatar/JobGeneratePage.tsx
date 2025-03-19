
import React from "react";
import { mockJobs } from "./data/mockJobData";
import JobScheduleForm from "./components/job-generate/job-schedule-form";
import JobSelectionTable from "./components/job-generate/JobSelectionTable";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import JobFilters from "./components/job-generate/JobFilters";
import { useJobFiltering } from "./hooks/useJobFiltering";
import { useJobSelection } from "./hooks/useJobSelection";
import Layout from "@/components/layout/Layout";

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
        jobs={selectedJobs.map((job, index) => ({...job, sequenceNum: index + 1}))}
        scheduleData={scheduleData}
        onBack={handleBackFromPrint}
      />
    );
  }
  
  return (
    <Layout title="Job Schedule Generation">
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-10 mr-2" />
            SOQOTRA LOGISTICS - JOB SCHEDULE GENERATION
          </h1>
          
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
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-1">
              <JobScheduleForm 
                onSubmit={handleScheduleSubmit} 
                formData={scheduleData}
                setFormData={setScheduleData}
                selectedJobs={selectedJobs}
                disabled={selectedJobs.length === 0}
              />
            </div>
            
            <div className="lg:col-span-3">
              <JobSelectionTable 
                jobs={filteredJobs} 
                selectedJobs={selectedJobs}
                onToggleSelect={toggleJobSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobGeneratePage;
