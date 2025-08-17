
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
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white py-2 px-4 font-medium flex justify-between items-center">
        <span>PACKAGES DETAILS</span>
        <div className="text-xs">
          Standard dimensions: Small(19×19×19), Medium(19×19×29), Large(23×23×23), 
          Extra Large(23×23×28), Jumbo(24×24×26), Super Jumbo(30×30×30), Bulilit(14×14×12)
        </div>
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
