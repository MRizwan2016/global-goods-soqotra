
import React from "react";
import { Phone, IdCard, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldWithIcon from "./InputFieldWithIcon";

interface ShipperDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  availableCities: string[];
}

const ShipperDetails: React.FC<ShipperDetailsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
  availableCities
}) => {
  return (
    <div>
      <h4 className="font-medium text-sm mb-3 text-gray-600">Shipper Information</h4>
      
      <div className="space-y-3">
        <InputFieldWithIcon 
          label="Shipper Name"
          name="shipper1"
          value={formState.shipper1}
          onChange={handleInputChange}
          placeholder="Primary shipper name"
        />
        
        <InputFieldWithIcon 
          label="Additional Shipper"
          name="shipper2"
          value={formState.shipper2}
          onChange={handleInputChange}
          placeholder="Secondary shipper name (optional)"
        />
        
        <InputFieldWithIcon 
          label="Mobile Number"
          name="shipperMobile"
          value={formState.shipperMobile}
          onChange={handleInputChange}
          icon={Phone}
          placeholder="Shipper's mobile number"
        />
        
        <InputFieldWithIcon 
          label="QID/Passport No"
          name="shipperIdNumber"
          value={formState.shipperIdNumber}
          onChange={handleInputChange}
          icon={IdCard}
          placeholder="Shipper's QID or passport number"
        />
        
        <InputFieldWithIcon 
          label="Collection Address"
          name="collectionAddress"
          value={formState.collectionAddress}
          onChange={handleInputChange}
          icon={MapPin}
          placeholder="Address for collection"
        />
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">City:</label>
          <Select 
            value={formState.shipperCity || ""} 
            onValueChange={(value) => handleSelectChange("shipperCity", value)}
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
  );
};

export default ShipperDetails;
