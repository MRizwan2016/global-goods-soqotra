
import React from "react";

const WarehousesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Somalia Warehouse Network</h3>
      <p className="text-gray-700">
        Our warehouse facilities in Somalia provide secure storage and distribution services in key locations.
        These facilities are designed to meet the specific security and operational requirements of the region.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Warehouse Facilities</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Mogadishu: 6,500 sq m secure compound near port</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Berbera: 4,800 sq m warehouse with cold storage</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Kismayo: 3,200 sq m facility with 24/7 security</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Bosaso: 2,500 sq m warehouse serving Puntland region</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">All facilities equipped with backup power and advanced security</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WarehousesTab;
