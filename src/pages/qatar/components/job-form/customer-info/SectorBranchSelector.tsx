
import React, { useState } from "react";
import { useJobForm } from "../context/JobFormContext";
import { sectorOptions } from "../../../data/sectorOptions";
import { branchOptions } from "../../../data/branchOptions";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PackageSelectionDialog from "./PackageSelectionDialog";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { PackageInfo } from "../details/packages/types";

interface SectorBranchSelectorProps {
  onPackageSelect?: (pkg: PackageInfo) => void;
}

const SectorBranchSelector: React.FC<SectorBranchSelectorProps> = ({ onPackageSelect }) => {
  const { jobData, handleInputChange, handleSelectChange } = useJobForm();
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  const handlePackageSelect = (pkg: PackageInfo) => {
    if (onPackageSelect) {
      onPackageSelect(pkg);
    }
  };

  return (
    <>
      <div>
        <Label htmlFor="sector">SECTOR:</Label>
        <Select
          id="sector"
          name="sector"
          placeholder="Select Sector"
          value={jobData.sector || ""}
          onValueChange={(value) => handleSelectChange("sector", value)}
        />
      </div>

      <div>
        <Label htmlFor="branch">BRANCH:</Label>
        <Select
          id="branch"
          name="branch"
          placeholder="Select Branch"
          value={jobData.branch || ""}
          onValueChange={(value) => handleSelectChange("branch", value)}
        />
      </div>
      
      <div className="flex flex-col">
        <Label>PACKAGES:</Label>
        <Button 
          type="button" 
          onClick={() => setIsPackageDialogOpen(true)}
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          <Package size={16} />
          PACKAGES
        </Button>
      </div>

      <PackageSelectionDialog
        open={isPackageDialogOpen}
        onOpenChange={setIsPackageDialogOpen}
        onSelectPackage={handlePackageSelect}
      />
    </>
  );
};

export default SectorBranchSelector;
