
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface BarcodeScannerHookProps {
  onBarcodeDetected: (barcode: string) => void;
  enabled?: boolean;
}

export const useBarcodeScanner = ({ 
  onBarcodeDetected, 
  enabled = true 
}: BarcodeScannerHookProps) => {
  const [scanning, setScanning] = useState(false);
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);
  const [manualEntry, setManualEntry] = useState(false);
  
  // Handle keyboard scanner input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || manualEntry) return;
    
    // Most barcode scanners send an Enter key after scanning
    if (event.key === "Enter" && lastBarcode) {
      onBarcodeDetected(lastBarcode);
      setLastBarcode(null);
      event.preventDefault();
    } else if (/^[a-zA-Z0-9-_]$/.test(event.key)) {
      // Append to the current barcode
      setLastBarcode(prev => (prev || "") + event.key);
    }
  }, [enabled, lastBarcode, manualEntry, onBarcodeDetected]);

  // Start/stop scanning
  const toggleScanning = () => {
    if (scanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  const startScanning = () => {
    setScanning(true);
    setLastBarcode(null);
    toast.info("Barcode scanner activated");
  };

  const stopScanning = () => {
    setScanning(false);
    toast.info("Barcode scanner deactivated");
  };

  // Toggle manual entry mode
  const toggleManualEntry = () => {
    setManualEntry(prev => !prev);
  };

  // Set up keydown listener for barcode scanner
  useEffect(() => {
    if (enabled && scanning) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [enabled, scanning, handleKeyDown]);

  return {
    scanning,
    manualEntry,
    toggleScanning,
    startScanning,
    stopScanning,
    toggleManualEntry,
    setManualEntry
  };
};

export default useBarcodeScanner;
