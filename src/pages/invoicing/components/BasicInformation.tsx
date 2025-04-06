
import React from "react";
import { Package, TruckIcon, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { COUNTRY_CODES } from "../constants/locationData";
import InvoiceNumberSelector from "./basic-information/InvoiceNumberSelector";
import LocationFields from "./basic-information/LocationFields";
import StaffFields from "./basic-information/StaffFields";
import AdditionalFields from "./basic-information/AdditionalFields";

interface BasicInformationProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (value: boolean) => void;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
  countrySectorMap: Record<string, string>;
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
  // Get all available destinations (countries)
  const destinations = Object.keys(countrySectorMap);
  const freightOptions = ["Air", "Sea", "Both"];
  
  // Qatar-specific districts
  const qatarDistricts = ["DOHA", "AL RAYYAN", "AL KHOR", "AL SAAD", "WAKRA", "INDUSTRIAL AREA"];

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <Package className="mr-2 h-5 w-5 text-blue-600" />
        Basic Information
      </h3>
      
      {/* Invoice selector */}
      <InvoiceNumberSelector 
        formState={formState}
        handleInputChange={handleInputChange}
        showInvoiceSelector={showInvoiceSelector}
        setShowInvoiceSelector={setShowInvoiceSelector}
        availableInvoices={availableInvoices}
        handleSelectInvoice={handleSelectInvoice}
        isEditing={isEditing}
      />
      
      <Separator className="my-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location fields */}
        <LocationFields 
          formState={formState} 
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          countrySectorMap={countrySectorMap}
        />
        
        {/* Staff fields */}
        <StaffFields 
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        {/* District field with dropdown for Qatar */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">District</label>
          {formState.country === "Qatar" ? (
            <Select
              onValueChange={(value) => handleSelectChange("district", value)}
              value={formState.district || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {qatarDistricts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <input
              type="text"
              name="district"
              value={formState.district}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          )}
        </div>
        
        {/* Freight By with Sea/Air options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Freight By</label>
          <Select 
            onValueChange={(value) => handleSelectChange("freightBy", value)}
            value={formState.freightBy || "Air"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select freight type" />
            </SelectTrigger>
            <SelectContent>
              {freightOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Additional fields */}
      <AdditionalFields 
        formState={formState}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default BasicInformation;
