
import React from "react";

const CarriersTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Somalia Carrier Network</h3>
      <p className="text-gray-700">
        Our carrier network in Somalia combines international shipping connections with local transportation partnerships.
        We've developed reliable routes that prioritize security while maintaining efficient delivery schedules.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Carrier Partnerships</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Regular shipping services from Middle East and East Africa</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Vetted local transportation companies with security protocols</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Specialized carriers for humanitarian and aid shipments</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Air freight solutions for urgent deliveries</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Coastal shipping services connecting port cities</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarriersTab;
