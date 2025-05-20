
import React from "react";

const DeliveriesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Philippines Delivery Operations</h3>
      <p className="text-gray-700">
        Our delivery operations in the Philippines span the entire archipelago, with specialized services for island-to-island logistics.
        We maintain a fleet of delivery vehicles and work with local partners to ensure reliable last-mile delivery across all major islands.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-800 mb-3">Delivery Network Highlights</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Coverage of all 3 major island groups: Luzon, Visayas, and Mindanao</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Same-day delivery within major metropolitan areas</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Inter-island delivery services via ferry, RORO, and air freight</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Real-time shipment tracking available for all deliveries</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Specialized handling for remote and rural deliveries</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveriesTab;
