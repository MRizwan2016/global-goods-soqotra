import React, { useEffect } from "react";
import { Phone, IdCard, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldWithIcon from "./InputFieldWithIcon";
import { COUNTRY_CODES } from "../../constants/locationData";
import { CustomerDetailsService } from "@/services/CustomerDetailsService";
import { toast } from "sonner";

interface ShipperDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  availableCities: string[];
}

const ShipperDetailsWithAutoFill: React.FC<ShipperDetailsProps> = ({
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

  // Enhanced mobile number change with auto-fill
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // First handle phone formatting
    handlePhoneChange(e);
    
    // Auto-fill customer details if mobile number is sufficient length
    if (name === "shipperMobile" && value.length >= 8) {
      // Try to find existing customer details
      const customerDetails = CustomerDetailsService.getCustomerDetailsByMobile(value);
      if (customerDetails) {
        // Auto-fill shipper details
        const fieldsToFill = [
          { field: 'shipper1', value: customerDetails.shipperName },
          { field: 'collectionAddress', value: customerDetails.shipperAddress },
          { field: 'shipperCity', value: customerDetails.shipperCity },
          { field: 'shipperIdNumber', value: customerDetails.shipperIdNumber }
        ];
        
        fieldsToFill.forEach(({ field, value: fieldValue }) => {
          if (fieldValue && fieldValue !== formState[field]) {
            const event = {
              target: {
                name: field,
                value: fieldValue
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            setTimeout(() => handleInputChange(event), 10);
          }
        });
        
        // Auto-fill consignee details if not gift cargo
        if (formState.giftCargo !== "yes") {
          const consigneeFields = [
            { field: 'consignee1', value: customerDetails.consigneeName },
            { field: 'address', value: customerDetails.consigneeAddress },
            { field: 'consigneeCity', value: customerDetails.consigneeCity },
            { field: 'consigneeMobile', value: customerDetails.consigneeMobile },
            { field: 'consigneeIdNumber', value: customerDetails.consigneeIdNumber }
          ];
          
          consigneeFields.forEach(({ field, value: fieldValue }) => {
            if (fieldValue && fieldValue !== formState[field]) {
              const event = {
                target: {
                  name: field,
                  value: fieldValue
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              setTimeout(() => handleInputChange(event), 20);
            }
          });
        }
        
        toast.success(`Auto-filled details for mobile ${value}`);
      }
    }
  };

  // Handle shipper name change with consignee auto-population
  const handleShipperNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update shipper name first
    handleInputChange(e);
    
    // Auto-populate consignee name unless gift cargo is "yes"
    if (name === "shipper1" && formState.giftCargo !== "yes") {
      const consigneeEvent = {
        target: {
          name: "consignee1",
          value: value
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      // Use setTimeout to ensure the shipper name is updated first
      setTimeout(() => {
        handleInputChange(consigneeEvent);
      }, 0);
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
          onChange={handleShipperNameChange}
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
          onChange={handleMobileNumberChange}
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

export default ShipperDetailsWithAutoFill;