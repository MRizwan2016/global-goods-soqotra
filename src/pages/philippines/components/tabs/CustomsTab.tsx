
import React from "react";

const CustomsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Philippines Customs Operations</h3>
      <p className="text-gray-700">
        Our customs clearance team specializes in navigating the Philippines' import and export regulations efficiently.
        We handle all documentation, duties, and compliance requirements to ensure smooth passage through customs.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Customs Clearance Services</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Complete documentation preparation and filing</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Duty and tax calculation and payment</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Representation at customs inspections</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Special permits and licenses procurement</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Customs compliance consulting</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomsTab;
