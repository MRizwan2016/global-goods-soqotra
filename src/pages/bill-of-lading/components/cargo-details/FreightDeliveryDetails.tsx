
import React from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface FreightDeliveryDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
}

const FreightDeliveryDetails = ({ formState, handleInputChange, handleSelectChange }: FreightDeliveryDetailsProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">FREIGHT CHARGES:</label>
        <Select
          value={formState.freightCharges || "Prepaid"}
          onValueChange={(value) => handleSelectChange(value, "freightCharges")}
        >
          <SelectTrigger className="border border-gray-300">
            <SelectValue placeholder="Select freight charge type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Prepaid">Prepaid</SelectItem>
            <SelectItem value="Collect">Collect</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DELIVERY AGENT:</label>
        <Input 
          name="deliveryAgent"
          value={formState.deliveryAgent || ""}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
    </>
  );
};

export default FreightDeliveryDetails;
