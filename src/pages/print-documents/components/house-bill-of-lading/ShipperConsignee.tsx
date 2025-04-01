
import React from "react";

interface ShipperConsigneeProps {
  shipper: string;
  shipperAddress: string;
  shipperPhone: string;
  consignee: string;
  consigneeAddress: string;
  consigneeIdNumber: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShipperConsignee: React.FC<ShipperConsigneeProps> = ({
  shipper,
  shipperAddress,
  shipperPhone,
  consignee,
  consigneeAddress,
  consigneeIdNumber,
  editable = false,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">SHIPPER</h2>
        {editable ? (
          <>
            <input
              type="text"
              name="shipper"
              value={shipper}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1 mb-1"
            />
            <textarea
              name="shipperAddress"
              value={shipperAddress}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1 mb-1 text-sm"
              rows={2}
            />
            <input
              type="text"
              name="shipperPhone"
              value={shipperPhone}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1"
              placeholder="TEL:"
            />
          </>
        ) : (
          <>
            <p>{shipper}</p>
            <p className="text-sm">{shipperAddress}</p>
            <p>TEL: {shipperPhone}</p>
          </>
        )}
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">CONSIGNEE</h2>
        {editable ? (
          <>
            <input
              type="text"
              name="consignee"
              value={consignee}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1 mb-1"
            />
            <textarea
              name="consigneeAddress"
              value={consigneeAddress}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1 mb-1 text-sm"
              rows={2}
            />
            <input
              type="text"
              name="consigneeIdNumber"
              value={consigneeIdNumber}
              onChange={onChange}
              className="w-full border border-gray-300 px-2 py-1"
              placeholder="ID/PASSPORT:"
            />
          </>
        ) : (
          <>
            <p>{consignee}</p>
            <p className="text-sm">{consigneeAddress}</p>
            <p>ID/PASSPORT: {consigneeIdNumber}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ShipperConsignee;
