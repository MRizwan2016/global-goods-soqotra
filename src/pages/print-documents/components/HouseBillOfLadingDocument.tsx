
import React from "react";

interface HouseBillOfLadingProps {
  blData: any;
}

const HouseBillOfLadingDocument: React.FC<HouseBillOfLadingProps> = ({ blData }) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md">
      <div className="border-2 border-black p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold">HOUSE BILL OF LADING</h1>
          <p className="text-sm">NOT NEGOTIABLE UNLESS CONSIGNED TO ORDER</p>
        </div>

        {/* Document Details */}
        <div className="flex justify-end mb-4">
          <div className="font-bold">
            <p>BL Number: {blData.blNumber}</p>
            <p>Date: {blData.date}</p>
          </div>
        </div>

        {/* Shipper & Consignee */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">SHIPPER</h2>
            <p>{blData.shipper}</p>
            <p className="text-sm">{blData.shipperAddress}</p>
            <p>TEL: {blData.shipperPhone || "N/A"}</p>
          </div>
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">CONSIGNEE</h2>
            <p>{blData.consignee}</p>
            <p className="text-sm">{blData.consigneeAddress || "N/A"}</p>
            <p>ID/PASSPORT: {blData.consigneeIdNumber || "N/A"}</p>
          </div>
        </div>

        {/* Notify Party */}
        <div className="border-2 border-black p-3 mb-6">
          <h2 className="font-bold border-b border-black pb-1 mb-1">NOTIFY PARTY</h2>
          <p>{blData.notifyParty || "SAME AS CONSIGNEE"}</p>
          <p className="text-sm">{blData.notifyPartyAddress || ""}</p>
        </div>

        {/* Ports */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF LOADING</h2>
            <p>{blData.portOfLoading}</p>
          </div>
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF DISCHARGE</h2>
            <p>{blData.portOfDischarge}</p>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="mb-6">
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr>
                <th className="border-2 border-black p-2 w-1/6">MARKS & NUMBERS</th>
                <th className="border-2 border-black p-2 w-3/6">DESCRIPTION OF GOODS</th>
                <th className="border-2 border-black p-2 w-1/6">GROSS WEIGHT (KG)</th>
                <th className="border-2 border-black p-2 w-1/6">MEASUREMENT (CBM)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-black p-2 align-top" rowSpan={1}>
                  {blData.marks || "AS ADDRESSED"}
                </td>
                <td className="border-2 border-black p-2 align-top">
                  <p className="font-bold">SHIPPER'S LOAD, COUNT & SEAL</p>
                  <p className="mb-2">SAID TO CONTAIN:</p>
                  <p>{blData.description}</p>
                </td>
                <td className="border-2 border-black p-2 text-center">{blData.weight}</td>
                <td className="border-2 border-black p-2 text-center">{blData.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Freight & Packages */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">FREIGHT DETAILS</h2>
            <p>FREIGHT {blData.freightPrepaid ? "PREPAID" : "COLLECT"}</p>
            <p>PACKAGES: {blData.packages}</p>
          </div>
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">ADDITIONAL INFORMATION</h2>
            <p>VESSEL/VOYAGE: {blData.vessel || "TBA"}</p>
            <p>FINAL DESTINATION: {blData.finalDestination || blData.portOfDischarge}</p>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold mb-8">FOR THE CARRIER:</p>
            <div className="border-t border-black w-48 pt-1">
              <p className="text-center">AUTHORIZED SIGNATURE</p>
            </div>
          </div>
          <div>
            <p className="font-bold">DATE OF ISSUE:</p>
            <p>{blData.dateOfIssue || blData.date}</p>
            <p className="mt-6 text-sm">SOQOTRA SHIPPING & LOGISTICS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
