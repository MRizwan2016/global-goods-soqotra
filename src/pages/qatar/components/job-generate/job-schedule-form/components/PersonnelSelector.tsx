
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
    <div>
      <Label htmlFor={id}>{label}:</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id={id} className="bg-blue-500 text-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {options.map(option => (
            <SelectItem key={option.id} value={option.name}>
              {option.name} {option.code ? `(${option.code})` : option.license ? `(${option.license})` : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PersonnelSelector;
