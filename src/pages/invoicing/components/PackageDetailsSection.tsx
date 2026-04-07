
import React from "react";
import PackageSelector from "./PackageSelector";
import PackageList from "./PackageList";
import { PackageOption } from "@/data/packageOptions";
import { PackageItem } from "../types/invoiceForm";

interface PackageDetailsSectionProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  handleManualPackage?: (packageName: string, price: string, dimensions?: string, volume?: string, pricingType?: string, docsFee?: string) => void;
  handleAddPackage: () => void;
  packageItems: PackageItem[];
  handleRemovePackage: (id: string) => void;
  dbPackageTypes?: any[];
}

const PackageDetailsSection: React.FC<PackageDetailsSectionProps> = ({
  formState,
  handleInputChange,
  packageOptions,
  handlePackageSelect,
  handleManualPackage,
  handleAddPackage,
  packageItems,
  handleRemovePackage,
  dbPackageTypes,
}) => {
  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white py-2 px-4 font-medium flex justify-between items-center">
        <span className="uppercase">PACKAGES DETAILS</span>
      </div>
      
      <PackageSelector 
        formState={formState}
        handleInputChange={handleInputChange}
        packageOptions={packageOptions}
        handlePackageSelect={handlePackageSelect}
        handleManualPackage={handleManualPackage}
        handleAddPackage={handleAddPackage}
        packageItems={packageItems}
        dbPackageTypes={dbPackageTypes}
      />
      
      <PackageList 
        packageItems={packageItems}
        handleRemovePackage={handleRemovePackage}
      />
    </div>
  );
};

export default PackageDetailsSection;
