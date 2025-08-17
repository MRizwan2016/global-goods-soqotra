
import React, { useState } from "react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import CancelledJobsTable from "../../components/cancelled-jobs/CancelledJobsTable";
import BackButton from "@/components/ui/back-button";

const CancelledJobsPage = () => {
  const [jobs] = useState(() => {
    const allJobs = JobStorageService.getAllJobs();
    return allJobs.filter(job => job.status === "CANCELLED");
  });

  const sectors = ["ALL SECTORS", "MANILA", "COLOMBO", "DOHA", "DUBAI"];

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <BackButton to="/qatar" />
          <h1 className="text-2xl font-bold">CANCELLED JOBS</h1>
        </div>
      </div>
      
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
    </div>
  );
};

export default CancelledJobsPage;
