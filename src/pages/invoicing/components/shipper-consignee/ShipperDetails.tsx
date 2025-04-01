
import React, { useEffect } from "react";
import { Phone, IdCard, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldWithIcon from "./InputFieldWithIcon";
import { COUNTRY_CODES } from "../../constants/locationData";

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
  // Handle country code prefix for phone numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Always use origin country (formState.country) code for shipper
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
      if (formState.shipperMobile && !formState.shipperMobile.startsWith(countryCode)) {
        const numericMobile = formState.shipperMobile.replace(/\D+/g, '');
        const newMobileValue = countryCode + numericMobile;
        
        const mobileEvent = {
          target: {
            name: "shipperMobile",
            value: newMobileValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(mobileEvent);
      }
    }
  }, [formState.country]);

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
          label="Collection Address"
          name="collectionAddress"
          value={formState.collectionAddress}
          onChange={handleInputChange}
          icon={MapPin}
          placeholder="Collection address"
        />
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">City (Port of Loading):</label>
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
        
        <InputFieldWithIcon 
          label="Mobile Number"
          name="shipperMobile"
          value={formState.shipperMobile}
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.country] || "+xxx "} mobile number`}
        />
        
        <InputFieldWithIcon 
          label="NIC/Passport No"
          name="shipperIdNumber"
          value={formState.shipperIdNumber}
          onChange={handleInputChange}
          icon={IdCard}
          placeholder="Shipper's NIC or passport number"
        />
      </div>
    </div>
  );
};

export default ShipperDetails;
