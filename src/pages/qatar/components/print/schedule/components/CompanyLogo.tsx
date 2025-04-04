
import React from "react";

const CompanyLogo: React.FC = () => {
  return (
    <div className="w-[100px] flex-shrink-0 mr-4">
      <img 
        src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
        alt="Soqotra Logo" 
        className="h-12 object-contain" 
      />
      <div className="text-xs mt-1 font-medium text-blue-600">SOQOTRA</div>
    </div>
  );
};

export default CompanyLogo;
