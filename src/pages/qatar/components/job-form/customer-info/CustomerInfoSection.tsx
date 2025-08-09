
import React, { useState } from "react";
import { toast } from "sonner";
import CustomerBasicInfo from "./CustomerBasicInfo";
import CountrySelector from "./CountrySelector";
import SectorBranchSelector from "./SectorBranchSelector";
import SelectedPackagesList from "./SelectedPackagesList";
import RemarksTextarea from "./RemarksTextarea";
import { useJobForm } from "../context/JobFormContext";
import { PackageInfo } from "../details/packages/types";

const CustomerInfoSection = () => {
  const { handleInputChange, setJobData } = useJobForm();
  const [selectedPackages, setSelectedPackages] = useState<PackageInfo[]>([]);
  
  const handlePackageSelect = (pkg: PackageInfo) => {
    const { setJobData } = useJobForm();
    
    // Check if package is already selected
    if (selectedPackages.some(p => p.sr_no === pkg.sr_no)) {
      toast.error("This package is already selected");
      return;
    }
    
    setSelectedPackages(prev => [...prev, pkg]);
    
    // Update the packageDetails string with detailed package information
    const updatedPackages = [...selectedPackages, pkg];
    const packageInfo = updatedPackages
      .map(p => `${p.description} | Dimensions: ${p.dimensions} | Volume: ${p.volume_in_meters} CBM | Price: ${p.price} | Total: ${p.total}`)
      .join(" || ");
    
    // Calculate total amount from selected packages
    const totalAmount = updatedPackages.reduce((sum, p) => {
      const priceNumber = parseFloat(p.price.replace(/[^\d.]/g, '')) || 0;
      return sum + priceNumber;
    }, 0);
    
    // Update both packageDetails and advanceAmount
    setJobData(prevData => ({
      ...prevData,
      packageDetails: packageInfo,
      advanceAmount: totalAmount
    }));
    
    toast.success(`Package added: ${pkg.description}`);
  };

  const handleRemovePackage = (pkg: PackageInfo) => {
    const { setJobData } = useJobForm();
    
    setSelectedPackages(prev => prev.filter(p => p.sr_no !== pkg.sr_no));
    
    // Update packageDetails without the removed package
    const updatedPackages = selectedPackages.filter(p => p.sr_no !== pkg.sr_no);
    const packageInfo = updatedPackages.length > 0
      ? updatedPackages
          .map(p => `${p.description} | Dimensions: ${p.dimensions} | Volume: ${p.volume_in_meters} CBM | Price: ${p.price} | Total: ${p.total}`)
          .join(" || ")
      : "";
    
    // Calculate total amount from remaining packages
    const totalAmount = updatedPackages.reduce((sum, p) => {
      const priceNumber = parseFloat(p.price.replace(/[^\d.]/g, '')) || 0;
      return sum + priceNumber;
    }, 0);
    
    // Update both packageDetails and advanceAmount
    setJobData(prevData => ({
      ...prevData,
      packageDetails: packageInfo,
      advanceAmount: totalAmount
    }));
    
    toast.success(`Package removed: ${pkg.description}`);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PERSONAL EFFECTS CUSTOMER INFORMATION</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerBasicInfo />
        <CountrySelector />
        <SectorBranchSelector onPackageSelect={handlePackageSelect} />
        <div className="md:col-span-2">
          <SelectedPackagesList 
            selectedPackages={selectedPackages}
            onRemovePackage={handleRemovePackage}
          />
        </div>
        <RemarksTextarea />
      </div>
    </div>
  );
};

export default CustomerInfoSection;
