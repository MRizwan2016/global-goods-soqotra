
import React from "react";
import { User } from "lucide-react";
import { cityOptions } from "../constants/locationData";
import { countrySectorMap } from "../constants/countrySectorMap";
import ShipperDetails from "./shipper-consignee/ShipperDetails";
import ConsigneeDetails from "./shipper-consignee/ConsigneeDetails";
import HandoverSelection from "./shipper-consignee/HandoverSelection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SALES_REPS = [
  "Mr. Lahiru Chathuranga",
  "Mr. Ali Hussain",
  "Mr. Paolo Fernando",
  "Mr. Evans",
  "Mr. Paul Onchano",
  "Mr. Edwin Mbugua",
  "Mr. Zacharia",
  "Mr. Jun Jun Santos",
  "Mr. Raymond"
];

const DRIVERS = [
  "Mr. Abdullah",
  "Mr. Johny Venakdy",
  "Mr. Salih",
  "Mr. Kanaya",
  "Mr. Ashoka",
  "Mr. Idris Karar"
];

interface ShipperConsigneeDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}

const ShipperConsigneeDetails: React.FC<ShipperConsigneeDetailsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange
}) => {
  // Handler for select components
  const onSelectChange = (name: string, value: string) => {
    if (handleSelectChange) {
      handleSelectChange(name, value);
    }
  };

  // Get available cities based on selected country (for shipper)
  const availableShipperCities = formState.country ? cityOptions[formState.country] || [] : [];
  
  // Get available cities based on selected destination (for consignee)
  const availableConsigneeCities = formState.destination ? cityOptions[formState.destination] || [] : [];
  
  // Get all available destinations (countries)
  const destinations = Object.keys(countrySectorMap);

  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <User className="mr-2 h-5 w-5 text-green-600" />
        Shipper & Consignee Details
      </h3>
      
      <div className="flex justify-between mb-4">
        <div className="w-1/2 mr-2">
          <label className="text-sm font-medium mb-1">Origin Country (Port of Loading):</label>
          <div className="flex flex-col">
            <input 
              type="text"
              value={formState.country || ""}
              readOnly
              className="w-full border border-gray-300 rounded p-2 bg-gray-50"
            />
          </div>
        </div>
        
        <div className="w-1/2 ml-2">
          <label className="text-sm font-medium mb-1">Destination Country (Port of Discharge):</label>
          <Select 
            value={formState.destination || ""} 
            onValueChange={(value) => onSelectChange("destination", value)}
          >
            <SelectTrigger className="w-full border border-gray-300">
              <SelectValue placeholder="Select destination country" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <ShipperDetails 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={onSelectChange}
          availableCities={availableShipperCities}
        />
        
        <ConsigneeDetails 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={onSelectChange}
          availableCities={availableConsigneeCities}
        />
        
        <HandoverSelection 
          formState={formState}
          handleSelectChange={onSelectChange}
          salesReps={SALES_REPS}
          drivers={DRIVERS}
        />
      </div>
    </div>
  );
};

export default ShipperConsigneeDetails;
