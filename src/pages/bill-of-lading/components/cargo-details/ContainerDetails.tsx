
import React from "react";
import { Input } from "@/components/ui/input";

interface ContainerDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContainerDetails = ({ formState, handleInputChange }: ContainerDetailsProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">CONTAINER NO:</label>
        <Input 
          name="containerNo"
          value={formState.containerNo}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">SEAL NO:</label>
        <Input 
          name="sealNo"
          value={formState.sealNo}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
    </>
  );
};

export default ContainerDetails;
