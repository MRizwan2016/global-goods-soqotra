
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
  handleManualPackage?: (packageName: string, price: string) => void;
  handleAddPackage: () => void;
  packageItems: PackageItem[];
  handleRemovePackage: (id: string) => void;
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
}) => {
  return (
    <div className="mt-8">
      <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
        PACKAGES DETAILS
      </div>
      
      <PackageSelector 
        formState={formState}
        handleInputChange={handleInputChange}
        packageOptions={packageOptions}
        handlePackageSelect={handlePackageSelect}
        handleManualPackage={handleManualPackage}
        handleAddPackage={handleAddPackage}
        packageItems={packageItems}
      />
      
      <PackageList 
        packageItems={packageItems}
        handleRemovePackage={handleRemovePackage}
      />
    </div>
  );
};

export default PackageDetailsSection;
