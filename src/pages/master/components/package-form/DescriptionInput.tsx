
import React from "react";
import { Input } from "@/components/ui/input";

interface DescriptionInputProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ description, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Description:</label>
        <Input 
          name="description"
          value={description}
          onChange={onChange}
          className="border border-gray-300"
          placeholder="e.g., WOODEN BOX or CARTON BOX"
        />
      </div>
    </div>
  );
};

export default DescriptionInput;
