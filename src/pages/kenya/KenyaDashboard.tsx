
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";

const KenyaDashboard = () => {
  return (
    <Layout title="Kenya Dashboard">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4">
          <BackButton to="/" />
        </div>
        <h1>Kenya Dashboard Content</h1>
      </div>
    </Layout>
  );
};

export default KenyaDashboard;
