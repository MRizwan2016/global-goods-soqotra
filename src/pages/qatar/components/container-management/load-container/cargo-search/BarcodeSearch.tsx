
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Search } from "lucide-react";

interface BarcodeSearchProps {
  barcode: string;
  onBarcodeChange: (value: string) => void;
  onBarcodeSearch: () => void;
}

const BarcodeSearch: React.FC<BarcodeSearchProps> = ({
  barcode,
  onBarcodeChange,
  onBarcodeSearch,
}) => {
  return (
    <div>
      <Label className="font-bold text-gray-700 mb-1 block">SEARCH BARCODE:</Label>
      <div className="flex gap-2 items-center">
        <Barcode size={24} className="text-gray-700" />
        <Input
          value={barcode}
          onChange={(e) => onBarcodeChange(e.target.value)}
          placeholder="BARCODE"
          className="flex-1"
        />
        <Button 
          variant="outline"
          className="border-blue-500 text-blue-500"
          onClick={onBarcodeSearch}
        >
          <Search size={18} />
        </Button>
      </div>
    </div>
  );
};

export default BarcodeSearch;
