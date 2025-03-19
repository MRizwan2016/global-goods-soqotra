
import React from "react";
import Layout from "@/components/layout/Layout";
import FindCustomerForm from "./components/find-customer/FindCustomerForm";

const FindCustomer: React.FC = () => {
  return (
    <Layout title="Qatar Find Customer">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-blue-50 p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-800">FIND CUSTOMER</h1>
          <p className="text-blue-600 text-sm">Search for customers by location or details</p>
        </div>
        <div className="p-4">
          <FindCustomerForm />
        </div>
      </div>
    </Layout>
  );
};

export default FindCustomer;
