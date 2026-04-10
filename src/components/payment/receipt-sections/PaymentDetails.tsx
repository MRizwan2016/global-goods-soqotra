
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
      <div className="text-right mb-3">
        <p className="text-[10px] font-semibold text-gray-800">Receipt #{receiptNumber}</p>
        <p className="text-[10px] text-gray-600">{formatDate(date)}</p>
      </div>
      
      <div className="space-y-2 mb-3 bg-gray-50 p-3 rounded-md">
        <div className="flex justify-between">
          <span className="text-[10px] text-gray-600">Invoice Number:</span>
          <span className="text-[10px] font-medium text-right ml-2">{invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-gray-600">Customer:</span>
          <span className="text-[10px] font-medium text-right ml-2">{customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-gray-600">Amount:</span>
          <span className="text-[10px] font-bold text-green-700 ml-2">{currencySymbol} {amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-gray-600">Payment Method:</span>
          <span className="text-[10px] font-medium capitalize text-right ml-2">{paymentMethod}</span>
        </div>
        {remarks && (
          <div className="flex justify-between">
            <span className="text-[10px] text-gray-600">Remarks:</span>
            <span className="text-[10px] font-medium text-right ml-2">{remarks}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentDetails;
