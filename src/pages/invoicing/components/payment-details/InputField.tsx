
import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  readOnly?: boolean;
  type?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  readOnly = false,
  type = "text",
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}:</label>
      <Input 
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`border border-gray-300 ${readOnly ? 'bg-gray-50' : ''} ${className}`}
        type={type}
      />
    </div>
  );
};

export default InputField;
