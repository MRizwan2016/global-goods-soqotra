
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  handleSave: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  handleSave,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex justify-end gap-4">
      <Button 
        type="button"
        onClick={() => navigate("/data-entry/invoicing")}
        className="bg-gray-500 hover:bg-gray-600"
      >
        Cancel
      </Button>
      <Button 
        type="button"
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-600"
      >
        Save
      </Button>
    </div>
  );
};

export default FormActions;
