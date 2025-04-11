
import React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  readOnly?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  value, 
  readOnly = false,
  className
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
        type="text"
        id={name}
        name={name}
        value={value || ''}
        readOnly={readOnly}
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
