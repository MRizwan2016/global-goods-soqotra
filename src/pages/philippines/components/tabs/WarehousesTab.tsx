
import React from "react";

const WarehousesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Philippines Warehouse Network</h3>
      <p className="text-gray-700">
        Our strategically located warehouses throughout the Philippines provide efficient storage, distribution, and fulfillment services.
        These facilities serve as critical nodes in our logistics network, enabling fast delivery and effective inventory management.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Warehouse Facilities</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Manila: 12,000 sq m primary distribution center</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Cebu: 8,500 sq m warehouse serving central Philippines</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Davao: 6,200 sq m facility for Mindanao operations</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Clark: 4,500 sq m bonded warehouse facility</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Satellite facilities in Iloilo, Zamboanga, and Baguio</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WarehousesTab;
