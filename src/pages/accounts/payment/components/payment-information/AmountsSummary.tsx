
import React from "react";
import { motion } from "framer-motion";
import AmountDisplay from "./AmountDisplay";
import { FormState } from "../../types";

interface AmountsSummaryProps {
  formState: FormState;
  currencySymbol: string;
}

const AmountsSummary: React.FC<AmountsSummaryProps> = ({
  formState,
  currencySymbol,
}) => {
  // Ensure all amount values are initialized as numbers or default to 0
  const grossAmount = typeof formState.grossAmount === 'number' ? formState.grossAmount : 0;
  const discount = typeof formState.discount === 'number' ? formState.discount : 0;
  const netAmount = typeof formState.netAmount === 'number' ? formState.netAmount : 0;
  const totalPaid = typeof formState.totalPaid === 'number' ? formState.totalPaid : 0;
  const balanceToPay = typeof formState.balanceToPay === 'number' ? formState.balanceToPay : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
      <AmountDisplay 
        label="Gross Amount"
        value={grossAmount}
        currencySymbol={currencySymbol}
        textColor="text-gray-900"
      />
      <AmountDisplay 
        label="Discount"
        value={discount}
        currencySymbol={currencySymbol}
        textColor="text-blue-600"
      />
      <AmountDisplay 
        label="Net Amount"
        value={netAmount}
        currencySymbol={currencySymbol}
        textColor="text-indigo-700"
        isBold={true}
      />
      <AmountDisplay 
        label="Total Paid"
        value={totalPaid}
        currencySymbol={currencySymbol}
        textColor="text-green-600"
      />
      <AmountDisplay 
        label="Balance to Pay"
        value={balanceToPay}
        currencySymbol={currencySymbol}
        textColor={balanceToPay > 0 ? "text-amber-600" : "text-green-600"}
        isBold={true}
      />
    </div>
  );
};

export default AmountsSummary;
