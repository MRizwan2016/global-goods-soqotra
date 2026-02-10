
import React, { useState, useEffect } from "react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import CompletedJobsTable from "../../components/completed-jobs/CompletedJobsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/ui/back-button";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const CompletedJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => job.status === "COMPLETED");
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  
  // Refresh jobs when needed
  const refreshJobs = () => {
    const allJobs = JobStorageService.getAllJobs();
    setJobs(allJobs.filter(job => job.status === "COMPLETED"));
  };
  
  // Set up automatic refresh every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshJobs();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);

  const handleCreateNewJob = () => {
    navigate("/qatar/job/new");
  };

  return (
    <div className="container mx-auto py-6">
      <PageBreadcrumb className="mb-4" />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <BackButton to="/qatar" />
          <h1 className="text-2xl font-bold">COMPLETED JOBS</h1>
        </div>
        <Button 
          onClick={handleCreateNewJob}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Job
        </Button>
      </div>

      <JobListPage
        headerTitle="VIEW COMPLETED JOB LIST"
        headerSubtitle="Record Listed."
        headerClassName="bg-green-50 border-green-100"
        reportTitle="COMPLETED JOBS REPORT"
        jobs={jobs}
        sectors={sectors}
        initialStatus="COMPLETED"
        renderTable={({ currentEntries, indexOfFirstEntry }) => (
          <CompletedJobsTable
            currentEntries={currentEntries}
            indexOfFirstEntry={indexOfFirstEntry}
          />
        )}
        refreshJobs={refreshJobs}
      />
    </div>
  );
};

export default CompletedJobsPage;
