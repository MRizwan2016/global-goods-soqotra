
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface FormActionsProps {
  handleSave: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  handleSave,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePrint = () => {
    if (id) {
      window.open(`/data-entry/invoicing/print/${id}`, '_blank');
    }
  };

  return (
    <div className="mt-8 flex justify-end gap-4">
      <Button 
        type="button"
        onClick={() => navigate("/data-entry/invoicing")}
        className="bg-gray-500 hover:bg-gray-600"
      >
        Cancel
      </Button>
      
      {id && (
        <Button
          type="button"
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Printer size={16} className="mr-2" />
          Print
        </Button>
      )}
      
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
