
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SECTOR_PORT_MAP, DEFAULT_PORT_OF_LOADING } from "../constants/vesselData";
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
  // Automatically set port of loading to DEFAULT_PORT_OF_LOADING
  useEffect(() => {
    if (!formData.portOfLoading) {
      handleSelectChange("portOfLoading", DEFAULT_PORT_OF_LOADING);
    }
  }, [formData.portOfLoading, handleSelectChange]);

  // Get available ports of discharge based on selected sector
  const availablePorts = formData.sector ? SECTOR_PORT_MAP[formData.sector] || [] : [];
  
  // Automatically set port of discharge when sector changes
  useEffect(() => {
    if (formData.sector && availablePorts.length > 0 && 
        (!formData.portOfDischarge || !availablePorts.includes(formData.portOfDischarge))) {
      handleSelectChange("portOfDischarge", availablePorts[0]);
    }
  }, [formData.sector, availablePorts, formData.portOfDischarge, handleSelectChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="portOfLoading" className="block text-sm font-medium">PORT OF LOADING:</label>
        <Select 
          value={formData.portOfLoading || "default-loading-port"} 
          onValueChange={(value) => handleSelectChange("portOfLoading", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Port of Loading" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DEFAULT_PORT_OF_LOADING || "default-loading-port"}>{DEFAULT_PORT_OF_LOADING || "Default Port"}</SelectItem>
            <SelectItem value="Doha">Doha</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="portOfDischarge" className="block text-sm font-medium">PORT OF DISCHARGE:</label>
        <Select 
          value={formData.portOfDischarge || "default-discharge-port"} 
          onValueChange={(value) => handleSelectChange("portOfDischarge", value)}
          disabled={availablePorts.length === 0}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder={availablePorts.length === 0 ? "Select a sector first" : "Select Port of Discharge"} />
          </SelectTrigger>
          <SelectContent>
            {availablePorts.length > 0 ? (
              availablePorts.map(port => (
                <SelectItem key={port} value={port || "unknown-port"}>{port || "Unknown Port"}</SelectItem>
              ))
            ) : (
              <SelectItem value="no-ports-available">No ports available</SelectItem>
            )}
          </SelectContent>
        </Select>
        {availablePorts.length === 0 && formData.sector && (
          <p className="text-sm text-red-500 mt-1">No ports available for the selected sector.</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="direction" className="block text-sm font-medium">DIRECT/MIX:</label>
        <Select 
          value={formData.direction || "DIRECT"} 
          onValueChange={(value) => handleSelectChange("direction", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DIRECT">DIRECT</SelectItem>
            <SelectItem value="MIX">MIX</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="etd" className="block text-sm font-medium">ESTIMATED TIME OF DEPARTURE (ETD):</label>
        <Input
          id="etd"
          name="etd"
          type="date"
          value={formData.etd}
          onChange={handleInputChange}
          className="w-full hover:border-blue-400 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="eta" className="block text-sm font-medium">ESTIMATED TIME OF ARRIVAL (ETA):</label>
        <Input
          id="eta"
          name="eta"
          type="date"
          value={formData.eta}
          onChange={handleInputChange}
          className="w-full hover:border-blue-400 transition-colors"
        />
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
