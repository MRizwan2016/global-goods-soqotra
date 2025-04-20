
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Package } from "lucide-react";
import { useJobForm } from "../context/JobFormContext";
import SectorSelector from "./SectorSelector";
import BranchSelector from "./BranchSelector";
import PackageSelectionDialog from "./PackageSelectionDialog";
import { PackageInfo } from "../details/packages/types";

interface SectorBranchSelectorProps {
  onPackageSelect: (pkg: PackageInfo) => void;
}

const SectorBranchSelector: React.FC<SectorBranchSelectorProps> = ({ onPackageSelect }) => {
  const { jobData, handleSelectChange } = useJobForm();
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <SectorSelector 
          sector={jobData.sector || ''} 
          onSectorChange={(value) => handleSelectChange('sector', value)} 
        />
        
        <BranchSelector 
          sector={jobData.sector || ''} 
          branch={jobData.branch || ''} 
          onBranchChange={(value) => handleSelectChange('branch', value)}
        />
        
        <div>
          <Button
            type="button"
            onClick={() => setIsPackageDialogOpen(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700"
          >
            <Package className="h-4 w-4 mr-2" />
            PACKAGES
          </Button>
        </div>
      </div>
      
      <PackageSelectionDialog 
        open={isPackageDialogOpen} 
        onOpenChange={setIsPackageDialogOpen}
        onSelectPackage={onPackageSelect}
      />
    </>
  );
};

export default SectorBranchSelector;
