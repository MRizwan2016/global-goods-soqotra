import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface OfficialReceiptProps {
  receiptData: {
    receiptNumber: string;
    invoiceNumber: string;
    date: string;
    paymentDate: string;
    consigneeName: string;
    paymentMethod: string;
    total: string;
    discount?: string;
    packingCharges?: string;
    transportationFee?: string;
  };
}

const OfficialReceipt: React.FC<OfficialReceiptProps> = ({ receiptData }) => {
  const getCompanyName = () => {
    return 'SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL';
  };

  const calculateNetAmount = () => {
    const rate = parseFloat(receiptData.total || '0');
    const discount = parseFloat(receiptData.discount || '0');
    const packing = parseFloat(receiptData.packingCharges || '0');
    const transport = parseFloat(receiptData.transportationFee || '0');
    return (rate - discount + packing + transport).toFixed(2);
  };

  return (
    <div className="border border-black bg-white">
      {/* Header */}
      <div className="flex p-2 border-b border-gray-300">
        <div className="w-1/4 flex items-center justify-center">
          <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Soqotra Logo" className="h-24 w-32 object-contain" />
        </div>
        
        <div className="w-1/4 flex items-center justify-center">
          <QRCodeSVG 
            value={`RECEIPT:${receiptData.receiptNumber}\nINVOICE:${receiptData.invoiceNumber}\nAMOUNT:${calculateNetAmount()} QAR`} 
            size={100} 
            level="M"
          />
        </div>
        
        <div className="w-2/4 text-right">
          <h2 className="text-base font-bold">{getCompanyName()}</h2>
          <p className="text-xs">Office No. 3, 1st Floor, Zone 55, Building No.53, Street No.76,</p>
          <p className="text-xs">Azizia Commercial Street, P.O.Box: 55861, Azizia - Qatar</p>
          <p className="text-xs">Tele:+974 - 44832508</p>
          <p className="text-xs">email: accounts@soqotralogistics.com</p>
          <p className="text-xs">Print Date: {new Date().toLocaleDateString('en-GB')}</p>
          <p className="text-xs">Print by: Mohammed Rizwan</p>
          <div className="mt-1">
            <span className="font-bold text-lg text-red-600">OFFICIAL RECEIPT</span>
          </div>
        </div>
      </div>

      {/* Receipt Details */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="font-bold">Receipt No: {receiptData.receiptNumber}</div>
            <div className="font-bold">Invoice No: {receiptData.invoiceNumber}</div>
            <div>Invoice Date: {receiptData.date}</div>
            <div>Payment Date: {receiptData.paymentDate}</div>
          </div>
          <div>
            <div className="font-bold">Received From:</div>
            <div>{receiptData.consigneeName}</div>
            <div>Payment Method: {receiptData.paymentMethod}</div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left">Description</th>
              <th className="border border-black p-2 text-right">Amount (QAR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">Service Charges</td>
              <td className="border border-black p-2 text-right">{receiptData.total}</td>
            </tr>
            {receiptData.discount && parseFloat(receiptData.discount) > 0 && (
              <tr>
                <td className="border border-black p-2">Discount</td>
                <td className="border border-black p-2 text-right text-red-600">-{receiptData.discount}</td>
              </tr>
            )}
            {receiptData.packingCharges && parseFloat(receiptData.packingCharges) > 0 && (
              <tr>
                <td className="border border-black p-2">Packing Charges</td>
                <td className="border border-black p-2 text-right">{receiptData.packingCharges}</td>
              </tr>
            )}
            {receiptData.transportationFee && parseFloat(receiptData.transportationFee) > 0 && (
              <tr>
                <td className="border border-black p-2">Transportation Fee</td>
                <td className="border border-black p-2 text-right">{receiptData.transportationFee}</td>
              </tr>
            )}
            <tr className="bg-gray-100 font-bold">
              <td className="border border-black p-2">Total Received</td>
              <td className="border border-black p-2 text-right">QAR {calculateNetAmount()}</td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between">
          <div>
            <div className="mt-8">
              <div className="border-t border-black pt-2 text-center">
                AUTHORIZED SIGNATURE
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">Thank you for your business!</div>
            <div className="text-sm mt-2">This is a computer generated receipt.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialReceipt;