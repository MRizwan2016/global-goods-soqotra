
import React from "react";

interface NotifyPartyDeliveryAgentProps {
  notifyParty: string;
  notifyPartyAddress: string;
  deliveryAgent: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const NotifyPartyDeliveryAgent: React.FC<NotifyPartyDeliveryAgentProps> = ({
  notifyParty,
  notifyPartyAddress,
  deliveryAgent,
  editable = false,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">NOTIFY PARTY</h2>
        {editable ? (
          <>
            <input
              type="text"
              name="notifyParty"
              value={notifyParty}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1 mb-1"
            />
            <textarea
              name="notifyPartyAddress"
              value={notifyPartyAddress}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1 text-sm"
              rows={2}
            />
          </>
        ) : (
          <>
            <p>{notifyParty}</p>
            <p className="text-sm">{notifyPartyAddress}</p>
          </>
        )}
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">DELIVERY AGENT</h2>
        {editable ? (
          <input
            type="text"
            name="deliveryAgent"
            value={deliveryAgent}
            onChange={onChange}
            className="w-full border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{deliveryAgent}</p>
        )}
      </div>
    </div>
  );
};

export default NotifyPartyDeliveryAgent;
