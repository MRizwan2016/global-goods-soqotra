
import React from "react";
import { Button } from "@/components/ui/button";
import { packageOptions } from "./packageData";
import PackageTableHeader from "./PackageTableHeader";
import PackageTableRow from "./PackageTableRow";
import { PackageInfo } from "./types";

interface PackageTableProps {
  onSelectPackage: (pkg: PackageInfo) => void;
  searchTerm?: string;
}

const PackageTable: React.FC<PackageTableProps> = ({ 
  onSelectPackage,
  searchTerm = ""
}) => {
  const filteredPackages = searchTerm 
    ? packageOptions.filter(pkg => 
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.dimensions.includes(searchTerm)
      )
    : packageOptions;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <PackageTableHeader />
        <tbody>
          {filteredPackages.map((pkg) => (
            <PackageTableRow
              key={pkg.sr_no}
              pkg={pkg}
              onSelectPackage={onSelectPackage}
            />
          ))}
          {filteredPackages.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No packages found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;
