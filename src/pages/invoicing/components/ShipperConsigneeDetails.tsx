
import React from "react";
import { Input } from "@/components/ui/input";
import { User, MapPin } from "lucide-react";

interface ShipperConsigneeDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ShipperConsigneeDetails: React.FC<ShipperConsigneeDetailsProps> = ({
  formState,
  handleInputChange,
}) => {
  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <User className="mr-2 h-5 w-5 text-green-600" />
        Shipper & Consignee Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <h4 className="font-medium text-sm mb-3 text-gray-600">Shipper Information</h4>
          
          <div className="space-y-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Shipper Name:</label>
              <Input 
                name="shipper1"
                value={formState.shipper1}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Primary shipper name"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Additional Shipper:</label>
              <Input 
                name="shipper2"
                value={formState.shipper2}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Secondary shipper name (optional)"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm mb-3 text-gray-600">Consignee Information</h4>
          
          <div className="space-y-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Consignee Name:</label>
              <Input 
                name="consignee1"
                value={formState.consignee1}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Primary consignee name"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Additional Consignee:</label>
              <Input 
                name="consignee2"
                value={formState.consignee2}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Secondary consignee name (optional)"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 flex items-center">
              <MapPin className="mr-1 h-4 w-4 text-gray-500" />
              Delivery Address:
            </label>
            <Input 
              name="address"
              value={formState.address}
              onChange={handleInputChange}
              className="border border-gray-300"
              placeholder="Complete delivery address"
            />
          </div>
        </div>
        
        <div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Handover By:</label>
            <Input 
              name="handOverBy"
              value={formState.handOverBy}
              onChange={handleInputChange}
              className="border border-gray-300"
              placeholder="Person handling the handover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperConsigneeDetails;
