
import React from "react";

const CustomsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Somalia Customs Operations</h3>
      <p className="text-gray-700">
        Our customs expertise in Somalia helps navigate the complex and evolving regulatory environment.
        We work closely with authorities in different regions to ensure compliant and efficient customs clearance.
      </p>
      
       <div className="bg-[#f0f3f8] border border-[#d6dce8] rounded-lg p-6">
        <h4 className="font-medium text-[#1e2a3a] mb-3">Customs Clearance Services</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Region-specific customs documentation preparation</span>
          </li>
          <li className="flex items-start">
             <span className="inline-flex items-center justify-center bg-[#d6dce8] text-[#3b5998] rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Duty and tax management for different administrative zones</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Import/export compliance with local and international regulations</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Special permits for restricted or regulated goods</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center bg-purple-100 text-purple-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
            <span className="text-gray-700">Assistance with temporary import regulations</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomsTab;
