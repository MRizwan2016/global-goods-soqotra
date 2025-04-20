
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  className?: string;
}

const BackButton = ({ to, className }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 hover:bg-slate-100 ${className || ''}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
};

export default BackButton;
