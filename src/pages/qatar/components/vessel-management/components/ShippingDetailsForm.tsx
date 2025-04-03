
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SECTOR_PORT_MAP } from "../constants/vesselData";
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
          value={formData.portOfLoading || "select-port"} 
          onValueChange={(value) => handleSelectChange("portOfLoading", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Port of Loading" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DOHA, QATAR">DOHA, QATAR</SelectItem>
            <SelectItem value="HAMAD PORT, QATAR">HAMAD PORT, QATAR</SelectItem>
            <SelectItem value="MESSAIEED PORT, QATAR">MESSAIEED PORT, QATAR</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="portOfDischarge" className="block text-sm font-medium">PORT OF DISCHARGE:</label>
        <Select 
          value={formData.portOfDischarge || "select-port"} 
          onValueChange={(value) => handleSelectChange("portOfDischarge", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Port of Discharge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MOMBASA, KENYA">MOMBASA, KENYA</SelectItem>
            <SelectItem value="COLOMBO, SRI LANKA">COLOMBO, SRI LANKA</SelectItem>
            <SelectItem value="CHENNAI, INDIA">CHENNAI, INDIA</SelectItem>
            <SelectItem value="KARACHI, PAKISTAN">KARACHI, PAKISTAN</SelectItem>
            <SelectItem value="CHITTAGONG, BANGLADESH">CHITTAGONG, BANGLADESH</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="direction" className="block text-sm font-medium">DIRECTION:</label>
        <Select 
          value={formData.direction || "MIX"} 
          onValueChange={(value) => handleSelectChange("direction", value)}
        >
          <SelectTrigger className="w-full hover:border-blue-400 transition-colors">
            <SelectValue placeholder="Select Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPORT">EXPORT</SelectItem>
            <SelectItem value="IMPORT">IMPORT</SelectItem>
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
