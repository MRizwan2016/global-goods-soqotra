
import React from "react";
import Header from "./Header";
import ShipperConsignee from "./ShipperConsignee";
import NotifyPartyDeliveryAgent from "./NotifyPartyDeliveryAgent";
import Ports from "./Ports";
import ContainerSeal from "./ContainerSeal";
import CargoTable from "./CargoTable";
import FreightInfo from "./FreightInfo";
import Signatures from "./Signatures";

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

  const vehicleDetails = {
    make: blData?.vehicleMake,
    model: blData?.vehicleModel,
    year: blData?.vehicleYear,
    color: blData?.vehicleColor,
    chassisNumber: blData?.chassisNumber
  };

  return (
    <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md">
      <div className="border-2 border-black p-8">
        <Header blNumber={blNumber} date={date} />
        
        <ShipperConsignee
          shipper={shipper}
          shipperAddress={shipperAddress}
          shipperPhone={shipperPhone}
          consignee={consignee}
          consigneeAddress={consigneeAddress}
          consigneeIdNumber={consigneeIdNumber}
        />
        
        <NotifyPartyDeliveryAgent
          notifyParty={notifyParty}
          notifyPartyAddress={notifyPartyAddress}
          deliveryAgent={deliveryAgent}
        />
        
        <Ports
          portOfLoading={portOfLoading}
          portOfDischarge={portOfDischarge}
        />
        
        <ContainerSeal
          containerNo={containerNo}
          sealNo={sealNo}
        />
        
        <CargoTable
          marks={marks}
          description={description}
          weight={weight}
          volume={volume}
          cargoType={cargoType}
          vehicleDetails={vehicleDetails}
          formatDescription={formatDescription}
        />
        
        <FreightInfo
          freightPrepaid={freightPrepaid}
          packages={packages}
          vessel={vessel}
          finalDestination={finalDestination}
        />
        
        <Signatures dateOfIssue={dateOfIssue} />
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
