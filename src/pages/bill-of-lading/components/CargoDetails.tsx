
import React from "react";
import {
  CargoDetailsHeader,
  BasicCargoFields,
  ContainerDetails,
  MarkingDetails,
  FreightDeliveryDetails,
  GoodsDescription,
  VehicleDetails
} from "./cargo-details";

interface CargoDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CargoDetails = ({ formState, handleInputChange }: CargoDetailsProps) => {
  const showVehicleDetails = formState.cargoType === "Car" || formState.cargoType === "Truck";

  // Create a custom handler for the Select component
  const handleSelectChange = (value: string, name: string) => {
    const event = {
      target: {
        name,
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };

  return (
    <div className="mt-6">
      <CargoDetailsHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <BasicCargoFields formState={formState} handleInputChange={handleInputChange} />
        <ContainerDetails formState={formState} handleInputChange={handleInputChange} />
        <MarkingDetails formState={formState} handleInputChange={handleInputChange} />
        <FreightDeliveryDetails 
          formState={formState} 
          handleInputChange={handleInputChange} 
          handleSelectChange={handleSelectChange} 
        />
        <GoodsDescription formState={formState} handleInputChange={handleInputChange} />
        <VehicleDetails 
          formState={formState} 
          handleInputChange={handleInputChange} 
          showVehicleDetails={showVehicleDetails} 
        />
      </div>
    </div>
  );
};

export default CargoDetails;
