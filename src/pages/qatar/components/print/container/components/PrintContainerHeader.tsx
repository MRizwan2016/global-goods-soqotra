
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
        <div className="logo-container flex justify-center mb-4">
          <img 
            src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
            alt="SOQOTRA LOGO" 
            className="h-20 w-auto object-contain"
            style={{ maxWidth: '200px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.style.display = 'none';
              console.error('Failed to load logo image');
            }}
          />
        </div>
        <h1 className="text-xl font-bold text-center my-4 uppercase">CONTAINER MANIFEST</h1>
      </div>
      
      <div className="container-details p-4 border border-gray-300 rounded-md mb-6 bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><strong>CONTAINER NUMBER:</strong> {containerNumber}</p>
            <p className="mb-2"><strong>CONTAINER TYPE:</strong> {containerType}</p>
            <p className="mb-2"><strong>SEAL NUMBER:</strong> {sealNumber || "N/A"}</p>
          </div>
          <div>
            <p className="mb-2"><strong>CONFIRMATION DATE:</strong> {confirmDate}</p>
            <p className="mb-2"><strong>TOTAL PACKAGES:</strong> {totalPackages}</p>
            <p className="mb-2"><strong>TOTAL VOLUME:</strong> {formatVolume(totalVolume)} m³</p>
            <p className="mb-2"><strong>TOTAL WEIGHT:</strong> {formatWeight(totalWeight)} kg</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintContainerHeader;
