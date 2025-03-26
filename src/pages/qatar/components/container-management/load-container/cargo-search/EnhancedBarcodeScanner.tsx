
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Barcode, Search, Keyboard, QrCode } from "lucide-react";
import useBarcodeScanner from "../../../../hooks/useBarcodeScanner";
import { toast } from "sonner";

interface EnhancedBarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

const EnhancedBarcodeScanner: React.FC<EnhancedBarcodeScannerProps> = ({
  onBarcodeDetected
}) => {
  const [manualBarcode, setManualBarcode] = useState("");
  
  const { 
    scanning, 
    manualEntry, 
    toggleScanning, 
    toggleManualEntry 
  } = useBarcodeScanner({
    onBarcodeDetected: (barcode) => {
      onBarcodeDetected(barcode);
      toast.success(`Barcode detected: ${barcode}`);
    }
  });

  const handleManualSearch = () => {
    if (manualBarcode.trim()) {
      onBarcodeDetected(manualBarcode.trim());
      setManualBarcode("");
    } else {
      toast.error("Please enter a barcode");
    }
  };

  return (
    <div className="space-y-3">
      <Label className="font-bold text-gray-700 mb-1 block">BARCODE SCANNING:</Label>
      
      <div className="flex items-center gap-2 mb-3">
        <Button 
          type="button"
          onClick={toggleScanning}
          variant={scanning ? "default" : "outline"}
          className={scanning ? "bg-green-600 hover:bg-green-700" : ""}
        >
          <Barcode className="mr-2 h-4 w-4" />
          {scanning ? "Scanning Active" : "Start Scanner"}
        </Button>
        
        <Button 
          type="button"
          onClick={toggleManualEntry}
          variant={manualEntry ? "default" : "outline"}
          className={manualEntry ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          <Keyboard className="mr-2 h-4 w-4" />
          Manual Entry
        </Button>
      </div>
      
      {manualEntry && (
        <div className="flex gap-2 items-center">
          <Barcode size={24} className="text-gray-700" />
          <Input
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            placeholder="ENTER BARCODE"
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
          />
          <Button 
            variant="outline"
            className="border-blue-500 text-blue-500"
            onClick={handleManualSearch}
          >
            <Search size={18} />
          </Button>
        </div>
      )}
      
      {scanning && (
        <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center">
          <QrCode className="h-8 w-8 mx-auto mb-2 text-blue-600 animate-pulse" />
          <p className="text-sm font-medium">Scanner active. Scan a barcode now...</p>
          <p className="text-xs text-gray-500 mt-1">Or press ESC to cancel</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedBarcodeScanner;
