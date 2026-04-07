import React from "react";

interface BillOfLadingDocumentProps {
  blData: any;
  onBLDataChange?: (fieldName: string, value: string) => void;
  editable?: boolean;
}

const BillOfLadingDocument: React.FC<BillOfLadingDocumentProps> = ({ blData, onBLDataChange, editable = false }) => {
  if (!blData) {
    return (
      <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md text-center">
        <h2 className="text-xl text-red-500">Bill of Lading data not available</h2>
        <p className="mt-2">The requested Bill of Lading could not be loaded.</p>
      </div>
    );
  }

  // Safe access to properties
  const shipper = blData?.shipper || 'N/A';
  const shipperAddress = blData?.shipperAddress || 'N/A';
  const blNumber = blData?.blNumber || 'N/A';
  const date = blData?.date || 'N/A';
  const consignee = blData?.consignee || 'N/A';
  const consigneeAddress = blData?.consigneeAddress || 'N/A';
  const notifyParty = blData?.notifyParty || 'SAME AS CONSIGNEE';
  const notifyPartyAddress = blData?.notifyPartyAddress || '';
  const deliveryAgent = blData?.deliveryAgent || 'N/A';
  const vessel = blData?.vessel || 'N/A';
  const voyage = blData?.voyage || 'N/A';
  const portOfLoading = blData?.portOfLoading || 'N/A';
  const portOfDischarge = blData?.portOfDischarge || 'N/A';
  const finalDestination = blData?.finalDestination || blData?.portOfDischarge || 'N/A';
  const packages = blData?.packages || '0';
  const weight = blData?.weight || '0';
  const volume = blData?.volume || '0';
  const marks = blData?.marks || 'N/A';
  const description = blData?.description || '';
  const specialInstructions = blData?.specialInstructions || 'N/A';
  const cargoType = blData?.cargoType || '';
  const containerNo = blData?.containerNo || 'N/A';
  const sealNo = blData?.sealNo || 'N/A';

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
            <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Soqotra Logo" className="h-16" />
          </div>
          <p className="text-sm mb-2">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
          <h1 className="text-2xl font-bold">MASTER BILL OF LADING (M-BL)</h1>
          <p className="text-sm">NOT NEGOTIABLE UNLESS CONSIGNED TO ORDER</p>
        </div>

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
          <div className="border p-3">
            <h2 className="font-bold mb-1">Notify Party:</h2>
            <p>{notifyParty}</p>
            <p className="text-sm">{notifyPartyAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border p-3">
            <h2 className="font-bold mb-1">Delivery Agent:</h2>
            <p>{deliveryAgent}</p>
          </div>
          <div className="border p-3">
            <h2 className="font-bold mb-1">Vessel / Voyage:</h2>
            <p>{vessel} / {voyage}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border p-3">
            <h2 className="font-bold mb-1">Port of Loading:</h2>
            <p>{portOfLoading}</p>
          </div>
          <div className="border p-3">
            <h2 className="font-bold mb-1">Port of Discharge:</h2>
            <p>{portOfDischarge}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border p-3">
            <h2 className="font-bold mb-1">Container No:</h2>
            <p>{containerNo}</p>
          </div>
          <div className="border p-3">
            <h2 className="font-bold mb-1">Seal No:</h2>
            <p>{sealNo}</p>
          </div>
        </div>

        <div className="border p-3 mb-6">
          <h2 className="font-bold mb-2">Cargo Details:</h2>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="col-span-1">
              <p className="font-semibold">Packages:</p>
              <p>{packages}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold">Weight:</p>
              <p>{weight}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold">Volume:</p>
              <p>{volume}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold">Marks:</p>
              <p>{marks}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Description of Goods:</p>
            <div className="whitespace-pre-line min-h-[150px]">
              {formatDescription(description)}
            </div>
            
            {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
              <div className="mt-3 border-t pt-2 border-gray-400">
                <p className="font-semibold">VEHICLE DETAILS:</p>
                {blData.vehicleMake && <p>Make: {blData.vehicleMake}</p>}
                {blData.vehicleModel && <p>Model: {blData.vehicleModel}</p>}
                {blData.vehicleYear && <p>Year: {blData.vehicleYear}</p>}
                {blData.vehicleColor && <p>Color: {blData.vehicleColor}</p>}
                {blData.chassisNumber && <p>Chassis/VIN: {blData.chassisNumber}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="border p-3 mb-6">
          <h2 className="font-bold mb-2">Special Instructions:</h2>
          <p>{specialInstructions}</p>
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
          <p>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
        </div>
      </div>
    </div>
  );
};

export default BillOfLadingDocument;
