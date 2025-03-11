
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  handleSave: () => void;
}

const FormActions = ({ handleSave }: FormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-3 mt-6">
      <Button 
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Save
      </Button>
      <Button 
        onClick={() => navigate("/data-entry/bill-of-lading")}
        variant="outline"
      >
        Go Back
      </Button>
    </div>
  );
};

export default FormActions;
