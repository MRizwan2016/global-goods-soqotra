
import React from "react";
import { PackageInfo } from "./types";

interface PackageTableRowProps {
  pkg: PackageInfo;
  onSelect: (pkg: PackageInfo) => void;
}

const PackageTableRow = ({ pkg, onSelect }: PackageTableRowProps) => {
  return (
    <tr 
      key={pkg.sr_no} 
      className="hover:bg-gray-50 text-xs cursor-pointer"
      onClick={() => onSelect(pkg)}
    >
      <td className="px-2 py-2 text-center border-r border-b border-gray-200">{pkg.sr_no}</td>
      <td className="px-2 py-2 border-r border-b border-gray-200">{pkg.description}</td>
      <td className="px-2 py-2 text-center border-r border-b border-gray-200">{pkg.dimensions}</td>
      <td className="px-2 py-2 text-center border-r border-b border-gray-200">{pkg.volume_in_meters}</td>
      <td className="px-2 py-2 text-right border-r border-b border-gray-200">{pkg.price}</td>
      <td className="px-2 py-2 text-right border-r border-b border-gray-200">{pkg.documents_fee}</td>
      <td className="px-2 py-2 text-right border-b border-gray-200">{pkg.total}</td>
    </tr>
  );
};

export default PackageTableRow;
