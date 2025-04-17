
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
}

interface PackageButtonProps {
  onSelectPackage?: (pkg: PackageInfo) => void;
}

const PackageButton = ({ onSelectPackage }: PackageButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const packageOptions: PackageInfo[] = [
    {
      sr_no: 1,
      description: "1 METER WOODEN BOX",
      dimensions: "48 x 32 x 36",
      volume_in_meters: 0.928,
      price: "QAR 338.55",
      documents_fee: "QAR 0.00",
      total: "QAR 338.55"
    },
    {
      sr_no: 2,
      description: "1.5 METER WOODEN BOX",
      dimensions: "48 x 36 x 48",
      volume_in_meters: 1.391,
      price: "QAR 507.83",
      documents_fee: "QAR 50.00",
      total: "QAR 557.83"
    },
    {
      sr_no: 3,
      description: "2 METER WOODEN BOX",
      dimensions: "48 x 48 x 48",
      volume_in_meters: 1.855,
      price: "QAR 677.10",
      documents_fee: "QAR 50.00",
      total: "QAR 727.10"
    },
    {
      sr_no: 4,
      description: "2.5 METER WOODEN BOX",
      dimensions: "60 x 48 x 48",
      volume_in_meters: 2.319,
      price: "QAR 846.38",
      documents_fee: "QAR 50.00",
      total: "QAR 896.38"
    },
    {
      sr_no: 5,
      description: "3 METER WOODEN BOX",
      dimensions: "72 x 48 x 48",
      volume_in_meters: 2.783,
      price: "QAR 1,015.65",
      documents_fee: "QAR 50.00",
      total: "QAR 1,065.65"
    },
    {
      sr_no: 6,
      description: "4 METER WOODEN BOX",
      dimensions: "96 x 48 x 48",
      volume_in_meters: 3.710,
      price: "QAR 1,354.20",
      documents_fee: "QAR 50.00",
      total: "QAR 1,404.20"
    },
    {
      sr_no: 7,
      description: "1.314 METER WOODEN BOX",
      dimensions: "48 x 36 x 48",
      volume_in_meters: 1.391,
      price: "QAR 507.83",
      documents_fee: "QAR 50.00",
      total: "QAR 557.83"
    },
    {
      sr_no: 8,
      description: "BULLILIT CARTON BOX",
      dimensions: "14 x 14 x 12",
      volume_in_meters: 0.039,
      price: "QAR 14.40",
      documents_fee: "QAR 0.00",
      total: "QAR 14.40"
    },
    {
      sr_no: 9,
      description: "SMALL CARTON BOX",
      dimensions: "19 x 19 x 19",
      volume_in_meters: 0.115,
      price: "QAR 41.99",
      documents_fee: "QAR 0.00",
      total: "QAR 41.99"
    },
    {
      sr_no: 10,
      description: "MEDIUM CARTON",
      dimensions: "19 x 19 x 29",
      volume_in_meters: 0.176,
      price: "QAR 64.10",
      documents_fee: "QAR 0.00",
      total: "QAR 64.10"
    },
    {
      sr_no: 11,
      description: "LARGE CARTON BOX",
      dimensions: "23 x 23 x 23",
      volume_in_meters: 0.204,
      price: "QAR 74.49",
      documents_fee: "QAR 0.00",
      total: "QAR 74.49"
    },
    {
      sr_no: 12,
      description: "EXTRA LARGE CARTON BOX",
      dimensions: "24 x 24 x 30",
      volume_in_meters: 0.290,
      price: "QAR 105.80",
      documents_fee: "QAR 0.00",
      total: "QAR 105.80"
    },
    {
      sr_no: 13,
      description: "JUMBO CARTON BOX",
      dimensions: "24 x 24 x 26",
      volume_in_meters: 0.251,
      price: "QAR 91.69",
      documents_fee: "QAR 0.00",
      total: "QAR 91.69"
    },
    {
      sr_no: 14,
      description: "SUPER JUMBO CARTON BOX",
      dimensions: "30 x 30 x 30",
      volume_in_meters: 0.453,
      price: "QAR 165.31",
      documents_fee: "QAR 0.00",
      total: "QAR 165.31"
    },
    {
      sr_no: 15,
      description: "TRAVELLING BAG",
      dimensions: "16 x 23 x 32",
      volume_in_meters: 0.198,
      price: "QAR 72.10",
      documents_fee: "QAR 0.00",
      total: "QAR 72.10"
    }
  ];

  const handlePackageSelect = (pkg: PackageInfo) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
          <Package size={16} />
          PACKAGES
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[800px] bg-white p-0" align="start">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-xs font-medium text-gray-700">
                <th className="px-2 py-2 text-left border-b border-r border-gray-200">SR NO</th>
                <th className="px-2 py-2 text-left border-b border-r border-gray-200">DESCRIPTION</th>
                <th className="px-2 py-2 text-center border-b border-r border-gray-200">DIMENSIONS</th>
                <th className="px-2 py-2 text-center border-b border-r border-gray-200">VOLUME IN METERS</th>
                <th className="px-2 py-2 text-right border-b border-r border-gray-200">PRICE</th>
                <th className="px-2 py-2 text-right border-b border-r border-gray-200">DOCUMENTS FEE</th>
                <th className="px-2 py-2 text-right border-b border-gray-200">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {packageOptions.map((pkg) => (
                <tr 
                  key={pkg.sr_no} 
                  className="hover:bg-gray-50 text-xs cursor-pointer"
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <td className="px-2 py-2 text-center border-r border-b border-gray-200">{pkg.sr_no}</td>
                  <td className="px-2 py-2 border-r border-b border-gray-200">{pkg.description}</td>
                  <td className="px-2 py-2 text-center border-r border-b border-gray-200">{pkg.dimensions}</td>
                  <td className="px-2 py-2 text-center border-r border-b border-gray-200">{pkg.volume_in_meters}</td>
                  <td className="px-2 py-2 text-right border-r border-b border-gray-200">{pkg.price}</td>
                  <td className="px-2 py-2 text-right border-r border-b border-gray-200">{pkg.documents_fee}</td>
                  <td className="px-2 py-2 text-right border-b border-gray-200">{pkg.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PackageButton;
