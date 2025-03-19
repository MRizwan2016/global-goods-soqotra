
import React from "react";
import Layout from "@/components/layout/Layout";
import DriverManagementHeader from "./components/driver-management/DriverManagementHeader";
import DriverList from "./components/driver-management/DriverList";
import DriverFilters from "./components/driver-management/DriverFilters";

const DriverManagement: React.FC = () => {
  return (
    <Layout title="Qatar Driver Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <DriverManagementHeader />
        <div className="p-4 flex flex-col gap-4">
          <DriverFilters />
          <DriverList />
        </div>
      </div>
    </Layout>
  );
};

export default DriverManagement;
