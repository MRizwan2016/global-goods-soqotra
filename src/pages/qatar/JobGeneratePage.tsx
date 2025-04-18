
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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const JobGeneratePage: React.FC = () => {
  const [jobsData, setJobsData] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all jobs
    let allJobs = JobStorageService.getAllJobs();
    console.log("Initial job load:", allJobs.length);
    
    // If no jobs exist, initialize with mock data
    if (allJobs.length === 0) {
      console.log("No jobs found in storage, initializing with mock data");
      mockJobs.forEach(job => {
        // Ensure we have PENDING jobs for schedule generation
        const jobToSave = { ...job };
        if (Math.random() > 0.5) {
          jobToSave.status = 'PENDING';
          jobToSave.isAssigned = false;
        }
        JobStorageService.saveJob(jobToSave);
      });
      allJobs = JobStorageService.getAllJobs();
      toast.success("Sample jobs loaded successfully");
    }
    
    // Make sure we have at least a few pending jobs for scheduling
    const pendingJobs = allJobs.filter(job => job.status === 'PENDING' && !job.isAssigned);
    if (pendingJobs.length === 0) {
      console.log("No pending jobs found, converting some to pending");
      // Convert at least 3 jobs to pending status
      const jobsToConvert = allJobs.slice(0, 3);
      jobsToConvert.forEach(job => {
        JobStorageService.updateJob(job.id, { 
          status: 'PENDING', 
          isAssigned: false 
        });
      });
      
      // Reload all jobs after modifications
      allJobs = JobStorageService.getAllJobs();
      toast.success("Added pending jobs for scheduling");
    }
    
    console.log("Loaded jobs:", allJobs.length);
    console.log("Pending jobs:", allJobs.filter(job => job.status === 'PENDING' && !job.isAssigned).length);
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
  
  // Initialize with ALL to see all jobs, then user can filter as needed
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
  
  // Get unassigned pending jobs
  const pendingJobs = jobsData.filter(job => job.status === 'PENDING' && job.isAssigned !== true);
  console.log("Pending unassigned jobs:", pendingJobs.length);
  
  return (
    <Layout title="Job Schedule Generation">
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/qatar")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
            <h1 className="text-2xl font-medium mb-2">Soqotra Logistics - Job Schedule</h1>
            <p className="text-blue-100">Create and manage job schedules for your vehicles and drivers</p>
          </div>

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
            filteredJobs={pendingJobs}
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
