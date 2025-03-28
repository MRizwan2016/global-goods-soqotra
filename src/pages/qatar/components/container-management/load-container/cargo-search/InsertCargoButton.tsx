
import React from "react";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

interface InsertCargoButtonProps {
  onClick: () => void; // Changed from onInsertCargo to match usage
  disabled?: boolean;
  onInsertCargo?: () => void; // Keep the original for backward compatibility
}

const InsertCargoButton: React.FC<InsertCargoButtonProps> = ({
  onClick, // Using the new prop name
  disabled = false,
  onInsertCargo
}) => {
  // Determine which handler to use
  const handleClick = onClick || onInsertCargo;

  return (
    <div className="mt-4 flex justify-end">
      <Button
        onClick={handleClick}
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
