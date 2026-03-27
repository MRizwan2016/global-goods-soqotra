import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface SLReceiptDocumentProps {
  invoiceData: any;
}

const SLReceiptDocument: React.FC<SLReceiptDocumentProps> = ({ invoiceData }) => {
  const receiptNumber = `RCT-${invoiceData.invoiceNumber}`;
  const amount = invoiceData.pricing?.net || 0;

  return (
    <div style={{ 
      width: "148mm", 
      minHeight: "210mm", 
      fontFamily: "Arial, sans-serif", 
      fontSize: "10pt",
      border: "2px solid #000",
      margin: "0 auto"
    }}>
      {/* Header */}
      <div className="p-3 border-b-2 border-black text-center">
        <div className="flex items-center justify-between px-2">
          <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Logo" className="w-20 h-auto" />
          <div className="flex-1 px-2">
            <h1 className="text-base font-bold">PAYMENT RECEIPT</h1>
            <p className="text-[8pt] font-bold">SOQOTRA LOGISTICS SERVICES WLL</p>
            <p className="text-[7pt]">Doha, Qatar — Sri Lanka Operations</p>
          </div>
          <QRCodeSVG 
            value={`RCT:${receiptNumber}|AMT:${amount} QAR|INV:${invoiceData.invoiceNumber}`} 
            size={60} level="M" 
          />
        </div>
      </div>

      {/* Receipt Details */}
      <div className="p-3">
        <table className="w-full text-sm border-collapse mb-3">
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100 w-1/3">RECEIPT NO</td>
              <td className="border border-black px-2 py-1">{receiptNumber}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">DATE</td>
              <td className="border border-black px-2 py-1">{invoiceData.date || new Date().toLocaleDateString("en-GB")}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">INVOICE NO</td>
              <td className="border border-black px-2 py-1">{invoiceData.invoiceNumber}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">SERVICE TYPE</td>
              <td className="border border-black px-2 py-1">{invoiceData.serviceType || "SEA FREIGHT"}</td>
            </tr>
          </tbody>
        </table>

        {/* Customer Info */}
        <div className="border border-black mb-3">
          <div className="bg-gray-100 px-2 py-1 font-bold text-sm border-b border-black">RECEIVED FROM</div>
          <div className="p-2 text-sm">
            <p className="font-bold">{invoiceData.shipper?.name || "N/A"}</p>
            <p>{invoiceData.shipper?.address || ""}</p>
            <p>Mobile: {invoiceData.shipper?.mobile || "N/A"}</p>
          </div>
        </div>

        {/* Consignee */}
        <div className="border border-black mb-3">
          <div className="bg-gray-100 px-2 py-1 font-bold text-sm border-b border-black">FOR CONSIGNEE</div>
          <div className="p-2 text-sm">
            <p className="font-bold">{invoiceData.consignee?.name || "N/A"}</p>
            <p>{invoiceData.consignee?.address || ""}</p>
            <p>{invoiceData.consignee?.district || ""}{invoiceData.consignee?.country ? `, ${invoiceData.consignee.country}` : ""}</p>
          </div>
        </div>

        {/* Payment Details */}
        <table className="w-full text-sm border-collapse mb-3">
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">DESCRIPTION</td>
              <td className="border border-black px-2 py-1">Freight & logistics services ({invoiceData.serviceType || "SEA FREIGHT"})</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">WAREHOUSE</td>
              <td className="border border-black px-2 py-1">{invoiceData.warehouse || "Colombo Warehouse"}</td>
            </tr>
          </tbody>
        </table>

        {/* Amount Box */}
        <div className="border-2 border-black p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">AMOUNT RECEIVED:</span>
            <span className="text-xl font-bold">QAR {parseFloat(String(amount)).toFixed(2)}</span>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="border border-black p-2 mb-4 text-sm">
          <span className="font-bold">Amount in words: </span>
          <span className="italic">Qatari Riyals {parseFloat(String(amount)).toFixed(2)} Only</span>
        </div>

        {/* Signatures */}
        <div className="flex justify-between mt-8">
          <div className="text-center">
            <div className="border-t border-black mt-16 pt-1 w-36 font-bold text-sm">RECEIVED BY</div>
          </div>
          <div className="text-center">
            <div className="border-t border-black mt-16 pt-1 w-36 font-bold text-sm">CUSTOMER SIGNATURE</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black p-2 text-center text-[7pt] text-gray-500 mt-4">
        <p>This is a computer-generated receipt. SOQOTRA LOGISTICS WLL | ops@soqotra.qa</p>
      </div>
    </div>
  );
};

export default SLReceiptDocument;
