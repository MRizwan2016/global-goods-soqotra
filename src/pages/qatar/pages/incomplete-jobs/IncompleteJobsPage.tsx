
import React, { useState, useEffect } from "react";
import { JobStorageService } from "../../services/JobStorageService";
import JobListPage from "../../components/job-list/JobListPage";
import IncompleteJobsTable from "../../components/incomplete-jobs/IncompleteJobsTable";
import { Button } from "@/components/ui/button";
import { Plus, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRScannerDialog } from "../../components/qr-scanner";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const IncompleteJobsPage = () => {
  const navigate = useNavigate();
  const [scannerOpen, setScannerOpen] = useState(false);
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

  const handleScheduleFound = (scheduleData: any) => {
    console.log("Schedule found:", scheduleData);
    // Navigate to schedule details or show schedule information
    if (scheduleData.scheduleNumber) {
      navigate(`/qatar/job-schedule-print?schedule=${scheduleData.scheduleNumber}`);
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">INCOMPLETE JOBS</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setScannerOpen(true)} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <QrCode className="h-4 w-4" />
            Scan QR Code
          </Button>
          <Button 
            onClick={handleCreateNewJob}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Job
          </Button>
        </div>
      </div>

      <JobListPage
        headerTitle="VIEW INCOMPLETE JOB LIST"
        headerSubtitle="Record Listed."
        headerClassName="bg-green-50 border-green-100"
        reportTitle="INCOMPLETE JOBS REPORT"
        jobs={jobs}
        sectors={sectors}
        initialStatus="PENDING"
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
      
      <QRScannerDialog
        open={scannerOpen}
        onOpenChange={setScannerOpen}
        onScheduleFound={handleScheduleFound}
      />
    </div>
  );
};

export default IncompleteJobsPage;
