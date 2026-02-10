
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onSubmit: (e: React.FormEvent) => void;
}

const FormActions = ({ onSubmit }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 mt-6">
      <Link to="/kenya/deliveries">
        <Button variant="outline" type="button">Cancel</Button>
      </Link>
      <Button type="submit" onClick={onSubmit} className="bg-[#3b5998] hover:bg-[#1e2a3a]">Create Delivery</Button>
    </div>
  );
};

export default FormActions;
