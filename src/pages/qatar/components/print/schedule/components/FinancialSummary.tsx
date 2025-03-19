
import React from "react";

interface FinancialSummaryProps {
  totalDeliveryAmount: number;
  totalCollectionAmount: number;
  totalAmount: number;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ 
  totalDeliveryAmount, 
  totalCollectionAmount, 
  totalAmount 
}) => {
  return (
    <div className="border border-blue-300">
      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-blue-300">
            <td className="p-2 font-bold border-r border-blue-300">TOTAL DELIVERY AMOUNT</td>
            <td className="p-2 text-right">{totalDeliveryAmount}</td>
          </tr>
          <tr className="border-b border-blue-300">
            <td className="p-2 font-bold border-r border-blue-300">TOTAL COLLECTION AMOUNT</td>
            <td className="p-2 text-right">{totalCollectionAmount}</td>
          </tr>
          <tr>
            <td className="p-2 font-bold border-r border-blue-300">TOTAL AMOUNT</td>
            <td className="p-2 text-right">{totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FinancialSummary;
