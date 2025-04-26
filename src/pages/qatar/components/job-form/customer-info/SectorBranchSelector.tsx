
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
import SelectedPackagesList from "./SelectedPackagesList";

interface SectorBranchSelectorProps {
  onPackageSelect?: (pkg: PackageInfo) => void;
}

const SectorBranchSelector: React.FC<SectorBranchSelectorProps> = ({ onPackageSelect }) => {
  const { jobData, handleInputChange, handleSelectChange } = useJobForm();
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<PackageInfo[]>([]);

  const availableSectors = useMemo(() => {
    return jobData.country ? sectorOptions[jobData.country as keyof typeof sectorOptions] || [] : [];
  }, [jobData.country]);

  const availableBranches = useMemo(() => {
    if (!jobData.country || !jobData.sector) return [];
    return branchOptions[jobData.country as keyof typeof branchOptions]?.[jobData.sector] || [];
  }, [jobData.country, jobData.sector]);

  const handlePackageSelect = (pkg: PackageInfo) => {
    if (!selectedPackages.some(p => p.sr_no === pkg.sr_no)) {
      setSelectedPackages(prev => [...prev, pkg]);
      if (onPackageSelect) {
        onPackageSelect(pkg);
      }
    }
  };

  const handleRemovePackage = (pkg: PackageInfo) => {
    setSelectedPackages(prev => prev.filter(p => p.sr_no !== pkg.sr_no));
  };

  return (
    <>
      <div>
        <Label>SECTOR:</Label>
        <Select
          value={jobData.sector || ""}
          onValueChange={(value) => handleSelectChange("sector", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            {availableSectors.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>BRANCH:</Label>
        <Select
          value={jobData.branch || ""}
          onValueChange={(value) => handleSelectChange("branch", value)}
          disabled={!jobData.sector}
        >
          <SelectTrigger className="w-full">
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

      <div className="md:col-span-2">
        <SelectedPackagesList 
          selectedPackages={selectedPackages}
          onRemovePackage={handleRemovePackage}
        />
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
