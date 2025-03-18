
import React, { useState } from "react";
import { PackageOption } from "@/data/packageOptions";
import DimensionsInputs from "./package-selector/DimensionsInputs";
import PriceFields from "./package-selector/PriceFields";
import PackageNameSelector from "./package-selector/PackageNameSelector";
import ManualPackageDialog from "./package-selector/ManualPackageDialog";
import AddPackageButton from "./package-selector/AddPackageButton";

interface PackageSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  handleManualPackage?: (packageName: string, price: string) => void;
  handleAddPackage: () => void;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  formState,
  handleInputChange,
  packageOptions,
  handlePackageSelect,
  handleManualPackage,
  handleAddPackage,
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
      />
      
      <PriceFields 
        formState={formState}
        handleInputChange={handleInputChange}
      />
      
      <DimensionsInputs 
        formState={formState}
        handleInputChange={handleInputChange}
      />
      
      <AddPackageButton handleAddPackage={handleAddPackage} />

      <ManualPackageDialog 
        open={showManualDialog} 
        onOpenChange={setShowManualDialog}
        onSubmit={submitManualPackage}
      />
    </div>
  );
};

export default PackageSelector;
