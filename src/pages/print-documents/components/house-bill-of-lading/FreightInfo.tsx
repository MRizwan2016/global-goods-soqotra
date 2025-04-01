
import React from "react";

interface FreightInfoProps {
  freightPrepaid: boolean;
  packages: string;
  vessel: string;
  finalDestination: string;
}

const FreightInfo: React.FC<FreightInfoProps> = ({
  freightPrepaid,
  packages,
  vessel,
  finalDestination
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">FREIGHT DETAILS</h2>
        <p>FREIGHT {freightPrepaid ? "PREPAID" : "COLLECT"}</p>
        <p>PACKAGES: {packages}</p>
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">ADDITIONAL INFORMATION</h2>
        <p>VESSEL/VOYAGE: {vessel}</p>
        <p>FINAL DESTINATION: {finalDestination}</p>
      </div>
    </div>
  );
};

export default FreightInfo;
