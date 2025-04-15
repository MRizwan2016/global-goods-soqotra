
import React, { useState } from "react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import CancelledJobsTable from "../../components/cancelled-jobs/CancelledJobsTable";

const CancelledJobsPage = () => {
  const [jobs] = useState(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => job.status === "CANCELLED");
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];

  return (
    <JobListPage
      title="Cancelled Jobs"
      headerTitle="VIEW CANCELLED JOB LIST"
      headerSubtitle="Record Listed."
      headerClassName="bg-red-50 border-red-100"
      reportTitle="CANCELLED JOBS REPORT"
      jobs={jobs}
      sectors={sectors}
      initialStatus="CANCELLED"
      renderTable={({ currentEntries, indexOfFirstEntry }) => (
        <CancelledJobsTable
          currentEntries={currentEntries}
          indexOfFirstEntry={indexOfFirstEntry}
        />
      )}
    />
  );
};

export default CancelledJobsPage;
