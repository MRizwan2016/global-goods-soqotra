
import React from "react";

const DeliveriesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Somalia Delivery Operations</h3>
      <p className="text-gray-700">
        Our delivery operations in Somalia are designed to navigate the unique challenges of the region.
        We maintain secure and reliable delivery services throughout accessible areas of Somalia, with specialized protocols for various regions.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Delivery Network Highlights</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Secure delivery routes to all major cities and urban centers</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Armored vehicle options for high-value shipments</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Specialized routes for humanitarian aid deliveries</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">GPS tracking and real-time monitoring of all shipments</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Coordination with local communities for safe transit</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveriesTab;
