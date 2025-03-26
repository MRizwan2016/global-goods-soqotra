
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => {
  return (
    <div className="flex mt-6 justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:scale-105 transition-all"
      >
        <X size={16} />
        Cancel
      </Button>
      
      <Button 
        type="submit" 
        className="bg-green-600 hover:bg-green-700 flex items-center gap-2 hover:scale-105 transition-all"
      >
        <Save size={16} />
        Save Vessel
      </Button>
    </div>
  );
};

export default FormActions;
