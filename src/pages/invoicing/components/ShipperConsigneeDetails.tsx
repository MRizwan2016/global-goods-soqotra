
import React from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { User, MapPin, Phone, IdCard } from "lucide-react";
import { cityOptions } from "../constants/locationData";

interface ShipperConsigneeDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}

const ShipperConsigneeDetails: React.FC<ShipperConsigneeDetailsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange
}) => {
  // Handler for select components
  const onSelectChange = (name: string, value: string) => {
    if (handleSelectChange) {
      handleSelectChange(name, value);
    }
  };

  // Get available cities based on selected country
  const availableCities = formState.country ? cityOptions[formState.country] || [] : [];

  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <User className="mr-2 h-5 w-5 text-green-600" />
        Shipper & Consignee Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Shipper Information */}
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
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 flex items-center">
                <Phone className="mr-1 h-4 w-4 text-gray-500" />
                Mobile Number:
              </label>
              <Input 
                name="shipperMobile"
                value={formState.shipperMobile || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Shipper's mobile number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 flex items-center">
                <IdCard className="mr-1 h-4 w-4 text-gray-500" />
                QID/Passport No:
              </label>
              <Input 
                name="shipperIdNumber"
                value={formState.shipperIdNumber || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Shipper's QID or passport number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                Collection Address:
              </label>
              <Input 
                name="collectionAddress"
                value={formState.collectionAddress || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Address for collection"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">City:</label>
              <Select 
                name="shipperCity" 
                value={formState.shipperCity || ""} 
                onValueChange={(value) => onSelectChange("shipperCity", value)}
              >
                <SelectTrigger className="w-full border border-gray-300">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Consignee Information */}
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
                placeholder="Delivery address"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">City:</label>
              <Select 
                name="consigneeCity" 
                value={formState.consigneeCity || ""} 
                onValueChange={(value) => onSelectChange("consigneeCity", value)}
              >
                <SelectTrigger className="w-full border border-gray-300">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 flex items-center">
                <Phone className="mr-1 h-4 w-4 text-gray-500" />
                Mobile Number:
              </label>
              <Input 
                name="consigneeMobile"
                value={formState.consigneeMobile || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Consignee's mobile number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 flex items-center">
                <Phone className="mr-1 h-4 w-4 text-gray-500" />
                Landline Number:
              </label>
              <Input 
                name="consigneeLandline"
                value={formState.consigneeLandline || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Consignee's landline number"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 flex items-center">
                <IdCard className="mr-1 h-4 w-4 text-gray-500" />
                NIC/Passport No:
              </label>
              <Input 
                name="consigneeIdNumber"
                value={formState.consigneeIdNumber || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
                placeholder="Consignee's NIC or passport number"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Handover By:</label>
            <Select 
              onValueChange={(value) => onSelectChange("handOverBy", value)}
              value={formState.handOverBy || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sales Rep" />
              </SelectTrigger>
              <SelectContent>
                {[...SALES_REPS, ...DRIVERS].map((person) => (
                  <SelectItem key={person} value={person}>{person}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Includes both Sales Reps and Drivers for handover selection
const SALES_REPS = [
  "Mr. Lahiru Chathuranga",
  "Mr. Ali Hussain",
  "Mr. Paolo Fernando",
  "Mr. Evans",
  "Mr. Paul Onchano",
  "Mr. Edwin Mbugua",
  "Mr. Zacharia",
  "Mr. Jun Jun Santos",
  "Mr. Raymond"
];

const DRIVERS = [
  "Mr. Abdullah",
  "Mr. Johny Venakdy",
  "Mr. Salih",
  "Mr. Kanaya",
  "Mr. Ashoka",
  "Mr. Idris Karar"
];

export default ShipperConsigneeDetails;
