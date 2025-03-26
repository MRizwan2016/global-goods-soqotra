
import React from "react";
import { Ship } from "lucide-react";

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
    <div className="bg-blue-50 p-4 rounded-md mb-6 border-l-4 border-blue-500">
      <div className="flex items-center text-blue-700 mb-2">
        <Ship size={20} className="mr-2" />
        <h3 className="font-semibold">Container Cargo Summary</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="font-medium">Total Packages:</span> {totalPackages}
        </div>
        <div>
          <span className="font-medium">Total Volume:</span> {formatVolume(totalVolume)} m³
        </div>
        <div>
          <span className="font-medium">Total Weight:</span> {formatWeight(totalWeight)} kg
        </div>
      </div>
    </div>
  );
};

export default CargoSummary;
