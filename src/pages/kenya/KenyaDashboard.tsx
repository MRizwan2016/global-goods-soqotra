
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import StatCards from "./components/dashboard/StatCards";
import DeliveryCharts from "./components/dashboard/DeliveryCharts";
import RecentDeliveries from "./components/dashboard/RecentDeliveries";
import { getDeliveryStats, cargoByCounty, monthlyShipments, CHART_COLORS } from "./utils/dashboardUtils";
import { mockDeliveries } from "./data/mockDeliveryData";

const KenyaDashboard = () => {
  // Get stats from the utility function
  const stats = getDeliveryStats();

  return (
    <Layout title="Kenya Dashboard">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <BackButton to="/" />
            <h1 className="text-2xl font-bold mt-2">Kenya Operations Dashboard</h1>
            <p className="text-gray-600">Overview of delivery operations in Kenya</p>
          </div>
        </div>
        
        {/* Stats summary cards */}
        <StatCards stats={stats} />
        
        {/* Charts */}
        <DeliveryCharts 
          monthlyShipments={monthlyShipments}
          cargoByCounty={cargoByCounty}
          chartColors={CHART_COLORS}
        />
        
        {/* Recent deliveries table */}
        <RecentDeliveries deliveries={mockDeliveries} />
      </div>
    </Layout>
  );
};

export default KenyaDashboard;
