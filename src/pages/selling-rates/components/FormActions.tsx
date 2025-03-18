
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FormActionsProps {
  formState: {
    tariffNumber: string;
    effectiveFrom: string;
  };
  districtRates: {[key: string]: {[key: string]: string}};
}

const FormActions: React.FC<FormActionsProps> = ({ formState, districtRates }) => {
  const navigate = useNavigate();
  
  const handleSave = () => {
    if (!formState.tariffNumber) {
      toast.error("Please enter a tariff number");
      return;
    }
    
    if (!formState.effectiveFrom) {
      toast.error("Please select an effective date");
      return;
    }
    
    console.log("Saving selling rates:", { ...formState, districtRates });
    toast.success("Selling rates saved successfully");
    
    navigate("/data-entry/selling-rates");
  };
  
  return (
    <div className="flex justify-end gap-3 mt-6">
      <Button 
        onClick={handleSave}
        className="bg-soqotra-blue hover:bg-soqotra-navy text-white"
      >
        Save
      </Button>
      <Button 
        onClick={() => navigate("/data-entry/selling-rates")}
        variant="outline"
        className="border-soqotra-blue text-soqotra-blue hover:bg-soqotra-blue/10"
      >
        Go Back
      </Button>
    </div>
  );
};

export default FormActions;
