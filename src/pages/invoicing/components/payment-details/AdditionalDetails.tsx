
import React from "react";
import InputField from "./InputField";

interface AdditionalDetailsProps {
  formState: any;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  formState,
  handleInputChange,
}) => {
  return (
    <>
      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium mb-1">CAT/ ZONE:</label>
        <InputField 
          label=""
          name="catZoneDisplay"
          value={formState.catZone}
          readOnly
        />
      </div>
      
      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium mb-1">DISTRICT:</label>
        <InputField 
          label=""
          name="districtDisplay"
          value={formState.district}
          readOnly
        />
      </div>
    </>
  );
};

export default AdditionalDetails;
