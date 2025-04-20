
import React from "react";
import { Button } from "@/components/ui/button";
import { PackageInfo } from "./types";
import { PlusCircle } from "lucide-react";

interface PackageTableRowProps {
  pkg: PackageInfo;
  onSelectPackage: (pkg: PackageInfo) => void;
}

const PackageTableRow: React.FC<PackageTableRowProps> = ({ pkg, onSelectPackage }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-2 py-2 text-center border-r border-gray-200">{pkg.sr_no}</td>
      <td className="px-2 py-2 border-r border-gray-200">{pkg.description}</td>
      <td className="px-2 py-2 text-center border-r border-gray-200">{pkg.dimensions}</td>
      <td className="px-2 py-2 text-center border-r border-gray-200">{pkg.volume_in_meters}</td>
      <td className="px-2 py-2 text-right border-r border-gray-200">{pkg.price}</td>
      <td className="px-2 py-2 text-right border-r border-gray-200">{pkg.documents_fee}</td>
      <td className="px-2 py-2 text-right">{pkg.total}</td>
      <td className="px-2 py-2">
        <Button
          className="flex items-center bg-blue-600 hover:bg-blue-700"
          size="sm"
          onClick={() => onSelectPackage(pkg)}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add
        </Button>
      </td>
    </tr>
  );
};

export default PackageTableRow;
