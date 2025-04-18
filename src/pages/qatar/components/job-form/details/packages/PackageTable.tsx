
import React from "react";
import PackageTableHeader from "./PackageTableHeader";
import PackageTableRow from "./PackageTableRow";
import { packageOptions } from "./packageData";
import { PackageInfo } from "./types";

interface PackageTableProps {
  onSelectPackage: (pkg: PackageInfo) => void;
}

const PackageTable = ({ onSelectPackage }: PackageTableProps) => {
  return (
    <div className="overflow-auto max-h-[400px]">
      <table className="w-full border-collapse">
        <PackageTableHeader />
        <tbody>
          {packageOptions.map((pkg) => (
            <PackageTableRow 
              key={pkg.sr_no}
              pkg={pkg}
              onSelect={onSelectPackage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;
