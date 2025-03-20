
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCards from "./components/dashboard/StatCards";
import PendingJobs from "./components/dashboard/PendingJobs";
import JobListing from "./components/dashboard/JobListing";
import VehicleStatistics from "./components/dashboard/VehicleStatistics";
import { JobStorageService } from "./services/JobStorageService";
import { QatarJob, DailyJobForecast, VehicleStats } from "./types/jobTypes";

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
  
  // Generate mock data for the job forecasts (pending jobs component)
  const jobForecasts: DailyJobForecast[] = [
    { date: "2023-06-01", day: "Monday", totalJobs: 12, deliveries: 8, collections: 4 },
    { date: "2023-06-02", day: "Tuesday", totalJobs: 15, deliveries: 10, collections: 5 },
    { date: "2023-06-03", day: "Wednesday", totalJobs: 8, deliveries: 5, collections: 3 },
    { date: "2023-06-04", day: "Thursday", totalJobs: 10, deliveries: 7, collections: 3 },
    { date: "2023-06-05", day: "Friday", totalJobs: 6, deliveries: 4, collections: 2 },
  ];
  
  // Generate mock data for vehicle statistics
  const vehicleStats: VehicleStats[] = [
    { vehicle: "QTR-1234", totalJobs: 18, deliveries: 12, collections: 6 },
    { vehicle: "QTR-5678", totalJobs: 15, deliveries: 9, collections: 6 },
    { vehicle: "QTR-9012", totalJobs: 12, deliveries: 7, collections: 5 },
  ];
  
  const vehicleTotals = {
    totalJobs: vehicleStats.reduce((sum, stat) => sum + stat.totalJobs, 0),
    totalDeliveries: vehicleStats.reduce((sum, stat) => sum + stat.deliveries, 0),
    totalCollections: vehicleStats.reduce((sum, stat) => sum + stat.collections, 0),
  };
  
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
        stats={{
          total: jobs.length,
          completed: jobs.filter(job => job.status === 'COMPLETED').length,
          inProgress: jobs.filter(job => job.status === 'IN_PROGRESS').length,
          pending: pendingJobs.length
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <JobListing jobs={recentJobs} />
        </div>
        <div>
          <PendingJobs jobForecasts={jobForecasts} />
        </div>
      </div>
      <VehicleStatistics 
        vehicleStats={vehicleStats} 
        totals={vehicleTotals} 
      />
    </Layout>
  );
};

export default QatarDashboard;
