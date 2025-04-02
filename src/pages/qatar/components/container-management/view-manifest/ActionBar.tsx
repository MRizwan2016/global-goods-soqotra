
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Printer, FileDown } from "lucide-react";
import { PrintOptions } from "../../../types/containerTypes";
import { Label } from "@/components/ui/label";

interface ActionBarProps {
  printOptions: PrintOptions;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrintClick: () => void;
  isPrinting: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
  printOptions,
  onPrintOptionsChange,
  onPrintClick,
  isPrinting
}) => {
  const handlePrintClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Print button clicked in ActionBar");
    onPrintClick();
  };

  return (
    <div className="flex items-center gap-4 no-print">
      <div className="flex items-center gap-2">
        <Label htmlFor="print-section">Print Section:</Label>
        <Select 
          value={printOptions.section} 
          onValueChange={(value) => onPrintOptionsChange({ 
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
        <Label htmlFor="orientation">Page Layout:</Label>
        <Select 
          value={printOptions.orientation} 
          onValueChange={(value) => onPrintOptionsChange({ 
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
      
      <Button 
        onClick={handlePrintClick}
        disabled={isPrinting}
        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
      >
        <Printer size={16} />
        Print Manifest
      </Button>
    </div>
  );
};

export default ActionBar;
