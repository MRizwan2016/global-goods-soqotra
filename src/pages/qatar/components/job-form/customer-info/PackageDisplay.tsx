
import React from "react";

interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
  boxNumber?: string;
}

interface PackageDisplayProps {
  selectedPackage: PackageInfo | null;
}

const PackageDisplay = ({ selectedPackage }: PackageDisplayProps) => {
  if (!selectedPackage) return null;
  
  return (
    <div className="md:col-span-2 p-3 bg-blue-50 rounded-md border border-blue-100">
      <h4 className="font-medium text-blue-800 mb-1">Selected Package:</h4>
      <div className="text-sm text-blue-700">
        <p><strong>Box {selectedPackage.boxNumber || selectedPackage.sr_no}: {selectedPackage.description}</strong> - Dimensions: {selectedPackage.dimensions}</p>
        <p>Volume: {selectedPackage.volume_in_meters} m³ - Price: {selectedPackage.price} - Total: {selectedPackage.total}</p>
      </div>
    </div>
  );
};

export default PackageDisplay;
