
import React from "react";
import { Check, Flag, Globe } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface CountrySelectorProps {
  selectedCountry: string;
  onChange: (value: string) => void;
}

// Countries with operations in the system
const COUNTRIES = [
  { value: "all", label: "All Countries", icon: <Globe size={16} /> },
  { value: "qa", label: "Qatar", icon: <Flag size={16} /> },
  { value: "ke", label: "Kenya", icon: <Flag size={16} /> },
  { value: "er", label: "Eritrea", icon: <Flag size={16} /> },
  { value: "sd", label: "Sudan", icon: <Flag size={16} /> },
  { value: "tn", label: "Tunisia", icon: <Flag size={16} /> },
  { value: "ph", label: "Philippines", icon: <Flag size={16} /> },
  { value: "mz", label: "Mozambique", icon: <Flag size={16} /> },
  { value: "sa", label: "Saudi Arabia", icon: <Flag size={16} /> },
  { value: "ae", label: "UAE", icon: <Flag size={16} /> },
  { value: "om", label: "Oman", icon: <Flag size={16} /> },
  { value: "lk", label: "Sri Lanka", icon: <Flag size={16} /> },
];

export const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  selectedCountry, 
  onChange 
}) => {
  return (
    <Select value={selectedCountry} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {COUNTRIES.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              <div className="flex items-center">
                <span className="mr-2">{country.icon}</span>
                <span>{country.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
