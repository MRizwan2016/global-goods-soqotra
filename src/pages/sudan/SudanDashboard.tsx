
import React from "react";
import Layout from "@/components/layout/Layout";

const SudanDashboard = () => {
  return (
    <Layout title="Sudan Dashboard">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-10 flag-icon flag-sudan rounded"></div>
          <h1 className="text-2xl font-bold">Sudan</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">About Sudan</h2>
            <p className="text-gray-700">
              Sudan, officially the Republic of Sudan, is a country in Northeast Africa. 
              It is bordered by Egypt to the north, Libya to the northwest, Chad to the west, 
              and the Central African Republic to the southwest. The capital city is Khartoum.
              Sudan has a rich history as part of ancient Nubia and is home to numerous 
              archaeological sites.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Shipping Information</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Main Port: Port Sudan</li>
              <li>Shipping Duration: 12-15 days from UAE</li>
              <li>Available Services: Door-to-Door, Port-to-Port</li>
              <li>Custom Clearance: 2-3 business days</li>
              <li>Special Requirements: Import permit required for electronics</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Sudan Shipping Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["UAE → Port Sudan", "Qatar → Port Sudan", "Saudi Arabia → Port Sudan"].map((route, idx) => (
              <div key={idx} className="border border-gray-200 p-3 rounded-md hover:bg-gray-50">
                <p className="font-medium text-gray-800">{route}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Management Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Invoice Management</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.href = '/sudan/invoice/add'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Create New Invoice
            </button>
            <button 
              onClick={() => window.location.href = '/reports/cargo'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Search Invoices
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SudanDashboard;
