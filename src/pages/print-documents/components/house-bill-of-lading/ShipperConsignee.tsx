
import React from "react";

interface ShipperConsigneeProps {
  shipper: string;
  shipperAddress: string;
  shipperPhone: string;
  consignee: string;
  consigneeAddress: string;
  consigneeIdNumber: string;
}

const ShipperConsignee: React.FC<ShipperConsigneeProps> = ({
  shipper,
  shipperAddress,
  shipperPhone,
  consignee,
  consigneeAddress,
  consigneeIdNumber
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">SHIPPER</h2>
        <p>{shipper}</p>
        <p className="text-sm">{shipperAddress}</p>
        <p>TEL: {shipperPhone}</p>
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">CONSIGNEE</h2>
        <p>{consignee}</p>
        <p className="text-sm">{consigneeAddress}</p>
        <p>ID/PASSPORT: {consigneeIdNumber}</p>
      </div>
    </div>
  );
};

export default ShipperConsignee;
