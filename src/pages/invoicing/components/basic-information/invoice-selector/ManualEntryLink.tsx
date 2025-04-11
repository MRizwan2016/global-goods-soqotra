
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ManualEntryLinkProps {
  onClick: () => void;
}

const ManualEntryLink: React.FC<ManualEntryLinkProps> = ({ onClick }) => {
  return (
    <div className="mt-1 flex justify-end">
      <Button 
        type="button" 
        variant="link" 
        className="p-0 h-auto text-xs"
        onClick={onClick}
      >
        <Plus className="h-3 w-3 mr-1" /> Enter invoice number manually
      </Button>
    </div>
  );
};

export default ManualEntryLink;
