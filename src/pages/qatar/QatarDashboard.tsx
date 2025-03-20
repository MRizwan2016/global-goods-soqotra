
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCards from "./components/dashboard/StatCards";
import PendingJobs from "./components/dashboard/PendingJobs";
import JobListing from "./components/dashboard/JobListing";
import VehicleStatistics from "./components/dashboard/VehicleStatistics";
import { JobStorageService } from "./services/JobStorageService";
import { QatarJob } from "./types/jobTypes";

const QatarDashboard = () => {
  const [jobs, setJobs] = useState<QatarJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load jobs from storage
    const allJobs = JobStorageService.getAllJobs();
    setJobs(allJobs);
    setIsLoading(false);
  }, []);
  
  // Filter recent jobs (last 10)
  const recentJobs = [...jobs]
    .sort((a, b) => (b.id || '').localeCompare(a.id || ''))
    .slice(0, 10);
  
  // Filter pending jobs
  const pendingJobs = jobs.filter(job => job.status === 'PENDING');
  
  if (isLoading) {
    return (
      <Layout title="Qatar Dashboard">
        <div className="animate-pulse">Loading dashboard data...</div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Qatar Dashboard">
      <DashboardHeader />
      <StatCards 
        totalJobs={jobs.length}
        pendingJobs={pendingJobs.length}
        completedJobs={jobs.filter(job => job.status === 'COMPLETED').length}
        scheduledJobs={jobs.filter(job => job.status === 'SCHEDULED').length}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <JobListing jobs={recentJobs} />
        </div>
        <div>
          <PendingJobs jobs={pendingJobs} />
        </div>
      </div>
      <VehicleStatistics />
    </Layout>
  );
};

export default QatarDashboard;
