
import React from 'react';

interface PaymentDetailsTableProps {
  isFullScreen?: boolean;
}

const PaymentDetailsTable: React.FC<PaymentDetailsTableProps> = ({ isFullScreen = false }) => {
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
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetailsTable;
