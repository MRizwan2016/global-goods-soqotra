
import React from "react";
import { motion } from "framer-motion";
import AmountDisplay from "./AmountDisplay";

interface AmountsSummaryProps {
  formState: {
    grossAmount: number;
    discount: number;
    netAmount: number;
    totalPaid: number;
    balanceToPay: number;
  };
  currencySymbol: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AmountsSummary: React.FC<AmountsSummaryProps> = ({
  formState,
  currencySymbol,
  handleInputChange,
}) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-gray-50 p-4 rounded-lg">
      <AmountDisplay
        label="GROSS AMOUNT"
        name="grossAmount"
        value={formState.grossAmount}
        onChange={handleInputChange}
        currencySymbol={currencySymbol}
        isReadOnly={true}
      />
      
      <AmountDisplay
        label="DISCOUNT"
        name="discount"
        value={formState.discount}
        onChange={handleInputChange}
        currencySymbol={currencySymbol}
        isReadOnly={true}
      />
      
      <AmountDisplay
        label="NET AMOUNT"
        name="netAmount"
        value={formState.netAmount}
        onChange={handleInputChange}
        currencySymbol={currencySymbol}
        isReadOnly={true}
        labelClassName="text-sm font-medium mb-1 text-gray-700"
        inputClassName="bg-indigo-50 border-indigo-100 font-bold text-indigo-800 pl-8"
        symbolClassName="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold"
      />
      
      <AmountDisplay
        label="TOTAL PAID"
        name="totalPaid"
        value={formState.totalPaid}
        onChange={handleInputChange}
        currencySymbol={currencySymbol}
        isReadOnly={true}
      />
      
      <AmountDisplay
        label="BALANCE TO PAY"
        name="balanceToPay"
        value={formState.balanceToPay}
        onChange={handleInputChange}
        currencySymbol={currencySymbol}
        isReadOnly={true}
        labelClassName="text-sm font-medium mb-1 text-gray-700"
        inputClassName="bg-amber-50 border-amber-100 font-bold text-amber-800 pl-8"
        symbolClassName="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold"
      />
    </div>
  );
};

export default AmountsSummary;
