
import React from "react";
import { Edit } from "lucide-react";
import { PackageOption } from "@/data/packageOptions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PackageNameSelectorProps {
  formState: any;
  packageOptions: PackageOption[];
  handlePackageSelect: (description: string) => void;
  onOpenManualDialog: () => void;
}

const PackageNameSelector: React.FC<PackageNameSelectorProps> = ({
  formState,
  packageOptions,
  handlePackageSelect,
  onOpenManualDialog,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">PACKAGES NAME:</label>
      <div className="flex gap-2">
        <Select 
          onValueChange={handlePackageSelect}
          value={formState.packagesName || ""}
        >
          <SelectTrigger className="bg-blue-500 text-white py-2 px-3 rounded text-sm w-full">
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {packageOptions.map(pkg => (
              <SelectItem key={pkg.id} value={pkg.description}>
                {pkg.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onOpenManualDialog}
          className="flex-shrink-0"
        >
          <Edit size={18} />
        </Button>
      </div>
    </div>
  );
};

export default PackageNameSelector;
