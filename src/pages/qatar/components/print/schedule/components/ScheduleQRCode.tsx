
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface ScheduleQRCodeProps {
  scheduleNumber: string;
}

const ScheduleQRCode: React.FC<ScheduleQRCodeProps> = ({ scheduleNumber }) => {
  // Create a value for the QR code that includes relevant information
  // Adding more details and using a proper URL format for better functionality
  const baseUrl = window.location.origin; // Get the base URL of the application
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Format: URL with parameters for proper routing
  const qrValue = `${baseUrl}/qatar/jobs/print?schedule=${scheduleNumber}&date=${currentDate}&verified=true`;
  
  return (
    <div className="print:block" style={{ width: "80px", height: "80px" }}>
      <QRCodeSVG 
        value={qrValue}
        size={80}
        level="H"
        includeMargin={true}
      />
      <div className="text-xs text-center mt-1 text-gray-500">
        Scan to verify
      </div>
    </div>
  );
};

export default ScheduleQRCode;
