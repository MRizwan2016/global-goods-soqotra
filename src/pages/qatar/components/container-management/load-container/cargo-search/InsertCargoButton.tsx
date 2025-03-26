
import React from "react";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

interface InsertCargoButtonProps {
  onInsertCargo: () => void;
  disabled?: boolean;
}

const InsertCargoButton: React.FC<InsertCargoButtonProps> = ({
  onInsertCargo,
  disabled = false
}) => {
  return (
    <div className="mt-4 flex justify-end">
      <Button
        onClick={onInsertCargo}
        disabled={disabled}
        className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all px-6 py-2 text-white font-medium uppercase"
      >
        <PackagePlus className="h-5 w-5 mr-2" />
        ADD PACKAGE TO CONTAINER
      </Button>
    </div>
  );
};

export default InsertCargoButton;
