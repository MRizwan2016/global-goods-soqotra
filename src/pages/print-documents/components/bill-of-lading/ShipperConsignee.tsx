
import React from "react";

interface ShipperConsigneeProps {
  shipper: string;
  shipperAddress: string;
  blNumber: string;
  date: string;
  consignee: string;
  consigneeAddress: string;
}

const ShipperConsignee: React.FC<ShipperConsigneeProps> = ({ 
  shipper, 
  shipperAddress, 
  blNumber, 
  date, 
  consignee, 
  consigneeAddress 
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h2 className="font-bold mb-1">Shipper:</h2>
          <p>{shipper}</p>
          <p className="text-sm">{shipperAddress}</p>
        </div>
        <div className="border p-3">
          <h2 className="font-bold mb-1">Bill of Lading Number:</h2>
          <p>{blNumber}</p>
          <h2 className="font-bold mt-2 mb-1">Date:</h2>
          <p>{date}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h2 className="font-bold mb-1">Consignee:</h2>
          <p>{consignee}</p>
          <p className="text-sm">{consigneeAddress}</p>
        </div>
      </div>
    </>
  );
};

export default ShipperConsignee;
