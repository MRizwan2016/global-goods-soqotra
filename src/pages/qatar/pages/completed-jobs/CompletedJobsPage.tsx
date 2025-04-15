
import React, { useState, useEffect } from "react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import CompletedJobsTable from "../../components/completed-jobs/CompletedJobsTable";

const CompletedJobsPage = () => {
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

  return (
    <JobListPage
      title="Completed Jobs"
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
  );
};

export default CompletedJobsPage;
