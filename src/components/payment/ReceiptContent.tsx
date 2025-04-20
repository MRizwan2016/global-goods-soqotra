
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatDate } from "@/lib/utils";

interface ReceiptContentProps {
  receiptData: {
    receiptNumber: string;
    invoiceNumber: string;
    date: string;
    customer: string;
    amount: number;
    paymentMethod: string;
    currency: string;
    remarks?: string;
  };
  currencySymbol: string;
}

const ReceiptContent: React.FC<ReceiptContentProps> = ({ receiptData, currencySymbol }) => {
  const qrData = JSON.stringify({
    receiptNumber: receiptData.receiptNumber,
    invoiceNumber: receiptData.invoiceNumber,
    amount: receiptData.amount,
    currency: receiptData.currency,
    date: receiptData.date,
    verified: true
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/09288c32-edf3-48e9-9839-a23ae45397ae.png" 
            alt="Soqotra Logo" 
            className="h-12 mr-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/soqotra-logo.png";
              console.log("Using fallback logo path");
            }}
          />
          <div>
            <h2 className="font-bold text-gray-800 text-lg">SOQOTRA</h2>
            <p className="text-sm text-gray-600">Shipping & Logistics</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">Receipt #{receiptData.receiptNumber}</p>
          <p className="text-sm text-gray-600">{formatDate(receiptData.date)}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between">
          <span className="text-gray-600">Invoice Number:</span>
          <span className="font-medium">{receiptData.invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Customer:</span>
          <span className="font-medium">{receiptData.customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-bold text-green-700">{currencySymbol} {receiptData.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-medium capitalize">{receiptData.paymentMethod}</span>
        </div>
        {receiptData.remarks && (
          <div className="flex justify-between">
            <span className="text-gray-600">Remarks:</span>
            <span className="font-medium">{receiptData.remarks}</span>
          </div>
        )}
      </div>

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
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-8">Customer Signature</p>
            <div className="border-t border-gray-300 w-32"></div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-8">Authorized Signature</p>
            <div className="border-t border-gray-300 w-32"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">For any questions, please contact support@soqotra.com</p>
      </div>
    </div>
  );
};

export default ReceiptContent;
