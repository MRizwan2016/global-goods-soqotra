
import React from "react";

const CompanyLogo: React.FC = () => {
  return (
    <div className="w-[100px] flex-shrink-0 mr-4">
      <img 
        src="/soqotra-logo.png" 
        alt="Soqotra Logo" 
        className="h-12 object-contain" 
      />
    </div>
  );
};

export default CompanyLogo;
