
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { mockJobs, mockVehicles } from "./data/mockJobData";
import { VehicleStats, DailyJobForecast, JobStats, JobTotals } from "./types/vehicleTypes";

// Import components
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCards from "./components/dashboard/StatCards";
import VehicleStatistics from "./components/dashboard/VehicleStatistics";
import PendingJobs from "./components/dashboard/PendingJobs";
import JobListing from "./components/dashboard/JobListing";
import JobSearch from "./components/JobSearch";

// Create mock vehicle stats based on available vehicles
const generateMockVehicleStats = (): VehicleStats[] => {
  return mockVehicles.slice(0, 4).map((vehicle) => ({
    vehicle: vehicle.number,
    totalJobs: Math.floor(Math.random() * 50) + 10,
    deliveries: Math.floor(Math.random() * 30) + 5,
    collections: Math.floor(Math.random() * 20) + 5
  }));
};

// Create mock job forecasts
const generateMockDailyJobForecasts = (): DailyJobForecast[] => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  
  return Array(14).fill(null).map((_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    const dayName = days[date.getDay()];
    const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    
    return {
      date: dateString,
      day: dayName,
      totalJobs: Math.floor(Math.random() * 15) + 5,
      deliveries: Math.floor(Math.random() * 10) + 2,
      collections: Math.floor(Math.random() * 8) + 1
    };
  });
};

// Functions to calculate stats
const getJobStats = (): JobStats => {
  return {
    total: mockJobs.length,
    completed: mockJobs.filter(job => job.status === "COMPLETED").length,
    inProgress: mockJobs.filter(job => job.status === "IN_PROGRESS").length,
    pending: mockJobs.filter(job => job.status === "PENDING" || job.status === "SCHEDULED").length
  };
};

const getTotals = (): JobTotals => {
  return {
    totalJobs: mockJobs.length,
    totalDeliveries: mockJobs.filter(job => job.jobType === "DELIVERY").length,
    totalCollections: mockJobs.filter(job => job.jobType === "COLLECTION").length
  };
};

// Create the mock data
const mockVehicleStats = generateMockVehicleStats();
const mockDailyJobForecasts = generateMockDailyJobForecasts();

const QatarDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState<JobStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  });
  const [totals, setTotals] = useState<JobTotals>({
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
      <div className={`w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
