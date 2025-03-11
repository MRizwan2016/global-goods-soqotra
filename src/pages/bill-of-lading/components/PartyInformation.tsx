
import { Input, Textarea } from "@/components/ui/input";

interface PartyInformationProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PartyInformation = ({ formState, handleInputChange }: PartyInformationProps) => {
  return (
    <div className="mt-6">
      <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
        PARTIES INFORMATION
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SHIPPER:</label>
          <Input 
            name="shipper"
            value={formState.shipper}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CONSIGNEE:</label>
          <Input 
            name="consignee"
            value={formState.consignee}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SHIPPER ADDRESS:</label>
          <Textarea 
            name="shipperAddress"
            value={formState.shipperAddress}
            onChange={handleInputChange}
            className="border border-gray-300 min-h-[80px]"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CONSIGNEE ADDRESS:</label>
          <Textarea 
            name="consigneeAddress"
            value={formState.consigneeAddress}
            onChange={handleInputChange}
            className="border border-gray-300 min-h-[80px]"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">NOTIFY PARTY:</label>
          <Input 
            name="notifyParty"
            value={formState.notifyParty}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">FREIGHT CHARGES:</label>
          <select
            name="freightCharges"
            value={formState.freightCharges}
            onChange={handleInputChange}
            className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
          >
            <option value="Prepaid">PREPAID</option>
            <option value="Collect">COLLECT</option>
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">NOTIFY PARTY ADDRESS:</label>
          <Textarea 
            name="notifyPartyAddress"
            value={formState.notifyPartyAddress}
            onChange={handleInputChange}
            className="border border-gray-300 min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PartyInformation;
