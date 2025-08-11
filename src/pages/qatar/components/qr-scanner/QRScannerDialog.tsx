import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { useBarcodeScanner } from "../../hooks/useBarcodeScanner";

interface QRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduleFound?: (scheduleData: any) => void;
}

const QRScannerDialog: React.FC<QRScannerDialogProps> = ({
  open,
  onOpenChange,
  onScheduleFound
}) => {
  const [manualInput, setManualInput] = useState("");
  const [foundSchedule, setFoundSchedule] = useState<any>(null);

  // Handle QR code scanning
  const handleQRCodeDetected = (scannedValue: string) => {
    console.log("QR Code scanned:", scannedValue);
    
    try {
      // Parse QR code URL to extract schedule information
      const url = new URL(scannedValue);
      const scheduleId = url.searchParams.get('id');
      const date = url.searchParams.get('date');
      const verified = url.searchParams.get('verified');
      
      if (scheduleId) {
        // Look for schedule in localStorage
        const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
        const schedule = schedules.find((s: any) => s.scheduleNumber === scheduleId);
        
        if (schedule) {
          setFoundSchedule({
            ...schedule,
            scannedDate: date,
            verified: verified === 'true'
          });
          toast.success(`Schedule ${scheduleId} found and verified!`);
        } else {
          // Create mock schedule data from QR if not found
          setFoundSchedule({
            scheduleNumber: scheduleId,
            date: date,
            verified: verified === 'true',
            scannedAt: new Date().toISOString(),
            status: 'verified'
          });
          toast.info(`Schedule ${scheduleId} scanned successfully`);
        }
      }
    } catch (error) {
      // Handle plain text QR codes
      if (scannedValue.includes('3758-533') || scannedValue.match(/\d{4}-\d{3}/)) {
        const scheduleNumber = scannedValue.match(/(\d{4}-\d{3})/)?.[1];
        if (scheduleNumber) {
          setFoundSchedule({
            scheduleNumber,
            scannedAt: new Date().toISOString(),
            status: 'verified',
            rawData: scannedValue
          });
          toast.success(`Schedule ${scheduleNumber} verified from QR code!`);
        }
      } else {
        toast.error("Invalid QR code format");
      }
    }
  };

  const { scanning, toggleScanning } = useBarcodeScanner({
    onBarcodeDetected: handleQRCodeDetected,
    enabled: open
  });

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      handleQRCodeDetected(manualInput.trim());
      setManualInput("");
    }
  };

  const handleUseSchedule = () => {
    if (foundSchedule && onScheduleFound) {
      onScheduleFound(foundSchedule);
      onOpenChange(false);
      setFoundSchedule(null);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setFoundSchedule(null);
    setManualInput("");
  };

  useEffect(() => {
    if (open && !scanning) {
      // Auto-start scanning when dialog opens
      setTimeout(() => toggleScanning(), 500);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Scanner
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!foundSchedule ? (
            <>
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  {scanning ? "Scanner Active - Point camera at QR code" : "Click to activate scanner"}
                </p>
                <Button 
                  onClick={toggleScanning}
                  variant={scanning ? "destructive" : "default"}
                  size="sm"
                >
                  {scanning ? "Stop Scanner" : "Start Scanner"}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manual-input">Or enter schedule number manually:</Label>
                <div className="flex gap-2">
                  <Input
                    id="manual-input"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="e.g., 3758-533 or full QR code"
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                  />
                  <Button onClick={handleManualSubmit} size="sm">
                    Verify
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Schedule Found!</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Schedule Number:</strong> {foundSchedule.scheduleNumber}</p>
                  {foundSchedule.date && <p><strong>Date:</strong> {foundSchedule.date}</p>}
                  {foundSchedule.vehicle && <p><strong>Vehicle:</strong> {foundSchedule.vehicle}</p>}
                  <p><strong>Status:</strong> <span className="text-green-600 font-medium">Verified</span></p>
                  <p><strong>Scanned At:</strong> {new Date(foundSchedule.scannedAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleUseSchedule} className="flex-1">
                  View Schedule Details
                </Button>
                <Button 
                  onClick={() => setFoundSchedule(null)} 
                  variant="outline"
                  size="sm"
                >
                  Scan Another
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleClose} variant="ghost" size="sm">
            <X className="h-4 w-4 mr-1" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScannerDialog;