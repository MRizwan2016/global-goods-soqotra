
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

  // Safe access to blData properties
  const blNumber = blData?.blNumber || 'N/A';
  const date = blData?.date || 'N/A';
  const shipper = blData?.shipper || 'N/A';
  const shipperAddress = blData?.shipperAddress || 'N/A';
  const shipperPhone = blData?.shipperPhone || 'N/A';
  const consignee = blData?.consignee || 'N/A';
  const consigneeAddress = blData?.consigneeAddress || 'N/A';
  const consigneeIdNumber = blData?.consigneeIdNumber || 'N/A';
  const notifyParty = blData?.notifyParty || 'SAME AS CONSIGNEE';
  const notifyPartyAddress = blData?.notifyPartyAddress || '';
  const deliveryAgent = blData?.deliveryAgent || 'N/A';
  const portOfLoading = blData?.portOfLoading || 'N/A';
  const portOfDischarge = blData?.portOfDischarge || 'N/A';
  const marks = blData?.marks || 'AS ADDRESSED';
  const description = blData?.description || '';
  const weight = blData?.weight || '0';
  const volume = blData?.volume || '0';
  const packages = blData?.packages || '1';
  const freightPrepaid = blData?.freightPrepaid || false;
  const vessel = blData?.vessel || 'TBA';
  const finalDestination = blData?.finalDestination || blData?.portOfDischarge || 'N/A';
  const dateOfIssue = blData?.dateOfIssue || blData?.date || 'N/A';
  const cargoType = blData?.cargoType || '';
  const containerNo = blData?.containerNo || 'N/A';
  const sealNo = blData?.sealNo || 'N/A';

  return (
    <div className="max-w-[210mm] mx-auto bg-white p-6 shadow-md house-bill-of-lading-document">
      <div className="border-2 border-black p-4">
        {/* Header with Logo */}
        <div className="text-center border-b-2 border-black pb-2 mb-3">
          <div className="flex justify-center mb-2">
            <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Soqotra Logo" className="h-12" />
          </div>
          <p className="text-xs mb-1">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
          <h1 className="text-xl font-bold">HOUSE BILL OF LADING (H-BL)</h1>
          <p className="text-xs">NOT NEGOTIABLE UNLESS CONSIGNED TO ORDER</p>
        </div>

        {/* Document Details */}
        <div className="flex justify-end mb-2">
          <div className="font-bold text-sm">
            <p>BL Number: <span className="bl-number break-words overflow-visible">{blNumber}</span></p>
            <p>Date: {date}</p>
          </div>
        </div>

        {/* Shipper & Consignee */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">SHIPPER</h2>
            <p className="text-sm">{shipper}</p>
            <p className="text-xs">{shipperAddress}</p>
            <p className="text-xs">TEL: {shipperPhone}</p>
          </div>
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">CONSIGNEE</h2>
            <p className="text-sm">{consignee}</p>
            <p className="text-xs">{consigneeAddress}</p>
            <p className="text-xs">ID/PASSPORT: {consigneeIdNumber}</p>
          </div>
        </div>

        {/* Notify Party & Delivery Agent */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">NOTIFY PARTY</h2>
            <p className="text-sm">{notifyParty}</p>
            <p className="text-xs">{notifyPartyAddress}</p>
          </div>
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">DELIVERY AGENT</h2>
            <p className="text-sm">{deliveryAgent}</p>
          </div>
        </div>

        {/* Ports */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">PORT OF LOADING</h2>
            <p className="text-sm">{portOfLoading}</p>
          </div>
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">PORT OF DISCHARGE</h2>
            <p className="text-sm">{portOfDischarge}</p>
          </div>
        </div>

        {/* Container & Seal Details */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">CONTAINER NO</h2>
            <p className="text-sm">{containerNo}</p>
          </div>
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">SEAL NO</h2>
            <p className="text-sm">{sealNo}</p>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="mb-2">
          <table className="w-full border-collapse border-2 border-black text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black p-1 w-1/6 text-xs">MARKS & NUMBERS</th>
                <th className="border-2 border-black p-1 w-3/6 text-xs">DESCRIPTION OF GOODS</th>
                <th className="border-2 border-black p-1 w-1/6 text-xs">GROSS WEIGHT (KG)</th>
                <th className="border-2 border-black p-1 w-1/6 text-xs">MEASUREMENT (CBM)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-black p-1 align-top" rowSpan={1}>
                  {marks}
                </td>
                <td className="border-2 border-black p-2 align-top min-h-[150px] whitespace-pre-line break-words">
                  <p className="font-bold text-xs mb-1">SHIPPER'S LOAD, COUNT & SEAL</p>
                  <p className="text-xs mb-1">SAID TO CONTAIN:</p>
                  <div className="text-xs whitespace-pre-line break-words">
                    {formatDescription(description)}
                  </div>
                  
                  {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
                    <div className="mt-2 border-t pt-1 border-gray-400">
                      <p className="font-bold text-xs">VEHICLE DETAILS:</p>
                      {blData.vehicleMake && <p className="text-xs">Make: {blData.vehicleMake}</p>}
                      {blData.vehicleModel && <p className="text-xs">Model: {blData.vehicleModel}</p>}
                      {blData.vehicleYear && <p className="text-xs">Year: {blData.vehicleYear}</p>}
                      {blData.vehicleColor && <p className="text-xs">Color: {blData.vehicleColor}</p>}
                      {blData.chassisNumber && <p className="text-xs">Chassis/VIN: {blData.chassisNumber}</p>}
                    </div>
                  )}
                </td>
                <td className="border-2 border-black p-1 text-center align-middle">{weight}</td>
                <td className="border-2 border-black p-1 text-center align-middle">{volume}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Freight & Packages */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">FREIGHT DETAILS</h2>
            <p className="text-sm">FREIGHT {freightPrepaid ? "PREPAID" : "COLLECT"}</p>
            <p className="text-sm">PACKAGES: {packages}</p>
          </div>
          <div className="border-2 border-black p-2">
            <h2 className="font-bold border-b border-black pb-1 mb-1 text-sm">ADDITIONAL INFORMATION</h2>
            <p className="text-sm">VESSEL/VOYAGE: {vessel}</p>
            <p className="text-sm">FINAL DESTINATION: {finalDestination}</p>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <div>
            <p className="font-bold text-sm mb-4">FOR THE CARRIER:</p>
            <div className="border-t border-black w-36 pt-1">
              <p className="text-center text-xs">AUTHORIZED SIGNATURE</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-sm">DATE OF ISSUE:</p>
            <p className="text-sm">{dateOfIssue}</p>
            <p className="mt-3 text-xs">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
