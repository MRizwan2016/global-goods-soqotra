
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrCodeSectionProps {
  qrData: string;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ qrData }) => {
  return (
    <div className="flex justify-center mt-4 mb-6">
      <div className="text-center">
        <QRCodeSVG 
          value={qrData} 
          size={120} 
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"M"}
          includeMargin={false}
        />
        <p className="text-xs text-gray-500 mt-2">Scan to verify receipt</p>
      </div>
    </div>
  );
};

export default QrCodeSection;
