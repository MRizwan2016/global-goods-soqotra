
import React from "react";
import Layout from "@/components/layout/Layout";
import VehicleManagementHeader from "./components/vehicle-management/VehicleManagementHeader";
import VehicleList from "./components/vehicle-management/VehicleList";
import VehicleFilters from "./components/vehicle-management/VehicleFilters";

const VehicleManagement: React.FC = () => {
  return (
    <Layout title="Qatar Vehicle Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <VehicleManagementHeader />
        <div className="p-4 flex flex-col gap-4">
          <VehicleFilters />
          <VehicleList />
        </div>
      </div>
    </Layout>
  );
};

export default VehicleManagement;
