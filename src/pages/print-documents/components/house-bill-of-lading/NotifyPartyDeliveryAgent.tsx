
import React from "react";

interface NotifyPartyDeliveryAgentProps {
  notifyParty: string;
  notifyPartyAddress: string;
  deliveryAgent: string;
}

const NotifyPartyDeliveryAgent: React.FC<NotifyPartyDeliveryAgentProps> = ({
  notifyParty,
  notifyPartyAddress,
  deliveryAgent
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">NOTIFY PARTY</h2>
        <p>{notifyParty}</p>
        <p className="text-sm">{notifyPartyAddress}</p>
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">DELIVERY AGENT</h2>
        <p>{deliveryAgent}</p>
      </div>
    </div>
  );
};

export default NotifyPartyDeliveryAgent;
