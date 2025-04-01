
import React from "react";
import { Input } from "@/components/ui/input";

interface MarkingDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const MarkingDetails = ({ formState, handleInputChange }: MarkingDetailsProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">MARKS AND NUMBERS:</label>
        <Input 
          name="marksAndNumbers"
          value={formState.marksAndNumbers}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">SHIPPING MARKS:</label>
        <Input 
          name="shippingMarks"
          value={formState.shippingMarks}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
    </>
  );
};

export default MarkingDetails;
