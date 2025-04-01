
import React from "react";
import { BillOfLadingData } from "../../types/billOfLadingTypes";
import Header from "./Header";
import ShipperConsignee from "./ShipperConsignee";
import NotifyPartyDeliveryAgent from "./NotifyPartyDeliveryAgent";
import Ports from "./Ports";
import ContainerSeal from "./ContainerSeal";
import CargoTable from "./CargoTable";
import FreightInfo from "./FreightInfo";
import Signatures from "./Signatures";

interface HouseBillOfLadingDocumentProps {
  blData: BillOfLadingData;
  onBLDataChange?: (fieldName: string, value: string) => void;
  editable?: boolean;
}

const HouseBillOfLadingDocument: React.FC<HouseBillOfLadingDocumentProps> = ({ 
  blData,
  onBLDataChange,
  editable = false
}) => {
  // Handle changes to input fields when in editable mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBLDataChange) {
      onBLDataChange(e.target.name, e.target.value);
    }
  };

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
    <div className="house-bill-of-lading bg-white p-4 shadow-md max-w-[210mm] mx-auto">
      <Header 
        blNumber={blData.blNumber} 
        date={blData.date}
        editable={editable}
        onChange={handleChange}
      />
      
      <div className="border border-gray-400 mb-4">
        <ShipperConsignee 
          shipper={blData.shipper}
          shipperAddress={blData.shipperAddress}
          shipperPhone={blData.shipperPhone}
          consignee={blData.consignee}
          consigneeAddress={blData.consigneeAddress}
          consigneeIdNumber={blData.consigneeIdNumber}
          editable={editable}
          onChange={handleChange}
        />
        
        <NotifyPartyDeliveryAgent 
          notifyParty={blData.notifyParty}
          notifyPartyAddress={blData.notifyPartyAddress}
          deliveryAgent={blData.deliveryAgent}
          editable={editable}
          onChange={handleChange}
        />
        
        <Ports 
          portOfLoading={blData.portOfLoading}
          portOfDischarge={blData.portOfDischarge}
          finalDestination={blData.finalDestination}
          editable={editable}
          onChange={handleChange}
        />
        
        <ContainerSeal 
          containerNo={blData.containerNo}
          sealNo={blData.sealNo}
          editable={editable}
          onChange={handleChange}
        />
        
        <CargoTable 
          marks={blData.marks}
          description={blData.description}
          packages={blData.packages}
          weight={blData.weight}
          volume={blData.volume}
          cargoType={blData.cargoType}
          editable={editable}
          onChange={handleChange}
          vehicleMake={blData.vehicleMake}
          vehicleModel={blData.vehicleModel}
          vehicleYear={blData.vehicleYear}
          vehicleColor={blData.vehicleColor}
          chassisNumber={blData.chassisNumber}
          formatDescription={formatDescription}
        />
        
        <FreightInfo 
          freightPrepaid={blData.freightPrepaid}
          packages={blData.packages}
          vessel={blData.vessel}
          voyage={blData.voyage}
          finalDestination={blData.finalDestination}
          editable={editable}
          onChange={handleChange}
        />
        
        <Signatures 
          dateOfIssue={blData.dateOfIssue} 
          editable={editable}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
