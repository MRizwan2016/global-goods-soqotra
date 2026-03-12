import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface InvoiceQRCodeProps {
  jobNumber: string;
  customer: string;
  invoiceNumber?: string;
}

const InvoiceQRCode: React.FC<InvoiceQRCodeProps> = ({ 
  jobNumber, 
  customer, 
  invoiceNumber 
}) => {
  // Create a comprehensive QR code value for invoice verification
  const publishedUrl = 'https://global-goods-soqotra.lovable.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Include job details in QR code for verification
  const qrValue = `${publishedUrl}/receipt?inv=${encodeURIComponent(invoiceNumber || '')}&customer=${encodeURIComponent(customer)}&date=${currentDate}&status=UNPAID`;
  
  return (
    <div className="print:block" style={{ width: "120px", height: "120px" }}>
      <QRCodeSVG 
        value={qrValue}
        size={120}
        level="H"
        includeMargin={true}
        className="bg-white border border-gray-300"
        style={{
          width: "100%",
          height: "100%"
        }}
      />
      <div className="text-xs text-center mt-1 text-gray-600">
        Scan for verification
      </div>
    </div>
  );
};

export default InvoiceQRCode;