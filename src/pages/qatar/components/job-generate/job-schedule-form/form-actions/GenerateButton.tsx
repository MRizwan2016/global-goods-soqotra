
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Truck, Save } from "lucide-react";

interface GenerateButtonProps {
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ disabled }) => {
  return (
    <div className="space-y-2">
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 py-5 text-md font-semibold"
        disabled={disabled}
      >
        <Printer size={18} />
        GENERATE JOB SCHEDULE
      </Button>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-1"
          disabled={disabled}
        >
          <Save size={14} />
          Save Draft
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-1"
          disabled={disabled}
        >
          <Truck size={14} />
          Assign Jobs
        </Button>
      </div>
    </div>
  );
};

export default GenerateButton;
