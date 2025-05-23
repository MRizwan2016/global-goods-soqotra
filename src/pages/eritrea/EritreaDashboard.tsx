
import React from "react";
import Layout from "@/components/layout/Layout";

const EritreaDashboard = () => {
  return (
    <Layout title="Eritrea Dashboard">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-10 flag-icon flag-eritrea rounded"></div>
          <h1 className="text-2xl font-bold">Eritrea</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">About Eritrea</h2>
            <p className="text-gray-700">
              Eritrea is a country in Eastern Africa, with its capital in Asmara. 
              It is bordered by Sudan to the west, Ethiopia to the south, and Djibouti to the southeast.
              The Red Sea bounds Eritrea to the east and northeast. With a coastline that runs for more than 
              1,000 km, Eritrea has become an important shipping destination in the Horn of Africa.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">Shipping Information</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Main Port: Massawa Port</li>
              <li>Shipping Duration: 10-12 days from Gulf countries</li>
              <li>Available Services: Door-to-Door, Port-to-Port</li>
              <li>Custom Clearance: 3-4 business days</li>
              <li>Special Requirements: Consignee must provide import license</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Eritrea Shipping Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["UAE → Massawa", "Saudi Arabia → Massawa", "Qatar → Massawa"].map((route, idx) => (
              <div key={idx} className="border border-gray-200 p-3 rounded-md hover:bg-gray-50">
                <p className="font-medium text-gray-800">{route}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EritreaDashboard;
