
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SECTORS, SECTOR_PORT_MAP, generateRunningNumber } from "../constants/vesselData";
import { VesselFormData } from "../types/vesselTypes";

interface VesselDetailsFormProps {
  formData: VesselFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  existingRunningNumbers: string[];
}

const VesselDetailsForm: React.FC<VesselDetailsFormProps> = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange,
  existingRunningNumbers
}) => {
  // Set running number automatically when component mounts
  useEffect(() => {
    if (!formData.runningNumber) {
      const newRunningNumber = generateRunningNumber(existingRunningNumbers);
      handleSelectChange("runningNumber", newRunningNumber);
    }
  }, [formData.runningNumber, existingRunningNumbers, handleSelectChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="sector" className="block text-sm font-medium">SECTOR:</label>
        <Select 
          value={formData.sector || "select-sector"} 
          onValueChange={(value) => handleSelectChange("sector", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            {SECTORS.map(sector => (
              <SelectItem key={sector} value={sector || "unknown-sector"}>{sector || "Unknown Sector"}</SelectItem>
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
          className="w-full hover:border-blue-400 transition-colors"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="shippingLine" className="block text-sm font-medium">SHIPPING LINE:</label>
        <Select 
          value={formData.shippingLine || "select-shipping-line"} 
          onValueChange={(value) => handleSelectChange("shippingLine", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Shipping Line" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ABUDHABI SHIPPING">ABUDHABI SHIPPING : ADS</SelectItem>
            <SelectItem value="MAERSK LINE">MAERSK LINE : MSK</SelectItem>
            <SelectItem value="MSC">MSC</SelectItem>
            <SelectItem value="CMA CGM">CMA CGM</SelectItem>
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
          className="w-full hover:border-blue-400 transition-colors"
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
          className="w-full hover:border-blue-400 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="voyage" className="block text-sm font-medium">VOYAGE:</label>
        <Input
          id="voyage"
          name="voyage"
          value={formData.voyage}
          onChange={handleInputChange}
          className="w-full hover:border-blue-400 transition-colors"
          required
        />
      </div>
    </div>
  );
};

export default VesselDetailsForm;
