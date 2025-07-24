
import React from "react";

interface CompanyInfoProps {
  logo: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ logo }) => {
  return (
    <div className="flex items-center justify-between mb-6 border-b pb-4">
      <div className="flex items-center">
        <img 
          src={logo} 
          alt="Soqotra Logo" 
          className="h-12 mr-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png";
            console.log("Using fallback logo path");
          }}
        />
        <div>
          <h2 className="font-bold text-gray-800 text-lg">SOQOTRA LOGISTICS SERVICES,</h2>
          <p className="text-sm text-gray-600">TRANSPORTATION & TRADING WLL.</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
