
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Go Back
      </Button>
      
      <Button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
      >
        <Save size={16} />
        Save
      </Button>
    </div>
  );
};

export default FormActions;
