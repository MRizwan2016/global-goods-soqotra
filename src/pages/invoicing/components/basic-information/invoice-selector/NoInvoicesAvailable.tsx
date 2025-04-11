
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NoInvoicesAvailableProps {
  onManualEntryClick: () => void;
}

const NoInvoicesAvailable: React.FC<NoInvoicesAvailableProps> = ({ 
  onManualEntryClick 
}) => {
  return (
    <div className="flex gap-2">
      <Input 
        value="No invoice numbers available"
        readOnly
        className="w-full bg-gray-100"
      />
      <Button 
        type="button" 
        onClick={onManualEntryClick}
        className="whitespace-nowrap"
      >
        Enter Manually
      </Button>
    </div>
  );
};

export default NoInvoicesAvailable;
