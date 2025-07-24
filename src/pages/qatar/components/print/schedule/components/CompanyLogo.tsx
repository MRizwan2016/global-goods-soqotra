
import React from "react";

const CompanyLogo: React.FC = () => {
  return (
    <div className="w-[140px] flex-shrink-0 mr-6">
      <img 
        src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
        alt="Soqotra Logo" 
        className="h-20 object-contain"
      />
      <div className="text-sm mt-1 font-medium text-blue-600">SOQOTRA</div>
    </div>
  );
};

export default CompanyLogo;
