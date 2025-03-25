
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SECTORS, SHIPPING_LINES } from "../constants/vesselData";
import { VesselFormData } from "../types/vesselTypes";

interface VesselDetailsFormProps {
  formData: VesselFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const VesselDetailsForm: React.FC<VesselDetailsFormProps> = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="sector" className="block text-sm font-medium">SECTOR:</label>
        <Select 
          value={formData.sector} 
          onValueChange={(value) => handleSelectChange("sector", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            {SECTORS.map(sector => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="runningNumber" className="block text-sm font-medium">RUNNING NUMBER:</label>
        <Input
          id="runningNumber"
          name="runningNumber"
          value={formData.runningNumber}
          onChange={handleInputChange}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="shippingLine" className="block text-sm font-medium">SHIPPING LINE:</label>
        <Select 
          value={formData.shippingLine} 
          onValueChange={(value) => handleSelectChange("shippingLine", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Shipping Line" />
          </SelectTrigger>
          <SelectContent>
            {SHIPPING_LINES.map(line => (
              <SelectItem key={line.value} value={line.value}>{line.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="vesselName" className="block text-sm font-medium">VESSEL NAME:</label>
        <Input
          id="vesselName"
          name="vesselName"
          value={formData.vesselName}
          onChange={handleInputChange}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="masterBL" className="block text-sm font-medium">MASTER BILL OF LADING:</label>
        <Input
          id="masterBL"
          name="masterBL"
          value={formData.masterBL}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="voyage" className="block text-sm font-medium">VOYAGE:</label>
        <Input
          id="voyage"
          name="voyage"
          value={formData.voyage}
          onChange={handleInputChange}
          className="w-full"
          required
        />
      </div>
    </div>
  );
};

export default VesselDetailsForm;
