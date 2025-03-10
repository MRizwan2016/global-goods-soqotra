
import { Input } from "@/components/ui/input";
import { SectionHeader } from "./FormFields";

interface ShippingDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ShippingDetails = ({ formState, handleInputChange }: ShippingDetailsProps) => {
  return (
    <div className="mt-8">
      <SectionHeader title="SHIPPING DETAILS" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">HAND-OVER BY:</label>
          <Input 
            name="handOverBy"
            value={formState.handOverBy}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CONSIGNEE 1:</label>
          <Input 
            name="consignee1"
            value={formState.consignee1}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SHIPPER 1:</label>
          <Input 
            name="shipper1"
            value={formState.shipper1}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CONSIGNEE 2:</label>
          <Input 
            name="consignee2"
            value={formState.consignee2}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SHIPPER 2:</label>
          <Input 
            name="shipper2"
            value={formState.shipper2}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">ADDRESS:</label>
          <Input 
            name="address"
            value={formState.address}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
