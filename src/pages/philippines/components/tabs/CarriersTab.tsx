
import React from "react";

const CarriersTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Philippines Carrier Network</h3>
      <p className="text-gray-700">
        We partner with leading shipping lines, airlines, and local transportation providers to maintain consistent and reliable service throughout the Philippines.
        Our carrier network is optimized for the unique challenges of archipelago logistics.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Carrier Partnerships</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Major international shipping lines with Philippine service</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Domestic inter-island shipping companies</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Air freight carriers for urgent deliveries</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">LTL and FTL trucking networks on major islands</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Specialized carriers for remote area delivery</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarriersTab;
