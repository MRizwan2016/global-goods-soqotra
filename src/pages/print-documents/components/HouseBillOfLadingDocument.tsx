
import React from "react";

interface HouseBillOfLadingProps {
  blData: any;
}

const HouseBillOfLadingDocument: React.FC<HouseBillOfLadingProps> = ({ blData }) => {
  if (!blData) {
    return (
      <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md text-center">
        <h2 className="text-xl text-red-500">Bill of Lading data not available</h2>
        <p className="mt-2">The requested Bill of Lading could not be loaded.</p>
      </div>
    );
  }

  // Format description to handle vehicle details
  const formatDescription = (description: string) => {
    if (!description) return "";
    
    // Check if description contains vehicle information
    if (description.toLowerCase().includes("car") || 
        description.toLowerCase().includes("vehicle") || 
        description.toLowerCase().includes("truck")) {
      // Try to format vehicle information more prominently
      const lines = description.split("\n");
      return (
        <>
          {lines.map((line, index) => (
            <div key={index} className={line.toLowerCase().includes("vehicle") || line.toLowerCase().includes("car") || line.toLowerCase().includes("truck") ? "font-bold" : ""}>
              {line}
            </div>
          ))}
        </>
      );
    }
    
    return description;
  };

  return (
    <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md">
      <div className="border-2 border-black p-8">
        {/* Header with Logo */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <div className="flex justify-center mb-3">
            <img src="/lovable-uploads/09288c32-edf3-48e9-9839-a23ae45397ae.png" alt="Soqotra Logo" className="h-16" />
          </div>
          <p className="text-sm mb-2">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
          <h1 className="text-2xl font-bold">HOUSE BILL OF LADING (H-BL)</h1>
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
                <td className="border-2 border-black p-3 align-top min-h-[120px]">
                  <p className="font-bold mb-2">SHIPPER'S LOAD, COUNT & SEAL</p>
                  <p className="mb-2">SAID TO CONTAIN:</p>
                  <div className="whitespace-pre-line">
                    {formatDescription(blData.description)}
                  </div>
                  
                  {blData.cargoType && blData.cargoType.toLowerCase() === "car" && (
                    <div className="mt-3 border-t pt-2 border-gray-400">
                      <p className="font-bold">VEHICLE DETAILS:</p>
                      {blData.vehicleMake && <p>Make: {blData.vehicleMake}</p>}
                      {blData.vehicleModel && <p>Model: {blData.vehicleModel}</p>}
                      {blData.vehicleYear && <p>Year: {blData.vehicleYear}</p>}
                      {blData.vehicleColor && <p>Color: {blData.vehicleColor}</p>}
                      {blData.chassisNumber && <p>Chassis/VIN: {blData.chassisNumber}</p>}
                    </div>
                  )}
                </td>
                <td className="border-2 border-black p-2 text-center align-middle">{blData.weight}</td>
                <td className="border-2 border-black p-2 text-center align-middle">{blData.volume}</td>
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
            <p className="mt-6 text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
