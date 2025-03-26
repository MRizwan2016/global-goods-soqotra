
import React from "react";

interface PrintContainerHeaderProps {
  containerNumber: string;
  containerType: string;
  sealNumber?: string;
  confirmDate: string;
  totalPackages: number;
  totalVolume: number;
  totalWeight: number;
  formatVolume: (volume: number) => string;
  formatWeight: (weight: number) => string;
}

const PrintContainerHeader: React.FC<PrintContainerHeaderProps> = ({
  containerNumber,
  containerType,
  sealNumber,
  confirmDate,
  totalPackages,
  totalVolume,
  totalWeight,
  formatVolume,
  formatWeight
}) => {
  return (
    <>
      <div className="print-header">
        <div className="logo-container">
          <img src="/soqotra-logo.png" alt="SOQOTRA LOGO" className="h-16" />
        </div>
        <h1 className="text-xl font-bold text-center my-4 uppercase">CONTAINER MANIFEST</h1>
      </div>
      
      <div className="container-details p-4 border rounded-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>CONTAINER NUMBER:</strong> {containerNumber}</p>
            <p><strong>CONTAINER TYPE:</strong> {containerType}</p>
            <p><strong>SEAL NUMBER:</strong> {sealNumber || "N/A"}</p>
          </div>
          <div>
            <p><strong>CONFIRMATION DATE:</strong> {confirmDate}</p>
            <p><strong>TOTAL PACKAGES:</strong> {totalPackages}</p>
            <p><strong>TOTAL VOLUME:</strong> {formatVolume(totalVolume)} m³</p>
            <p><strong>TOTAL WEIGHT:</strong> {formatWeight(totalWeight)} kg</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintContainerHeader;
