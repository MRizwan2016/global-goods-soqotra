
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PORTS } from "../constants/vesselData";
import { VesselFormData } from "../types/vesselTypes";

interface ShippingDetailsFormProps {
  formData: VesselFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="portOfLoading" className="block text-sm font-medium">PORT OF LOADING:</label>
        <Select 
          value={formData.portOfLoading} 
          onValueChange={(value) => handleSelectChange("portOfLoading", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Port of Loading" />
          </SelectTrigger>
          <SelectContent>
            {PORTS.map(port => (
              <SelectItem key={port} value={port}>{port}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="portOfDischarge" className="block text-sm font-medium">PORT OF DISCHARGE:</label>
        <Select 
          value={formData.portOfDischarge} 
          onValueChange={(value) => handleSelectChange("portOfDischarge", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Port of Discharge" />
          </SelectTrigger>
          <SelectContent>
            {PORTS.map(port => (
              <SelectItem key={port} value={port}>{port}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="direction" className="block text-sm font-medium">DIRECT/ MIX:</label>
        <Select 
          value={formData.direction} 
          onValueChange={(value) => handleSelectChange("direction", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DIRECT">DIRECT</SelectItem>
            <SelectItem value="MIX">MIX</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="etd" className="block text-sm font-medium">E.T.D:</label>
        <Input
          id="etd"
          name="etd"
          type="date"
          value={formData.etd}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="eta" className="block text-sm font-medium">E.T.A:</label>
        <Input
          id="eta"
          name="eta"
          type="date"
          value={formData.eta}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
