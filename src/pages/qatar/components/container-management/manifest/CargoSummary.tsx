
import React from "react";
import { Ship, Package, Scale, BoxesStacked } from "lucide-react";

interface CargoSummaryProps {
  totalPackages: number;
  totalVolume: number;
  totalWeight: number;
  formatVolume: (volume: number) => string;
  formatWeight: (weight: number) => string;
}

const CargoSummary: React.FC<CargoSummaryProps> = ({
  totalPackages,
  totalVolume,
  totalWeight,
  formatVolume,
  formatWeight
}) => {
  return (
    <div className="bg-blue-50 p-4 rounded-md mb-6 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center text-blue-700 mb-3">
        <Ship size={20} className="mr-2" />
        <h3 className="font-semibold">Container Cargo Summary</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center bg-white p-3 rounded-md border border-blue-100">
          <BoxesStacked size={18} className="text-blue-500 mr-2" />
          <div>
            <span className="text-xs text-gray-500 block">Total Packages</span>
            <span className="font-medium text-lg">{totalPackages}</span>
          </div>
        </div>
        <div className="flex items-center bg-white p-3 rounded-md border border-blue-100">
          <Package size={18} className="text-blue-500 mr-2" />
          <div>
            <span className="text-xs text-gray-500 block">Total Volume</span>
            <span className="font-medium text-lg">{formatVolume(totalVolume)} m³</span>
          </div>
        </div>
        <div className="flex items-center bg-white p-3 rounded-md border border-blue-100">
          <Scale size={18} className="text-blue-500 mr-2" />
          <div>
            <span className="text-xs text-gray-500 block">Total Weight</span>
            <span className="font-medium text-lg">{formatWeight(totalWeight)} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoSummary;
