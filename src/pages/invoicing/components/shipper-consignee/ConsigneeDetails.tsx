
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
    // Use destination country code for consignee
    const countryCode = COUNTRY_CODES[formState.destination] || "";
    
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
  
  // If destination changes, update the phone number prefixes
  useEffect(() => {
    if (formState.destination) {
      const countryCode = COUNTRY_CODES[formState.destination] || "";
      
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
      
      // Update secondary mobile number if it exists
      if (formState.consigneeMobile2 && !formState.consigneeMobile2.startsWith(countryCode)) {
        const numericMobile2 = formState.consigneeMobile2.replace(/\D+/g, '');
        const newMobile2Value = countryCode + numericMobile2;
        
        const mobile2Event = {
          target: {
            name: "consigneeMobile2",
            value: newMobile2Value
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(mobile2Event);
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
  }, [formState.destination]);

  // Clear consignee name when gift cargo is set to "yes"
  useEffect(() => {
    if (formState.giftCargo === "yes" && formState.consignee1) {
      const clearEvent = {
        target: {
          name: "consignee1",
          value: ""
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(clearEvent);
    }
  }, [formState.giftCargo]);

  return (
    <div>
      <h4 className="font-medium text-sm mb-3 text-gray-600">Consignee Information</h4>
      
      <div className="space-y-3">
        <InputFieldWithIcon 
          label="Primary Consignee Name"
          name="consignee1"
          value={formState.consignee1}
          onChange={handleInputChange}
          placeholder="Primary consignee name"
        />
        
        <InputFieldWithIcon 
          label="Secondary Consignee Name"
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
          <label className="text-sm font-medium mb-1">City (Destination):</label>
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
          label="Primary Mobile Number"
          name="consigneeMobile"
          value={formState.consigneeMobile}
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.destination] || "+xxx "} primary mobile number`}
        />
        
        <InputFieldWithIcon 
          label="Secondary Mobile Number"
          name="consigneeMobile2"
          value={formState.consigneeMobile2}
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.destination] || "+xxx "} secondary mobile number`}
        />
        
        <InputFieldWithIcon 
          label="Landline Number"
          name="consigneeLandline"
          value={formState.consigneeLandline}
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.destination] || "+xxx "} landline number`}
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
