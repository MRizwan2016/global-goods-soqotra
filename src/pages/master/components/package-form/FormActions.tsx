
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onSave, onCancel }) => {
  return (
    <div className="mt-6 flex justify-end gap-4">
      <Button 
        type="button"
        onClick={onCancel}
        className="bg-gray-500 hover:bg-gray-600"
      >
        Cancel
      </Button>
      <Button 
        type="button"
        onClick={onSave}
        className="bg-green-500 hover:bg-green-600"
      >
        {isEditing ? "Update" : "Save"}
      </Button>
    </div>
  );
};

export default FormActions;
