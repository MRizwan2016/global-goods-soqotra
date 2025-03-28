
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { PrintOptions } from "../../../types/containerTypes";

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
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">PRINT SECTION:</span>
        <Select 
          value={printOptions.section} 
          onValueChange={(value) => onPrintOptionsChange({ section: value as any })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="SELECT SECTION" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ALL SECTIONS</SelectItem>
            <SelectItem value="cargo">CARGO DETAILS</SelectItem>
            <SelectItem value="items">ITEM LIST</SelectItem>
            <SelectItem value="consignees">CONSIGNEE LIST</SelectItem>
            <SelectItem value="invoices">UNSETTLED INVOICES</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">LAYOUT:</span>
        <Select 
          value={printOptions.orientation} 
          onValueChange={(value) => onPrintOptionsChange({ orientation: value as any })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="SELECT ORIENTATION" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">PORTRAIT</SelectItem>
            <SelectItem value="landscape">LANDSCAPE</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={onPrintClick} 
        className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform"
        disabled={isPrinting}
      >
        <Printer className="h-4 w-4 mr-2" />
        PRINT MANIFEST
      </Button>
    </div>
  );
};

export default ActionBar;
