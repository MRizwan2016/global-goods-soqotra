
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface BarcodeScannerHookProps {
  onBarcodeDetected: (barcode: string) => void;
  enabled?: boolean;
  onInvoiceBarcodeDetected?: (invoiceBarcode: string) => void;
}

export const useBarcodeScanner = ({ 
  onBarcodeDetected, 
  enabled = true,
  onInvoiceBarcodeDetected
}: BarcodeScannerHookProps) => {
  const [scanning, setScanning] = useState(false);
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);
  const [manualEntry, setManualEntry] = useState(false);
  
  // Handle keyboard scanner input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || manualEntry) return;
    
    // Most barcode scanners send an Enter key after scanning
    if (event.key === "Enter" && lastBarcode) {
      // Process the barcode (make it uppercase)
      const processedBarcode = lastBarcode.toUpperCase();
      
      // Check if this is an invoice barcode (e.g., starts with GY or has specific format)
      const isInvoiceBarcode = /^(GY|gy|Gy|gY)?[0-9]{7,8}$/.test(processedBarcode);
      
      if (isInvoiceBarcode && onInvoiceBarcodeDetected) {
        // Format invoice number (remove GY prefix if present)
        const formattedInvoice = processedBarcode.replace(/^(GY|gy|Gy|gY)/, "");
        onInvoiceBarcodeDetected(formattedInvoice);
        toast.info(`Invoice barcode detected: ${formattedInvoice}`, {
          duration: 2000
        });
      } else {
        // Regular package barcode
        onBarcodeDetected(processedBarcode);
        toast.info(`Package barcode detected: ${processedBarcode}`, {
          duration: 2000
        });
      }
      
      // Reset for next scan
      setLastBarcode(null);
      event.preventDefault();
    } else if (/^[a-zA-Z0-9-_]$/.test(event.key)) {
      // Append to the current barcode
      setLastBarcode(prev => ((prev || "") + event.key));
    }
  }, [enabled, lastBarcode, manualEntry, onBarcodeDetected, onInvoiceBarcodeDetected]);

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
    toast.info("BARCODE SCANNER ACTIVATED", {
      description: "Ready to scan invoice or package barcodes"
    });
  };

  const stopScanning = () => {
    setScanning(false);
    toast.info("BARCODE SCANNER DEACTIVATED");
  };

  // Toggle manual entry mode
  const toggleManualEntry = () => {
    setManualEntry(prev => !prev);
    toast.info(manualEntry ? "Manual entry mode disabled" : "Manual entry mode enabled");
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
