
import React from "react";

interface BillOfLadingDocumentProps {
  blData: any;
}

const BillOfLadingDocument: React.FC<BillOfLadingDocumentProps> = ({ blData }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">HOUSE BILL OF LADING</h1>
        <p className="text-sm text-center mb-1">SOQOTRA SHIPPING & LOGISTICS</p>
        <p className="text-sm text-center">Not Negotiable Unless Consigned to Order</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h2 className="font-bold mb-1">Shipper:</h2>
          <p>{blData.shipper}</p>
          <p className="text-sm">{blData.shipperAddress}</p>
        </div>
        <div className="border p-3">
          <h2 className="font-bold mb-1">Bill of Lading Number:</h2>
          <p>{blData.blNumber}</p>
          <h2 className="font-bold mt-2 mb-1">Date:</h2>
          <p>{blData.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h2 className="font-bold mb-1">Consignee:</h2>
          <p>{blData.consignee}</p>
          <p className="text-sm">{blData.consigneeAddress}</p>
        </div>
        <div className="border p-3">
          <h2 className="font-bold mb-1">Notify Party:</h2>
          <p>{blData.notifyParty}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h2 className="font-bold mb-1">Vessel / Voyage:</h2>
          <p>{blData.vessel} / {blData.voyage}</p>
        </div>
        <div className="border p-3">
          <h2 className="font-bold mb-1">Port of Loading:</h2>
          <p>{blData.portOfLoading}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h2 className="font-bold mb-1">Port of Discharge:</h2>
          <p>{blData.portOfDischarge}</p>
        </div>
        <div className="border p-3">
          <h2 className="font-bold mb-1">Final Destination:</h2>
          <p>{blData.finalDestination}</p>
        </div>
      </div>

      <div className="border p-3 mb-6">
        <h2 className="font-bold mb-2">Cargo Details:</h2>
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="col-span-1">
            <p className="font-semibold">Packages:</p>
            <p>{blData.packages}</p>
          </div>
          <div className="col-span-1">
            <p className="font-semibold">Weight:</p>
            <p>{blData.weight}</p>
          </div>
          <div className="col-span-1">
            <p className="font-semibold">Volume:</p>
            <p>{blData.volume}</p>
          </div>
          <div className="col-span-1">
            <p className="font-semibold">Marks:</p>
            <p>{blData.marks}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold">Description of Goods:</p>
          <p>{blData.description}</p>
        </div>
      </div>

      <div className="border p-3 mb-6">
        <h2 className="font-bold mb-2">Special Instructions:</h2>
        <p>{blData.specialInstructions}</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="border-t border-gray-400 pt-2">
            <p className="font-bold">Shipper's Signature</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-gray-400 pt-2">
            <p className="font-bold">Carrier's Signature</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-center">
        <p>This Bill of Lading is subject to the standard terms and conditions of SOQOTRA SHIPPING & LOGISTICS</p>
      </div>
    </div>
  );
};

export default BillOfLadingDocument;
