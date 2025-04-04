
import React from 'react';

interface PaymentDetailsTableProps {
  isFullScreen?: boolean;
  paymentInfo?: any;
  invoice?: any;
  currency?: string;
}

const PaymentDetailsTable: React.FC<PaymentDetailsTableProps> = ({ 
  isFullScreen = false,
  paymentInfo,
  invoice,
  currency = "QAR"
}) => {
  const paymentDate = paymentInfo?.paymentDate || invoice?.paymentDate || '';
  const receiptNumber = paymentInfo?.receiptNumber || invoice?.receiptNumber || '';
  const paidAmount = paymentInfo?.amountPaid || invoice?.net || 0;
  const reconDate = paymentInfo?.reconciliationDate || '';
  const reconNumber = paymentInfo?.reconciliationNumber || '';

  return (
    <div className={`mt-6 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="bg-green-600 text-white p-2 font-semibold text-center">
        PAYMENT DETAILS
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-center">Num</th>
              <th className="border border-gray-300 p-2 text-center">PAID Num</th>
              <th className="border border-gray-300 p-2 text-center">PAID DATE</th>
              <th className="border border-gray-300 p-2 text-center">PAID AMOUNT</th>
              <th className="border border-gray-300 p-2 text-center">RECON. DATE</th>
              <th className="border border-gray-300 p-2 text-center">RECON. Num</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">{receiptNumber || '-'}</td>
              <td className="border border-gray-300 p-2 text-center">{paymentDate || '-'}</td>
              <td className="border border-gray-300 p-2 text-center">
                {typeof paidAmount === 'number' ? paidAmount.toFixed(2) : paidAmount} {currency}
              </td>
              <td className="border border-gray-300 p-2 text-center">{reconDate || '-'}</td>
              <td className="border border-gray-300 p-2 text-center">{reconNumber || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetailsTable;
