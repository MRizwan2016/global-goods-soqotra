
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VesselDetailsForm from "./components/VesselDetailsForm";
import ShippingDetailsForm from "./components/ShippingDetailsForm";
import FormActions from "./components/FormActions";
import { useVesselForm } from "./hooks/useVesselForm";
import { AddVesselProps } from "./types/vesselTypes";

const AddVessel: React.FC<AddVesselProps> = ({ onVesselCreated, onCancel }) => {
  const { formData, existingRunningNumbers, handleInputChange, handleSelectChange, handleSubmit } = useVesselForm(onVesselCreated);

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-xl text-green-800">Add New Vessel</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VesselDetailsForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              existingRunningNumbers={existingRunningNumbers}
            />
            
            <ShippingDetailsForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </div>
          
          <FormActions onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
};

export default AddVessel;
