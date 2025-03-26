
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Search, ZapOff, Zap, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { createBarcodeScanner, ScannerType } from "@/utils/barcodeScanner";

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
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerType, setScannerType] = useState<ScannerType>(ScannerType.KEYBOARD);
  
  useEffect(() => {
    // Create barcode scanner when component mounts
    if (scannerActive) {
      const scanner = createBarcodeScanner({
        onDetect: (detectedBarcode) => {
          onBarcodeChange(detectedBarcode);
          toast.success(`Barcode detected: ${detectedBarcode}`);
          onBarcodeSearch();
        },
        onError: (err) => {
          toast.error(`Scanner error: ${err.message}`);
          setScannerActive(false);
        }
      }, scannerType);
      
      // Start scanner
      scanner.start();
      
      // Clean up on unmount
      return () => {
        scanner.stop();
      };
    }
  }, [scannerActive, scannerType, onBarcodeChange, onBarcodeSearch]);
  
  const toggleScanner = () => {
    setScannerActive(!scannerActive);
    if (!scannerActive) {
      toast.info("Barcode scanner activated");
    } else {
      toast.info("Barcode scanner deactivated");
    }
  };
  
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
          onKeyDown={(e) => e.key === "Enter" && onBarcodeSearch()}
        />
        <Button 
          variant="outline"
          className="border-blue-500 text-blue-500"
          onClick={onBarcodeSearch}
        >
          <Search size={18} />
        </Button>
        <Button
          variant={scannerActive ? "default" : "outline"}
          className={scannerActive ? "bg-green-600 hover:bg-green-700" : ""}
          onClick={toggleScanner}
          title={scannerActive ? "Deactivate Scanner" : "Activate Scanner"}
        >
          {scannerActive ? <Zap size={18} /> : <ZapOff size={18} />}
        </Button>
      </div>
      
      {scannerActive && (
        <div className="mt-2 bg-green-50 border border-green-200 rounded p-2 text-sm">
          <div className="flex items-center text-green-700">
            <Zap size={16} className="mr-1" />
            <span>Scanner active - ready to scan</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeSearch;
