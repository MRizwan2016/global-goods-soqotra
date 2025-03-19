
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface GenerateButtonProps {
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ disabled }) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
      disabled={disabled}
    >
      <Printer size={16} />
      GENERATE JOB SCHEDULE
    </Button>
  );
};

export default GenerateButton;
