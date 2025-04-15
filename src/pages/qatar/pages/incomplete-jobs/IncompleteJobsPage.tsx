
import React, { useState } from "react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import IncompleteJobsTable from "../../components/incomplete-jobs/IncompleteJobsTable";

const IncompleteJobsPage = () => {
  const [jobs, setJobs] = useState(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => 
      job.status !== "COMPLETED" && job.status !== "CANCELLED"
    );
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];
  
  const refreshJobs = () => {
    const allJobs = JobStorageService.getAllJobs();
    setJobs(allJobs.filter(job => 
      job.status !== "COMPLETED" && job.status !== "CANCELLED"
    ));
  };

  return (
    <JobListPage
      title="Incomplete Jobs"
      headerTitle="VIEW INCOMPLETE JOB LIST"
      headerSubtitle="Record Listed."
      headerClassName="bg-green-50 border-green-100"
      reportTitle="INCOMPLETE JOBS REPORT"
      jobs={jobs}
      sectors={sectors}
      showVehicleFilter={true}
      showJobTypeFilter={true}
      renderTable={({ currentEntries, indexOfFirstEntry }) => (
        <IncompleteJobsTable
          currentEntries={currentEntries}
          indexOfFirstEntry={indexOfFirstEntry}
          refreshJobs={refreshJobs}
        />
      )}
      refreshJobs={refreshJobs}
    />
  );
};

export default IncompleteJobsPage;
