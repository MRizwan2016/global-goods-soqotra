
import React from "react";
import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";

interface CargoFormActionsProps {
  onSubmit: (e: React.FormEvent) => void;
}

const CargoFormActions: React.FC<CargoFormActionsProps> = ({ onSubmit }) => {
  return (
    <div className="flex justify-end">
      <Button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700"
      >
        <PackageOpen className="h-4 w-4 mr-2" />
        Add Cargo to Container
      </Button>
    </div>
  );
};

export default CargoFormActions;
