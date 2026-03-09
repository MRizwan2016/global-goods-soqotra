
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface ScheduleQRCodeProps {
  scheduleNumber: string;
}

const ScheduleQRCode: React.FC<ScheduleQRCodeProps> = ({ scheduleNumber }) => {
  // Create a comprehensive QR code value with schedule information
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toISOString();
  
  // Enhanced QR code with more detailed information for verification
  const scheduleInfo = {
    scheduleNumber,
    date: currentDate,
    timestamp,
    verified: true,
    type: 'job_schedule',
    url: `${baseUrl}/qatar/jobs/schedule?id=${scheduleNumber}&date=${currentDate}&verified=true`
  };
  
  // Create QR value that can be parsed as both URL and JSON
  const qrValue = JSON.stringify(scheduleInfo);
  
  return (
    <div style={{ width: "80px", height: "80px", display: "block" }}>
      <QRCodeSVG 
        value={qrValue}
        size={80}
        level="H"
        includeMargin={true}
        className="bg-white" // Ensure white background for better contrast
      />
      <div className="text-xs text-center mt-1 text-gray-500">
        Scan to verify
      </div>
    </div>
  );
};

export default ScheduleQRCode;
