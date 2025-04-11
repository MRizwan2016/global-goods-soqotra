
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManualEntryFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({
  value,
  onChange,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="flex gap-2">
      <Input 
        placeholder="Enter invoice number (e.g., GY000123)"
        value={value}
        onChange={onChange}
        className="flex-1"
      />
      <Button 
        type="button" 
        onClick={onSubmit}
        className="whitespace-nowrap"
      >
        Submit
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="whitespace-nowrap"
      >
        Cancel
      </Button>
    </div>
  );
};

export default ManualEntryForm;
