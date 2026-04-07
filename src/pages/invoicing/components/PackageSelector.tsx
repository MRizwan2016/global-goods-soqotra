
import React, { useState } from "react";
import { PackageOption } from "@/data/packageOptions";
import DimensionsInputs from "./package-selector/DimensionsInputs";
import PriceFields from "./package-selector/PriceFields";
import PackageNameSelector from "./package-selector/PackageNameSelector";
import EnhancedManualPackageDialog from "./package-selector/EnhancedManualPackageDialog";
import AddPackageButton from "./package-selector/AddPackageButton";
import { PackageItem } from "../types/invoiceForm";

interface PackageSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  handleManualPackage?: (packageName: string, price: string, dimensions?: string, volume?: string, pricingType?: string, docsFee?: string) => void;
  handleAddPackage: () => void;
  packageItems: PackageItem[];
  dbPackageTypes?: any[];
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  formState,
  handleInputChange,
  packageOptions,
  handlePackageSelect,
  handleManualPackage,
  handleAddPackage,
  packageItems,
  dbPackageTypes,
}) => {
  const [showManualDialog, setShowManualDialog] = useState(false);

  const submitManualPackage = (packageName: string, price: string) => {
    if (handleManualPackage) {
      handleManualPackage(packageName, price);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <PackageNameSelector 
        formState={formState}
        packageOptions={packageOptions}
        handlePackageSelect={handlePackageSelect}
        onOpenManualDialog={() => setShowManualDialog(true)}
        dbPackageTypes={dbPackageTypes}
      />
      
      <PriceFields 
        formState={formState}
        handleInputChange={handleInputChange}
      />
      
      <DimensionsInputs 
        formState={formState}
        handleInputChange={handleInputChange}
        packageItems={packageItems}
      />
      
      <AddPackageButton handleAddPackage={handleAddPackage} />

      <EnhancedManualPackageDialog 
        open={showManualDialog} 
        onOpenChange={setShowManualDialog}
        onSubmit={(name, price, dimensions, volume, pricingType, docsFee) => {
          if (handleManualPackage) {
            handleManualPackage(name, price, dimensions, volume, pricingType, docsFee);
          }
        }}
      />
    </div>
  );
};

export default PackageSelector;
