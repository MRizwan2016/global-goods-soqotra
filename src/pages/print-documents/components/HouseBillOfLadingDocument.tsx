
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
            <p>BL Number: {blNumber}</p>
            <p>Date: {date}</p>
          </div>
        </div>

        {/* Shipper & Consignee */}
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

        {/* Notify Party & Delivery Agent */}
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

        {/* Ports */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF LOADING</h2>
            <p>{portOfLoading}</p>
          </div>
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF DISCHARGE</h2>
            <p>{portOfDischarge}</p>
          </div>
        </div>

        {/* Container & Seal Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">CONTAINER NO</h2>
            <p>{containerNo}</p>
          </div>
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">SEAL NO</h2>
            <p>{sealNo}</p>
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
                  {marks}
                </td>
                <td className="border-2 border-black p-3 align-top min-h-[200px]">
                  <p className="font-bold mb-2">SHIPPER'S LOAD, COUNT & SEAL</p>
                  <p className="mb-2">SAID TO CONTAIN:</p>
                  <div className="whitespace-pre-line">
                    {formatDescription(description)}
                  </div>
                  
                  {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
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
                <td className="border-2 border-black p-2 text-center align-middle">{weight}</td>
                <td className="border-2 border-black p-2 text-center align-middle">{volume}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Freight & Packages */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">FREIGHT DETAILS</h2>
            <p>FREIGHT {freightPrepaid ? "PREPAID" : "COLLECT"}</p>
            <p>PACKAGES: {packages}</p>
          </div>
          <div className="border-2 border-black p-3">
            <h2 className="font-bold border-b border-black pb-1 mb-1">ADDITIONAL INFORMATION</h2>
            <p>VESSEL/VOYAGE: {vessel}</p>
            <p>FINAL DESTINATION: {finalDestination}</p>
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
            <p>{dateOfIssue}</p>
            <p className="mt-6 text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
