
import React, { useState, useMemo } from "react";
import { useJobForm } from "../context/JobFormContext";
import { sectorOptions } from "../../../data/sectorOptions";
import { branchOptions } from "../../../data/branchOptions";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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

  const availableBranches = useMemo(() => {
    return jobData.sector ? branchOptions[jobData.sector] || [] : [];
  }, [jobData.sector]);

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
          value={jobData.sector || ""}
          onValueChange={(value) => handleSelectChange("sector", value)}
        >
          <SelectTrigger id="sector" className="w-full">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            {sectorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="branch">BRANCH:</Label>
        <Select
          value={jobData.branch || ""}
          onValueChange={(value) => handleSelectChange("branch", value)}
          disabled={!jobData.sector}
        >
          <SelectTrigger id="branch" className="w-full">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {availableBranches.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
