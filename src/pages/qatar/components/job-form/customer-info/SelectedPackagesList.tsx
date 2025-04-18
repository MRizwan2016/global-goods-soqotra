
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageInfo } from "../details/packages/types";

interface SelectedPackagesListProps {
  selectedPackages: PackageInfo[];
  onRemovePackage: (pkg: PackageInfo) => void;
}

const SelectedPackagesList = ({ selectedPackages, onRemovePackage }: SelectedPackagesListProps) => {
  if (selectedPackages.length === 0) return null;
  
  return (
    <div className="space-y-2">
      {selectedPackages.map((pkg) => (
        <div 
          key={`${pkg.sr_no}-${pkg.description}`} 
          className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-100"
        >
          <div className="text-sm text-blue-700">
            <p><strong>{pkg.description}</strong></p>
            <p>Dimensions: {pkg.dimensions} - Volume: {pkg.volume_in_meters} m³</p>
            <p>Price: {pkg.price} - Total: {pkg.total}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => onRemovePackage(pkg)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SelectedPackagesList;
