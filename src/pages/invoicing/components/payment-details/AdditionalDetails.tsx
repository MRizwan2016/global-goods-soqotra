
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
        <label className="text-sm font-medium mb-1">NET AMOUNT:</label>
        <InputField 
          label=""
          name="netAmountDisplay"
          value={formState.net}
          readOnly
          className="font-bold text-blue-600"
        />
      </div>
    </>
  );
};

export default AdditionalDetails;
