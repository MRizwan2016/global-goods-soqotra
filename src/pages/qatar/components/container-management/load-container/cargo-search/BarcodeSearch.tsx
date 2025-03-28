
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Search, ZapOff, Zap, Keyboard } from "lucide-react";
import { toast } from "sonner";

enum ScannerType {
  KEYBOARD = 'keyboard',
  CAMERA = 'camera'
}

// Mock barcode scanner utility for demonstration purposes
const createBarcodeScanner = (config: any, type: ScannerType) => {
  return {
    start: () => console.log(`Started ${type} scanner`),
    stop: () => console.log(`Stopped ${type} scanner`)
  };
};

interface BarcodeSearchProps {
  value: string; // Added to match passed props
  onChange: (value: string) => void; // Added to match passed props
  onSearch: () => void; // Added to match passed props
  barcode?: string;
  onBarcodeChange?: (value: string) => void;
  onBarcodeSearch?: () => void;
}

const BarcodeSearch: React.FC<BarcodeSearchProps> = ({
  value,
  onChange,
  onSearch,
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
        onDetect: (detectedBarcode: string) => {
          onChange(detectedBarcode);
          toast.success(`Barcode detected: ${detectedBarcode}`);
          onSearch();
        },
        onError: (err: Error) => {
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
  }, [scannerActive, scannerType, onChange, onSearch]);
  
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="BARCODE"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <Button 
          variant="outline"
          className="border-blue-500 text-blue-500"
          onClick={onSearch}
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
