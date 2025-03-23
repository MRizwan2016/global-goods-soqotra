
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsertCargoButtonProps {
  onInsertCargo: () => void;
}

const InsertCargoButton: React.FC<InsertCargoButtonProps> = ({
  onInsertCargo,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <Button 
        variant="default" 
        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
        onClick={onInsertCargo}
      >
        <Plus size={18} />
        Insert
      </Button>
    </div>
  );
};

export default InsertCargoButton;
