
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { mockJobs, mockVehicleStats, mockDailyJobForecasts, getJobStats, getTotals } from "./data/mockJobData";

// Import components
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCards from "./components/dashboard/StatCards";
import VehicleStatistics from "./components/dashboard/VehicleStatistics";
import PendingJobs from "./components/dashboard/PendingJobs";
import JobListing from "./components/dashboard/JobListing";
import JobSearch from "./components/JobSearch";

const QatarDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  });
  const [totals, setTotals] = useState({
    totalJobs: 0,
    totalDeliveries: 0,
    totalCollections: 0
  });
  
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats(getJobStats());
      setTotals(getTotals());
      setIsLoaded(true);
    }, 300);
  }, []);
  
  const handleSearch = (searchData: { sector: string, mobileNumber: string, customerName: string }) => {
    let results = [...mockJobs];
    
    if (searchData.sector) {
      results = results.filter(job => job.sector.includes(searchData.sector));
    }
    
    if (searchData.mobileNumber) {
      results = results.filter(job => job.mobileNumber.includes(searchData.mobileNumber));
    }
    
    if (searchData.customerName) {
      results = results.filter(job => 
        job.customer.toLowerCase().includes(searchData.customerName.toLowerCase())
      );
    }
    
    setFilteredJobs(results);
  };

  return (
    <Layout title="Qatar Operations Dashboard">
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <DashboardHeader />
        
        {/* Stats Overview */}
        <StatCards stats={stats} />
        
        {/* Job Search */}
        <JobSearch onSearch={handleSearch} />
        
        {/* Job Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <VehicleStatistics 
            vehicleStats={mockVehicleStats} 
            totals={totals}
          />
          <PendingJobs jobForecasts={mockDailyJobForecasts.slice(0, 10)} />
        </div>
        
        {/* Recent Jobs */}
        <JobListing jobs={filteredJobs} />
      </div>
    </Layout>
  );
};

export default QatarDashboard;
