
import React from "react";
import { Calendar } from "lucide-react";
import AdditionalFields from "./basic-information/AdditionalFields";
import InvoiceNumberSelector from "./basic-information/InvoiceNumberSelector";
import StaffFields from "./basic-information/StaffFields";
import LocationFields from "./basic-information/LocationFields";

interface BasicInformationProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>;
  availableInvoices: any[];
  handleSelectInvoice: (invoice: any) => void;
  isEditing: boolean;
  countrySectorMap: { [key: string]: string };
  updatePackagePricing?: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
  showInvoiceSelector,
  setShowInvoiceSelector,
  availableInvoices,
  handleSelectInvoice,
  isEditing,
  countrySectorMap,
  updatePackagePricing
}) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-blue-600" />
        Basic Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Invoice Details */}
        <InvoiceNumberSelector
          formState={formState}
          handleInputChange={handleInputChange}
          showInvoiceSelector={showInvoiceSelector}
          setShowInvoiceSelector={setShowInvoiceSelector}
          availableInvoices={availableInvoices}
          handleSelectInvoice={handleSelectInvoice}
          isEditing={isEditing}
        />
        
        {/* Staff & Date Information */}
        <StaffFields
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        {/* Location Fields */}
        <LocationFields 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          countrySectorMap={countrySectorMap}
          updatePackagePricing={updatePackagePricing}
        />
        
        {/* Additional Fields */}
        <AdditionalFields
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
