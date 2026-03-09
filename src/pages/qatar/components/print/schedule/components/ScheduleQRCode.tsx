
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface ScheduleQRCodeProps {
  scheduleNumber: string;
}

const ScheduleQRCode: React.FC<ScheduleQRCodeProps> = ({ scheduleNumber }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toLocaleString();
  
  // Plain text verification info — no URL to avoid auth redirects
  const qrValue = `SOQOTRA Job Schedule\nSchedule: ${scheduleNumber}\nDate: ${currentDate}\nPrinted: ${timestamp}\nStatus: Verified`;
  
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
