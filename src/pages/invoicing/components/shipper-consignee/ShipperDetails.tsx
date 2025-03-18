
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
  
  // If country changes, update the phone number prefix
  useEffect(() => {
    if (formState.country && formState.shipperMobile) {
      const countryCode = COUNTRY_CODES[formState.country] || "";
      if (!formState.shipperMobile.startsWith(countryCode)) {
        // Strip any existing country code or non-numeric characters
        const numericValue = formState.shipperMobile.replace(/\D+/g, '');
        const newValue = countryCode + numericValue;
        
        // Update the form state with the new value
        const event = {
          target: {
            name: "shipperMobile",
            value: newValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(event);
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
          label="Mobile Number"
          name="shipperMobile"
          value={formState.shipperMobile}
          onChange={handlePhoneChange}
          icon={Phone}
          placeholder={`${COUNTRY_CODES[formState.country] || "+xxx "} mobile number`}
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
