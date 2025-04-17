
import React, { useState } from "react";
import { toast } from "sonner";
import CustomerBasicInfo from "./customer-info/CustomerBasicInfo";
import CountrySelector from "./customer-info/CountrySelector";
import SectorBranchSelector from "./customer-info/SectorBranchSelector";
import PackageDisplay from "./customer-info/PackageDisplay";
import RemarksTextarea from "./customer-info/RemarksTextarea";
import { useJobForm } from "./context/JobFormContext";

interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
}

const CustomerInfoSection = () => {
  const { handleInputChange } = useJobForm();
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
  
  const handlePackageSelect = (pkg: PackageInfo) => {
    setSelectedPackage(pkg);
    
    if (handleInputChange) {
      const packageInfo = `${pkg.description} (${pkg.dimensions}) - ${pkg.total}`;
      
      const syntheticEvent = {
        target: {
          name: 'packageDetails',
          value: packageInfo
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(syntheticEvent);
    }
    
    toast.success(`Package selected: ${pkg.description}`);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PERSONAL EFFECTS CUSTOMER INFORMATION</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerBasicInfo />
        <CountrySelector />
        <SectorBranchSelector onPackageSelect={handlePackageSelect} />
        {selectedPackage && <PackageDisplay selectedPackage={selectedPackage} />}
        <RemarksTextarea />
      </div>
    </div>
  );
};

export default CustomerInfoSection;
