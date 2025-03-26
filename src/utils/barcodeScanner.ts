
/**
 * Utility for handling barcode scanning functionality
 * This provides an abstraction over different barcode scanning methods
 */

// Interface for barcode scanner options
export interface BarcodeScannerOptions {
  onDetect: (barcode: string) => void;
  onError?: (error: Error) => void;
}

// Enum for supported scanner types
export enum ScannerType {
  KEYBOARD = 'keyboard',
  CAMERA = 'camera',
  USB = 'usb'
}

// Class for managing barcode scanning
export class BarcodeScanner {
  private options: BarcodeScannerOptions;
  private active: boolean = false;
  private buffer: string = '';
  private bufferTimeout: number | null = null;
  private scannerType: ScannerType;

  constructor(options: BarcodeScannerOptions, scannerType: ScannerType = ScannerType.KEYBOARD) {
    this.options = options;
    this.scannerType = scannerType;
  }

  // Start scanning for barcodes
  public start(): void {
    if (this.active) return;
    
    this.active = true;
    
    switch (this.scannerType) {
      case ScannerType.KEYBOARD:
        this.startKeyboardScanner();
        break;
      case ScannerType.CAMERA:
        this.startCameraScanner();
        break;
      case ScannerType.USB:
        this.startUSBScanner();
        break;
    }
  }

  // Stop scanning
  public stop(): void {
    if (!this.active) return;
    
    this.active = false;
    
    switch (this.scannerType) {
      case ScannerType.KEYBOARD:
        this.stopKeyboardScanner();
        break;
      case ScannerType.CAMERA:
        this.stopCameraScanner();
        break;
      case ScannerType.USB:
        this.stopUSBScanner();
        break;
    }
    
    this.clearBuffer();
  }

  // Handle keyboard scanner
  private keyboardListener = (event: KeyboardEvent) => {
    // If Enter is detected, process the buffered barcode
    if (event.key === "Enter" && this.buffer.length > 0) {
      this.options.onDetect(this.buffer);
      this.clearBuffer();
      event.preventDefault();
    } 
    // If key is a valid barcode character, add to buffer
    else if (/^[a-zA-Z0-9-_]$/.test(event.key)) {
      this.buffer += event.key;
      
      // Reset timeout to clear buffer after 100ms of inactivity
      if (this.bufferTimeout) {
        clearTimeout(this.bufferTimeout);
      }
      
      this.bufferTimeout = window.setTimeout(() => {
        this.clearBuffer();
      }, 100);
    }
  };

  // Start keyboard-based scanner
  private startKeyboardScanner(): void {
    window.addEventListener('keydown', this.keyboardListener);
  }

  // Stop keyboard-based scanner
  private stopKeyboardScanner(): void {
    window.removeEventListener('keydown', this.keyboardListener);
  }

  // Camera-based scanning (placeholder, would use a library like QuaggaJS in real implementation)
  private startCameraScanner(): void {
    console.log('Camera scanner not fully implemented');
    // In a real app, we would use a library like QuaggaJS or zxing
    if (this.options.onError) {
      this.options.onError(new Error('Camera scanner not implemented'));
    }
  }

  private stopCameraScanner(): void {
    // Stop camera scanning
  }

  // USB-based scanner (placeholder for hardware integration)
  private startUSBScanner(): void {
    console.log('USB scanner not fully implemented');
    // Would use Web USB API in a real implementation
    if (this.options.onError) {
      this.options.onError(new Error('USB scanner not implemented'));
    }
  }

  private stopUSBScanner(): void {
    // Disconnect USB device
  }

  // Clear the barcode buffer
  private clearBuffer(): void {
    this.buffer = '';
    if (this.bufferTimeout) {
      clearTimeout(this.bufferTimeout);
      this.bufferTimeout = null;
    }
  }
}

// Factory function to create a barcode scanner
export const createBarcodeScanner = (
  options: BarcodeScannerOptions,
  scannerType: ScannerType = ScannerType.KEYBOARD
): BarcodeScanner => {
  return new BarcodeScanner(options, scannerType);
};

export default {
  createBarcodeScanner,
  ScannerType
};
