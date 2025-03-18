
import React from "react";
import { Phone, IdCard, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldWithIcon from "./InputFieldWithIcon";

interface ConsigneeDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  availableCities: string[];
}

const ConsigneeDetails: React.FC<ConsigneeDetailsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
  availableCities
}) => {
  return (
    <div>
      <h4 className="font-medium text-sm mb-3 text-gray-600">Consignee Information</h4>
      
      <div className="space-y-3">
        <InputFieldWithIcon 
          label="Consignee Name"
          name="consignee1"
          value={formState.consignee1}
          onChange={handleInputChange}
          placeholder="Primary consignee name"
        />
        
        <InputFieldWithIcon 
          label="Additional Consignee"
          name="consignee2"
          value={formState.consignee2}
          onChange={handleInputChange}
          placeholder="Secondary consignee name (optional)"
        />
        
        <InputFieldWithIcon 
          label="Delivery Address"
          name="address"
          value={formState.address}
          onChange={handleInputChange}
          icon={MapPin}
          placeholder="Delivery address"
        />
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">City:</label>
          <Select 
            value={formState.consigneeCity || ""} 
            onValueChange={(value) => handleSelectChange("consigneeCity", value)}
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
        
        <InputFieldWithIcon 
          label="Mobile Number"
          name="consigneeMobile"
          value={formState.consigneeMobile}
          onChange={handleInputChange}
          icon={Phone}
          placeholder="Consignee's mobile number"
        />
        
        <InputFieldWithIcon 
          label="Landline Number"
          name="consigneeLandline"
          value={formState.consigneeLandline}
          onChange={handleInputChange}
          icon={Phone}
          placeholder="Consignee's landline number"
        />
        
        <InputFieldWithIcon 
          label="NIC/Passport No"
          name="consigneeIdNumber"
          value={formState.consigneeIdNumber}
          onChange={handleInputChange}
          icon={IdCard}
          placeholder="Consignee's NIC or passport number"
        />
      </div>
    </div>
  );
};

export default ConsigneeDetails;
