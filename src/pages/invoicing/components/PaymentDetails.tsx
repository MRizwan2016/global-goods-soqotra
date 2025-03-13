
import React from "react";
import { Input } from "@/components/ui/input";

interface PaymentDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  formState,
  handleInputChange,
}) => {
  return (
    <div className="mt-8">
      <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
        PAYMENT DETAILS
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">FREIGHT:</label>
          <Input 
            name="freight"
            value={formState.freight}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">AGENT NAME:</label>
          <Input 
            name="agentName"
            value={formState.agentName}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DESTINATION TRANSPORT:</label>
          <Input 
            name="destinationTransport"
            value={formState.destinationTransport}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">AGENT NUMBER:</label>
          <Input 
            name="agentNumber"
            value={formState.agentNumber}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DOCUMENT:</label>
          <Input 
            name="document"
            value={formState.document}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">INVOICE NUMBER:</label>
          <Input 
            name="invoiceNumber"
            value={formState.invoiceNumber}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">LOCAL TRANSPORT:</label>
          <Input 
            name="localTransport"
            value={formState.localTransport}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">INVOICE DATE:</label>
          <Input 
            name="invoiceDate"
            value={formState.invoiceDate}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">PACKING:</label>
          <Input 
            name="packing"
            value={formState.packing}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">BRANCH:</label>
          <Input 
            name="branchDisplay"
            value={formState.branch}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">STORAGE:</label>
          <Input 
            name="storage"
            value={formState.storage}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SECTOR:</label>
          <Input 
            name="sectorDisplay"
            value={formState.sector}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DESTINATION CLEARING:</label>
          <Input 
            name="destinationClearing"
            value={formState.destinationClearing}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">WAREHOUSE:</label>
          <Input 
            name="warehouseDisplay"
            value={formState.warehouse}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DESTINATION DOOR DELIVERY:</label>
          <Input 
            name="destinationDoorDelivery"
            value={formState.destinationDoorDelivery}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">FREIGHT BY:</label>
          <Input 
            name="freightByDisplay"
            value={formState.freightBy}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">OTHER:</label>
          <Input 
            name="other"
            value={formState.other}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">VOLUME:</label>
          <Input 
            name="volumeDisplay"
            value={formState.volume}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">GROSS:</label>
          <Input 
            name="gross"
            value={formState.gross}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">WEIGHT:</label>
          <Input 
            name="weightDisplay"
            value={formState.weight}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DISCOUNT:</label>
          <Input 
            name="discount"
            value={formState.discount}
            onChange={handleInputChange}
            className="border border-gray-300"
            type="number"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">PACKAGES:</label>
          <Input 
            name="packagesDisplay"
            value={formState.packages}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">NET:</label>
          <Input 
            name="net"
            value={formState.net}
            readOnly
            className="border border-gray-300 bg-gray-100 font-bold"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DOOR TO DOOR:</label>
          <Input 
            name="doorToDoorDisplay"
            value={formState.doorToDoor}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">CAT/ ZONE:</label>
          <Input 
            name="catZoneDisplay"
            value={formState.catZone}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">DISTRICT:</label>
          <Input 
            name="districtDisplay"
            value={formState.district}
            readOnly
            className="border border-gray-300 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
