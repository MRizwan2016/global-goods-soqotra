
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonnelOption {
  id: string;
  name: string;
  code?: string;
  license?: string;
}

interface PersonnelSelectorProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: PersonnelOption[];
  placeholder: string;
}

const PersonnelSelector: React.FC<PersonnelSelectorProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="mb-3">
      <Label htmlFor={id} className="font-bold text-gray-700 mb-1 block">{label}:</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger 
          id={id} 
          className="bg-blue-500 text-white font-semibold border-0 hover:bg-blue-600 transition-colors"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {options.map(option => (
            <SelectItem 
              key={option.id} 
              value={option.name}
              className="py-2 hover:bg-blue-50 transition-colors"
            >
              <div className="flex flex-col">
                <div className="font-medium">{option.name}</div>
                {option.code && <div className="text-xs text-gray-500">Code: {option.code}</div>}
                {option.license && <div className="text-xs text-gray-500">License: {option.license}</div>}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PersonnelSelector;
