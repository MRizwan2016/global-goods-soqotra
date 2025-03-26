
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PrintOptions } from "../../../types/containerTypes";

interface PrintOptionsSelectorProps {
  printOptions: PrintOptions;
  setPrintOptions: (options: PrintOptions) => void;
}

const PrintOptionsSelector: React.FC<PrintOptionsSelectorProps> = ({
  printOptions,
  setPrintOptions
}) => {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="print-section">Print Section:</Label>
        <Select 
          value={printOptions.section} 
          onValueChange={(value) => setPrintOptions({
            ...printOptions,
            section: value as "all" | "cargo" | "items" | "consignees" | "invoices"
          })}
        >
          <SelectTrigger id="print-section" className="w-[180px]">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="cargo">Cargo Items</SelectItem>
            <SelectItem value="items">Item List</SelectItem>
            <SelectItem value="consignees">Consignee List</SelectItem>
            <SelectItem value="invoices">Unsettled Invoices</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Label htmlFor="orientation">Page Orientation:</Label>
        <Select 
          value={printOptions.orientation} 
          onValueChange={(value) => setPrintOptions({
            ...printOptions,
            orientation: value as "portrait" | "landscape"
          })}
        >
          <SelectTrigger id="orientation" className="w-[150px]">
            <SelectValue placeholder="Select orientation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PrintOptionsSelector;
