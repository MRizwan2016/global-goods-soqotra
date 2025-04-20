
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";

const DriverManagement = () => {
  return (
    <Layout title="Driver Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4">
          <BackButton to="/kenya/deliveries" />
        </div>
        <h1>Driver Management Content</h1>
      </div>
    </Layout>
  );
};

export default DriverManagement;
