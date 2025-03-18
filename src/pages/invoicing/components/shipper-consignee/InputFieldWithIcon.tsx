
import React from "react";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface InputFieldWithIconProps {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
}

const InputFieldWithIcon: React.FC<InputFieldWithIconProps> = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  placeholder,
  className = ""
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 flex items-center">
        {Icon && <Icon className="mr-1 h-4 w-4 text-gray-500" />}
        {label}:
      </label>
      <Input 
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`border border-gray-300 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFieldWithIcon;
