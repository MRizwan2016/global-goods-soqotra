
import React from "react";
import { User } from "lucide-react";
import { cityOptions } from "../constants/locationData";
import ShipperDetails from "./shipper-consignee/ShipperDetails";
import ConsigneeDetails from "./shipper-consignee/ConsigneeDetails";
import HandoverSelection from "./shipper-consignee/HandoverSelection";

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

  // Get available cities based on selected country
  const availableCities = formState.country ? cityOptions[formState.country] || [] : [];

  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <User className="mr-2 h-5 w-5 text-green-600" />
        Shipper & Consignee Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <ShipperDetails 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={onSelectChange}
          availableCities={availableCities}
        />
        
        <ConsigneeDetails 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={onSelectChange}
          availableCities={availableCities}
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
