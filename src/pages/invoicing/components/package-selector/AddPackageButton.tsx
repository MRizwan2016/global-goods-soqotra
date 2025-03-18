
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddPackageButtonProps {
  handleAddPackage: () => void;
}

const AddPackageButton: React.FC<AddPackageButtonProps> = ({
  handleAddPackage,
}) => {
  return (
    <div className="md:col-span-1 flex items-end">
      <Button
        type="button"
        onClick={handleAddPackage}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 w-full"
      >
        <Plus size={18} className="mr-2" />
        Add Package
      </Button>
    </div>
  );
};

export default AddPackageButton;
