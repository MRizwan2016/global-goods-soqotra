
import React from "react";
import Header from "./Header";
import ShipperConsignee from "./ShipperConsignee";
import NotifyParty from "./NotifyParty";
import Ports from "../house-bill-of-lading/Ports";
import ContainerSeal from "../house-bill-of-lading/ContainerSeal";
import CargoDetails from "./CargoDetails";
import SpecialInstructions from "./SpecialInstructions";
import Signatures from "./Signatures";
import ErrorState from "./ErrorState";

interface BillOfLadingDocumentProps {
  blData: any;
}

const BillOfLadingDocument: React.FC<BillOfLadingDocumentProps> = ({ blData }) => {
  if (!blData) {
    return <ErrorState />;
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
        <Header />
        
        <ShipperConsignee 
          shipper={shipper}
          shipperAddress={shipperAddress}
          blNumber={blNumber}
          date={date}
          consignee={consignee}
          consigneeAddress={consigneeAddress}
        />
        
        <NotifyParty 
          notifyParty={notifyParty}
          notifyPartyAddress={notifyPartyAddress}
          deliveryAgent={deliveryAgent}
          vessel={vessel}
          voyage={voyage}
        />
        
        <Ports 
          portOfLoading={portOfLoading}
          portOfDischarge={portOfDischarge}
        />
        
        <ContainerSeal 
          containerNo={containerNo}
          sealNo={sealNo}
        />
        
        <CargoDetails 
          packages={packages}
          weight={weight}
          volume={volume}
          marks={marks}
          description={description}
          cargoType={cargoType}
          formatDescription={formatDescription}
          blData={blData}
        />
        
        <SpecialInstructions specialInstructions={specialInstructions} />
        
        <Signatures />
      </div>
    </div>
  );
};

export default BillOfLadingDocument;
