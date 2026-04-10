
import React from "react";

interface CompanyInfoProps {
  logo: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ logo }) => {
  return (
    <div className="flex items-center justify-between mb-3 border-b pb-3">
      <div className="flex items-center">
        <img 
          src={logo} 
          alt="Soqotra Logo" 
          className="h-8 mr-3"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/lovable-uploads/SOQO_NEW_LOGO.jpeg";
            console.log("Using fallback logo path");
          }}
        />
        <div className="space-y-1">
          <h2 className="font-bold text-[9px] leading-relaxed tracking-[0.12em] text-gray-800">SOQOTRA LOGISTICS SERVICES,</h2>
          <p className="text-[9px] leading-relaxed tracking-[0.12em] text-gray-600">TRANSPORTATION & TRADING WLL.</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
