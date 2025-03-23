
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchMethodSelectorProps {
  searchBy: string;
  onSearchMethodChange: (value: string) => void;
}

const SearchMethodSelector: React.FC<SearchMethodSelectorProps> = ({
  searchBy,
  onSearchMethodChange,
}) => {
  return (
    <div>
      <Label className="font-bold text-gray-700 mb-1 block">SEARCH BY:</Label>
      <Select value={searchBy} onValueChange={onSearchMethodChange}>
        <SelectTrigger className="bg-blue-500 text-white">
          <SelectValue placeholder="GY" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GY">GY</SelectItem>
          <SelectItem value="BARCODE">BARCODE</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchMethodSelector;
