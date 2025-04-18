
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
  // Format currency function
  const formatCurrency = (amount: number): string => {
    return `${amount.toFixed(2)} QAR`;
  };

  return (
    <div className="border p-3 rounded-md">
      <h3 className="font-bold mb-2">Financial Summary</h3>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="py-1">Total Delivery Amount</td>
            <td className="text-right py-1">{formatCurrency(totalDeliveryAmount)}</td>
          </tr>
          <tr>
            <td className="py-1">Total Collection Amount</td>
            <td className="text-right py-1">{formatCurrency(totalCollectionAmount)}</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="py-1 font-semibold">Total Amount</td>
            <td className="text-right py-1 font-semibold">{formatCurrency(totalAmount)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FinancialSummary;
