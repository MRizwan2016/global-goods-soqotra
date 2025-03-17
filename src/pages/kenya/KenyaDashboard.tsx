
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { mockDeliveries } from "./data/mockDeliveryData";
import { getDeliveryStats, cargoByCounty, monthlyShipments, CHART_COLORS } from "./utils/dashboardUtils";

// Import components
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCards from "./components/dashboard/StatCards";
import CFSInformation from "./components/dashboard/CFSInformation";
import DeliveryCharts from "./components/dashboard/DeliveryCharts";
import RecentDeliveries from "./components/dashboard/RecentDeliveries";

const KenyaDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    inTransit: 0,
    pending: 0
  });
  
  useEffect(() => {
    setStats(getDeliveryStats());
    setIsLoaded(true);
  }, []);

  return (
    <Layout title="Kenya Operations Dashboard">
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <DashboardHeader />
        
        {/* Stats Overview */}
        <StatCards stats={stats} />
        
        {/* CFS Information */}
        <CFSInformation />
        
        {/* Charts */}
        <DeliveryCharts 
          monthlyShipments={monthlyShipments} 
          cargoByCounty={cargoByCounty} 
          chartColors={CHART_COLORS}
        />
        
        {/* Recent Deliveries */}
        <RecentDeliveries deliveries={mockDeliveries} />
      </div>
    </Layout>
  );
};

export default KenyaDashboard;
