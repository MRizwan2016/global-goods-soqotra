
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SellingRateFormValues } from '../schema/sellingRateSchema';

interface FormActionsProps {
  isSubmitting: boolean;
  isDistrictRatesValid: boolean;
  handleSubmit: (onSubmit: (data: SellingRateFormValues) => any) => (e: React.FormEvent) => Promise<void>;
  onSubmit: (data: SellingRateFormValues) => any;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isSubmitting,
  isDistrictRatesValid,
  handleSubmit,
  onSubmit
}) => {
  const navigate = useNavigate();
  
  const submitForm = handleSubmit((data) => {
    if (!isDistrictRatesValid) {
      toast.error("Please correct all district rates before saving");
      return;
    }
    
    // Get the result from onSubmit function
    const result = onSubmit(data);
    
    if (result) {
      toast.success("Selling rates saved successfully");
      navigate("/data-entry/selling-rates");
    }
  });
  
  return (
    <div className="flex justify-end gap-3 mt-6">
      <Button 
        onClick={(e) => { e.preventDefault(); submitForm(e as any); }}
        className="bg-soqotra-blue hover:bg-soqotra-navy text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
      <Button 
        onClick={() => navigate("/data-entry/selling-rates")}
        variant="outline"
        className="border-soqotra-blue text-soqotra-blue hover:bg-soqotra-blue/10"
        type="button"
      >
        Go Back
      </Button>
    </div>
  );
};

export default FormActions;
