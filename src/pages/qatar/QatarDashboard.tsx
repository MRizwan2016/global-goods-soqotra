
import React from "react";
import Layout from "@/components/layout/Layout";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCards from "./components/dashboard/StatCards";
import PendingJobs from "./components/dashboard/PendingJobs";
import JobListing from "./components/dashboard/JobListing";
import VehicleStatistics from "./components/dashboard/VehicleStatistics";
import { DailyJobForecast, VehicleStats } from "./types/jobTypes";
import { useJobData } from "./hooks/useJobData";
import { useJobManagement } from "./hooks/useJobManagement";

const QatarDashboard = () => {
  const { 
    isLoading, 
    getRecentJobs, 
    getPendingJobs 
  } = useJobData();

  const {
    realJobs,
    jobStats,
    vehicleStats
  } = useJobManagement();
  
  // Get recent jobs for the listing (use real jobs only)
  const recentJobs = getRecentJobs().filter(job => 
    !job.jobNumber.includes('TEST') && 
    !job.jobNumber.includes('DUMMY') && 
    !job.customer.includes('TEST') &&
    !job.customer.includes('DUMMY')
  );
  
  // Real job forecasts from actual pending jobs (last 7 days)
  const jobForecasts: DailyJobForecast[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const dayStr = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    const dayJobs = realJobs.filter(job => job.date === dateStr);
    return {
      date: dateStr,
      day: dayStr,
      totalJobs: dayJobs.length,
      deliveries: dayJobs.filter(job => job.jobType === 'DELIVERY').length,
      collections: dayJobs.filter(job => job.jobType === 'COLLECTION').length
    };
  });
  
  // Real vehicle statistics from actual jobs
  const vehicleStatsArray: VehicleStats[] = Object.entries(vehicleStats).map(([vehicle, stats]) => ({
    vehicle,
    totalJobs: stats.total,
    deliveries: realJobs.filter(job => job.vehicle === vehicle && job.jobType === 'DELIVERY').length,
    collections: realJobs.filter(job => job.vehicle === vehicle && job.jobType === 'COLLECTION').length
  }));
  
  const vehicleTotals = {
    totalJobs: vehicleStatsArray.reduce((sum, stat) => sum + stat.totalJobs, 0),
    totalDeliveries: vehicleStatsArray.reduce((sum, stat) => sum + stat.deliveries, 0),
    totalCollections: vehicleStatsArray.reduce((sum, stat) => sum + stat.collections, 0),
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
      <StatCards stats={jobStats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <JobListing jobs={recentJobs} />
        </div>
        <div>
          <PendingJobs jobForecasts={jobForecasts} />
        </div>
      </div>
      <VehicleStatistics 
        vehicleStats={vehicleStatsArray} 
        totals={vehicleTotals} 
      />
    </Layout>
  );
};

export default QatarDashboard;
