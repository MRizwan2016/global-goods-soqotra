
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
  searchMethod: "invoice" | "barcode"; // Updated to match what's being passed
  onMethodChange: (value: "invoice" | "barcode") => void; // Updated to match what's being passed
}

const SearchMethodSelector: React.FC<SearchMethodSelectorProps> = ({
  searchMethod, 
  onMethodChange, 
}) => {
  return (
    <div>
      <Label className="font-bold text-gray-700 mb-1 block">SEARCH BY:</Label>
      <Select value={searchMethod} onValueChange={onMethodChange}>
        <SelectTrigger className="bg-blue-500 text-white">
          <SelectValue placeholder="INVOICE" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="invoice">INVOICE</SelectItem>
          <SelectItem value="barcode">BARCODE</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchMethodSelector;
