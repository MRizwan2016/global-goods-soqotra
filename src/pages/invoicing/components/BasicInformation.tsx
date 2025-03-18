
import React from "react";
import InvoiceNumberSelector from "./basic-information/InvoiceNumberSelector";
import LocationFields from "./basic-information/LocationFields";
import StaffFields from "./basic-information/StaffFields";
import AdditionalFields from "./basic-information/AdditionalFields";

interface BasicInformationProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (show: boolean) => void;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
  countrySectorMap: { [key: string]: string };
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
  countrySectorMap
}) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold">Basic Information</h2>
      <p className="text-sm text-gray-500">Enter the basic details for this invoice.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InvoiceNumberSelector
          formState={formState}
          handleInputChange={handleInputChange}
          showInvoiceSelector={showInvoiceSelector}
          setShowInvoiceSelector={setShowInvoiceSelector}
          availableInvoices={availableInvoices}
          handleSelectInvoice={handleSelectInvoice}
          isEditing={isEditing}
        />
        
        <LocationFields
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          countrySectorMap={countrySectorMap}
        />
        
        <StaffFields
          formState={formState}
          handleSelectChange={handleSelectChange}
        />
        
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
