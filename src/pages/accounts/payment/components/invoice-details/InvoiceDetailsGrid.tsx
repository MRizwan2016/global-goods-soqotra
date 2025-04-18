
import React from "react";

interface InvoiceDetailsGridProps {
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
  isPaid: boolean;
  currency: string;
  currencySymbol: string;
}

const InvoiceDetailsGrid: React.FC<InvoiceDetailsGridProps> = ({
  invoiceNumber,
  customerName,
  date,
  amount,
  isPaid,
  currency,
  currencySymbol,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <span className="text-sm text-gray-500">Invoice Number:</span>
        <p className="font-semibold text-gray-900">{invoiceNumber}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Customer:</span>
        <p className="font-semibold text-gray-900">{customerName}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Date:</span>
        <p className="font-semibold text-gray-900">{date}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Total Amount:</span>
        <p className="font-semibold text-gray-900">{currencySymbol} {amount.toFixed(2)}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Payment Status:</span>
        <p className="font-semibold">
          {isPaid ? 
            <span className="text-green-600">Paid</span> : 
            <span className="text-amber-600">Unpaid</span>
          }
        </p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Currency:</span>
        <p className="font-semibold text-gray-900">{currency}</p>
      </div>
    </div>
  );
};

export default InvoiceDetailsGrid;
