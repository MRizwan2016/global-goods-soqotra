
import React from "react";

const CompanyLogo: React.FC = () => {
  return (
    <div className="w-[140px] flex-shrink-0 mr-6">
      <img 
        src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
        alt="Soqotra Logo" 
        className="h-16 object-contain" 
      />
      <div className="text-sm mt-1 font-medium text-blue-600">SOQOTRA</div>
    </div>
  );
};

export default CompanyLogo;
