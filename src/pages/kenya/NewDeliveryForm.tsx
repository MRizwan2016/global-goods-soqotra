
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";

const NewDeliveryForm = () => {
  return (
    <Layout title="New Delivery">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4">
          <BackButton to="/kenya/deliveries" />
        </div>
        <h1>New Delivery Form Content</h1>
      </div>
    </Layout>
  );
};

export default NewDeliveryForm;
