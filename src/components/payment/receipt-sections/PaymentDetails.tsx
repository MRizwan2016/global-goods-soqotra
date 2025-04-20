
import React from "react";
import { formatDate } from "@/lib/utils";

interface PaymentDetailsProps {
  receiptNumber: string;
  invoiceNumber: string;
  date: string;
  customer: string;
  amount: number;
  paymentMethod: string;
  currencySymbol: string;
  remarks?: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  receiptNumber,
  invoiceNumber,
  date,
  customer,
  amount,
  paymentMethod,
  currencySymbol,
  remarks
}) => {
  return (
    <>
      <div className="text-right mb-6">
        <p className="text-sm font-semibold text-gray-800">Receipt #{receiptNumber}</p>
        <p className="text-sm text-gray-600">{formatDate(date)}</p>
      </div>
      
      <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between">
          <span className="text-gray-600">Invoice Number:</span>
          <span className="font-medium">{invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Customer:</span>
          <span className="font-medium">{customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-bold text-green-700">{currencySymbol} {amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-medium capitalize">{paymentMethod}</span>
        </div>
        {remarks && (
          <div className="flex justify-between">
            <span className="text-gray-600">Remarks:</span>
            <span className="font-medium">{remarks}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentDetails;
