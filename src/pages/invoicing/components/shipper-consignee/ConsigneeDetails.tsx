
import React, { useEffect } from "react";
import { Phone, IdCard, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldWithIcon from "./InputFieldWithIcon";
import { COUNTRY_CODES } from "../../constants/locationData";

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
  // Handle country code prefix for phone numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const countryCode = COUNTRY_CODES[formState.country] || "";
    
    // If user is typing a new number and it doesn't start with the country code
    if (value && !value.startsWith(countryCode)) {
      // If value starts with a different country code, replace it
      const numericValue = value.replace(/\D+/g, '');
      const newValue = countryCode + numericValue;
      
      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: newValue
        }
      };
      
      handleInputChange(event);
    } else {
      handleInputChange(e);
    }
  };
  
  // If country changes, update the phone number prefixes
  useEffect(() => {
    if (formState.country) {
      const countryCode = COUNTRY_CODES[formState.country] || "";
      
      // Update mobile number if it exists
      if (formState.consigneeMobile && !formState.consigneeMobile.startsWith(countryCode)) {
        const numericMobile = formState.consigneeMobile.replace(/\D+/g, '');
        const newMobileValue = countryCode + numericMobile;
        
        const mobileEvent = {
          target: {
            name: "consigneeMobile",
            value: newMobileValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(mobileEvent);
      }
      
      // Update landline number if it exists
      if (formState.consigneeLandline && !formState.consigneeLandline.startsWith(countryCode)) {
        const numericLandline = formState.consigneeLandline.replace(/\D+/g, '');
        const newLandlineValue = countryCode + numericLandline;
        
        const landlineEvent = {
          target: {
            name: "consigneeLandline",
            value: newLandlineValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(landlineEvent);
      }
    }
  }, [formState.country]);

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
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.country] || "+xxx "} mobile number`}
        />
        
        <InputFieldWithIcon 
          label="Landline Number"
          name="consigneeLandline"
          value={formState.consigneeLandline}
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.country] || "+xxx "} landline number`}
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
