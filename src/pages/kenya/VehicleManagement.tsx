
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";

const VehicleManagement = () => {
  return (
    <Layout title="Vehicle Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4">
          <BackButton to="/kenya/deliveries" />
          <h1 className="text-2xl font-bold mt-2">Kenya Vehicle Management</h1>
        </div>
        <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-center text-gray-500">Vehicle management content will be implemented here</p>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleManagement;
