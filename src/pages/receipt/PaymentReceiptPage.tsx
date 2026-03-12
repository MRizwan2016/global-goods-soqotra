import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentReceiptPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  const receiptNo = searchParams.get('receipt') || '';
  const invoiceNo = searchParams.get('inv') || '';
  const dateOfInvoice = searchParams.get('date') || '';
  const customer = searchParams.get('customer') || '';
  const amount = searchParams.get('amount') || '';
  const currency = searchParams.get('currency') || 'QAR';
  const status = searchParams.get('status') || 'UNPAID';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 print:bg-white print:p-0">
      <div className="bg-white w-full max-w-[600px] p-10 shadow-lg print:shadow-none">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img 
            src="/lovable-uploads/09288c32-edf3-48e9-9839-a23ae45397ae.png" 
            alt="Soqotra Logo" 
            className="h-28 object-contain"
          />
        </div>

        {/* Company Name */}
        <div className="text-center mb-6">
          <h2 className="text-sm font-bold tracking-wide">SOQOTRA LOGISTICS SERVICES</h2>
          <h2 className="text-sm font-bold tracking-wide">TRANSPORTATION & TRADING WLL</h2>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-10">PAYMENT RECEIPT</h1>

        {/* Receipt Fields */}
        <div className="space-y-6 mb-10">
          <div className="flex items-end">
            <span className="font-semibold text-sm whitespace-nowrap w-48">RECEIPT NO :</span>
            <span className="flex-1 border-b border-black pb-1 text-sm ml-2">{receiptNo}</span>
          </div>
          <div className="flex items-end">
            <span className="font-semibold text-sm whitespace-nowrap w-48">INVOICE NO :</span>
            <span className="flex-1 border-b border-black pb-1 text-sm ml-2">{invoiceNo}</span>
          </div>
          <div className="flex items-end">
            <span className="font-semibold text-sm whitespace-nowrap w-48">DATE OF INVOICE :</span>
            <span className="flex-1 border-b border-black pb-1 text-sm ml-2">{dateOfInvoice}</span>
          </div>
          <div className="flex items-end">
            <span className="font-semibold text-sm whitespace-nowrap w-48">NAME OF CUSTOMER :</span>
            <span className="flex-1 border-b border-black pb-1 text-sm ml-2">{customer}</span>
          </div>
          <div className="flex items-end">
            <span className="font-semibold text-sm whitespace-nowrap w-48">INVOICE AMOUNT :</span>
            <span className="flex-1 border-b border-black pb-1 text-sm ml-2">
              {amount ? `${amount} ${currency}` : ''}
            </span>
          </div>
          <div className="flex items-end">
            <span className="font-semibold text-sm whitespace-nowrap w-48">PAID / UNPAID :</span>
            <span className={`flex-1 border-b border-black pb-1 text-sm ml-2 font-bold ${status === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Signatures */}
        <div className="flex justify-between mt-16 pt-4">
          <div className="text-center">
            <div className="border-t border-black w-48 mb-1"></div>
            <span className="text-xs font-semibold">Customer Signature</span>
          </div>
          <div className="text-center">
            <div className="border-t border-black w-48 mb-1"></div>
            <span className="text-xs font-semibold">Authorized Signature</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptPage;
