
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
            target.src = "/soqotra-logo.png";
            console.log("Using fallback logo path");
          }}
        />
        <div>
          <h2 className="font-bold text-gray-800 text-lg">SOQOTRA</h2>
          <p className="text-sm text-gray-600">Shipping & Logistics</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
