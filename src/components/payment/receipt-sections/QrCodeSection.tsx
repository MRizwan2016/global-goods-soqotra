
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrCodeSectionProps {
  qrData: string;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ qrData }) => {
  return (
    <div className="flex justify-center mt-2 mb-3">
      <div className="text-center">
        <QRCodeSVG 
          value={qrData} 
          size={72} 
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"M"}
          includeMargin={false}
        />
        <p className="text-[9px] text-gray-500 mt-1">Scan to verify receipt</p>
      </div>
    </div>
  );
};

export default QrCodeSection;
