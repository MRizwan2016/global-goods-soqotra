
import React from "react";
import { QatarContainer } from "../../../types/containerTypes";

interface ContainerDetailsProps {
  container: QatarContainer;
}

const ContainerDetails: React.FC<ContainerDetailsProps> = ({ container }) => {
  const formatVolume = (volume?: number) => volume ? volume.toFixed(3) : "0.000";
  const formatWeight = (weight?: number) => weight ? weight.toFixed(2) : "0.00";
  
  // Format packages - fallback to a default value if not available
  const packages = container.packages || 0;
  const volume = container.volume || 0;
  const weight = container.weight || 0;

  return (
    <div className="bg-gray-50 border rounded-md p-4 mb-6 print-visible shadow-sm">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold uppercase">CONTAINER MANIFEST</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
        <div className="flex">
          <div className="font-bold w-52">CONTAINER NUMBER:</div>
          <div>{container.containerNumber}</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">CONFIRMATION DATE:</div>
          <div>{container.confirmDate || new Date().toLocaleDateString()}</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">CONTAINER TYPE:</div>
          <div>{container.containerType}</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">TOTAL PACKAGES:</div>
          <div>{packages}</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">SEAL NUMBER:</div>
          <div>{container.sealNumber || "N/A"}</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">TOTAL VOLUME:</div>
          <div>{formatVolume(volume)} m³</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">RUNNING NUMBER:</div>
          <div>{container.runningNumber || "N/A"}</div>
        </div>
        
        <div className="flex">
          <div className="font-bold w-52">TOTAL WEIGHT:</div>
          <div>{formatWeight(weight)} kg</div>
        </div>
      </div>
    </div>
  );
};

export default ContainerDetails;
