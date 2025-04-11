
import React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: React.ReactNode; // Changed from string to ReactNode to allow elements
  name: string;
  value: string | number;
  readOnly?: boolean;
  className?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  value, 
  readOnly = false,
  className,
  type = "text",
  onChange
}) => {
  const isJobNumber = name === 'jobNumber' || name === 'jobNumberDisplay';
  
  return (
    <div className="mb-3">
      <label 
        htmlFor={name} 
        className="block text-xs text-gray-500 uppercase mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        readOnly={readOnly}
        onChange={onChange}
        className={cn(
          "w-full p-2 border border-gray-300 rounded text-sm",
          readOnly ? "bg-gray-50" : "",
          isJobNumber ? "font-bold text-black" : "",
          className
        )}
      />
    </div>
  );
};

export default InputField;
