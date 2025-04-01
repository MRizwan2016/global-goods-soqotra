
import React from "react";

interface NotifyPartyProps {
  notifyParty: string;
  notifyPartyAddress: string;
  deliveryAgent: string;
  vessel: string;
  voyage: string;
}

const NotifyParty: React.FC<NotifyPartyProps> = ({ 
  notifyParty, 
  notifyPartyAddress, 
  deliveryAgent, 
  vessel, 
  voyage 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border p-3">
        <h2 className="font-bold mb-1">Notify Party:</h2>
        <p>{notifyParty}</p>
        <p className="text-sm">{notifyPartyAddress}</p>
      </div>
      <div className="border p-3">
        <h2 className="font-bold mb-1">Delivery Agent:</h2>
        <p>{deliveryAgent}</p>
        <h2 className="font-bold mt-2 mb-1">Vessel / Voyage:</h2>
        <p>{vessel} / {voyage}</p>
      </div>
    </div>
  );
};

export default NotifyParty;
