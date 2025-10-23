import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import CustomerTrackingPortal from "./components/tracking/CustomerTrackingPortal";

const KenyaCustomerPortal = () => {
  return (
    <Layout title="Kenya Customer Portal">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <BackButton to="/kenya" />
          <h1 className="text-2xl font-bold mt-2">Kenya Customer Portal</h1>
          <p className="text-gray-600">Track your cargo shipments and get real-time delivery updates</p>
        </div>
        
        <CustomerTrackingPortal />
      </div>
    </Layout>
  );
};

export default KenyaCustomerPortal;