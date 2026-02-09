
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import StatCards from "./components/dashboard/StatCards";
import DeliveryCharts from "./components/dashboard/DeliveryCharts";
import RecentDeliveries from "./components/dashboard/RecentDeliveries";
import { getDeliveryStats, cargoByCounty, monthlyShipments, CHART_COLORS } from "./utils/dashboardUtils";
import { mockDeliveries } from "./data/mockDeliveryData";
import DashboardHeader from "./components/dashboard/DashboardHeader";

const KenyaDashboard = () => {
  const stats = getDeliveryStats();

  return (
    <Layout title="Kenya Dashboard">
      <div className="bg-[#f8f9fb] rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <BackButton to="/" />
            <h1 className="text-2xl font-bold mt-2 text-[#1e2a3a]">Kenya Operations Dashboard</h1>
            <p className="text-gray-600">Overview of delivery operations in Kenya</p>
          </div>
        </div>
        
        <DashboardHeader />
        <StatCards stats={stats} />
        <DeliveryCharts 
          monthlyShipments={monthlyShipments}
          cargoByCounty={cargoByCounty}
          chartColors={CHART_COLORS}
        />
        <RecentDeliveries deliveries={mockDeliveries} />
      </div>
    </Layout>
  );
};

export default KenyaDashboard;
