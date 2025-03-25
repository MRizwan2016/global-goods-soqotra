
import React from "react";
import { QatarVessel } from "../mockVesselData";

interface VesselDetailsProps {
  vessel: QatarVessel;
}

const VesselDetails: React.FC<VesselDetailsProps> = ({ vessel }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium mb-3 text-lg">Vessel Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="text-gray-600">Running Number:</div>
          <div className="font-medium">{vessel.runningNumber}</div>
          
          <div className="text-gray-600">Vessel Name:</div>
          <div className="font-medium">{vessel.vesselName || "Not Set"}</div>
          
          <div className="text-gray-600">Voyage:</div>
          <div className="font-medium">{vessel.voyage || "Not Set"}</div>
          
          <div className="text-gray-600">Port of Loading:</div>
          <div className="font-medium">{vessel.portOfLoading || "Not Set"}</div>
          
          <div className="text-gray-600">Port of Discharge:</div>
          <div className="font-medium">{vessel.portOfDischarge || "Not Set"}</div>
          
          <div className="text-gray-600">Direction:</div>
          <div className="font-medium">{vessel.direction}</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium mb-3 text-lg">Schedule Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="text-gray-600">ETD:</div>
          <div className="font-medium">{vessel.etd || "Not Set"}</div>
          
          <div className="text-gray-600">ETA:</div>
          <div className="font-medium">{vessel.eta || "Not Set"}</div>
          
          <div className="text-gray-600">Master B/L:</div>
          <div className="font-medium">{vessel.masterBL || "Not Set"}</div>
          
          <div className="text-gray-600">Shipping Line:</div>
          <div className="font-medium">{vessel.shippingLine || "Not Set"}</div>
          
          <div className="text-gray-600">Sector:</div>
          <div className="font-medium">{vessel.sector}</div>
          
          <div className="text-gray-600">Containers:</div>
          <div className="font-medium">{vessel.containers?.length || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default VesselDetails;
