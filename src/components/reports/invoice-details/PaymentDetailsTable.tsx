
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
  // Gather values with fallback as per UI
  const paymentDate = paymentInfo?.paymentDate || invoice?.paymentDate || "";
  const receiptNumber = paymentInfo?.receiptNumber || invoice?.receiptNumber || "";
  const paidAmount = paymentInfo?.amountPaid ?? invoice?.net ?? 0;
  const reconDate = paymentInfo?.reconciliationDate || "";
  const reconNumber = paymentInfo?.reconciliationNumber || "";

  // Get freight amount from invoice if available
  const freightAmount = invoice?.freight || 0;

  // Determine if invoice has been paid
  const isPaid = Boolean(paymentDate && paidAmount > 0);

  // Fallback for UI: show "-" if blank or null
  const showOrDash = (val: any) => (val && val !== "Not available" ? val : "-");

  return (
    <div className={`mt-6 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="bg-green-600 text-white p-2 font-semibold text-center">
        PAYMENT DETAILS
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-center">NUM</th>
              <th className="border border-gray-300 p-2 text-center">PAID NUM</th>
              <th className="border border-gray-300 p-2 text-center">PAID DATE</th>
              <th className="border border-gray-300 p-2 text-center">PAID AMOUNT</th>
              <th className="border border-gray-300 p-2 text-center">RECON. DATE</th>
              <th className="border border-gray-300 p-2 text-center">RECON. NUM</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(receiptNumber)}</td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(paymentDate)}</td>
              <td className="border border-gray-300 p-2 text-center">
                {isPaid 
                  ? `${typeof paidAmount === 'number' ? paidAmount.toFixed(2) : paidAmount} ${currency}`
                  : `0.00 ${currency}`
                }
              </td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(reconDate)}</td>
              <td className="border border-gray-300 p-2 text-center">{showOrDash(reconNumber)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {!isPaid && freightAmount > 0 && (
        <div className="mt-6">
          <div className="bg-green-600 text-white p-2 font-semibold text-center">
            CARGO HOLD DETAILS
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-collapse mt-2">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 p-2 text-center">NUM</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD NO</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD DATE</th>
                  <th className="border border-gray-300 p-2 text-center">HOLD AMOUNT</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT DATE</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT AMOUNT</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT BY</th>
                  <th className="border border-gray-300 p-2 text-center">COLLECT RATE</th>
                  <th className="border border-gray-300 p-2 text-center">SELLING RATE</th>
                  <th className="border border-gray-300 p-2 text-center">VESSEL RNO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center">1</td>
                  <td className="border border-gray-300 p-2 text-center">{invoice?.jobNumber || "-"}</td>
                  <td className="border border-gray-300 p-2 text-center">{invoice?.date || "-"}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {freightAmount > 0 ? `${freightAmount.toFixed(2)} ${currency}` : `0.00 ${currency}`}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">{invoice?.vesselRno || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsTable;
