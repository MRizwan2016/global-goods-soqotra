
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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
      <AmountDisplay 
        label="Gross Amount"
        value={formState.grossAmount}
        currencySymbol={currencySymbol}
        textColor="text-gray-900"
      />
      <AmountDisplay 
        label="Discount"
        value={formState.discount}
        currencySymbol={currencySymbol}
        textColor="text-blue-600"
      />
      <AmountDisplay 
        label="Net Amount"
        value={formState.netAmount}
        currencySymbol={currencySymbol}
        textColor="text-indigo-700"
        isBold={true}
      />
      <AmountDisplay 
        label="Total Paid"
        value={formState.totalPaid}
        currencySymbol={currencySymbol}
        textColor="text-green-600"
      />
      <AmountDisplay 
        label="Balance to Pay"
        value={formState.balanceToPay}
        currencySymbol={currencySymbol}
        textColor={formState.balanceToPay > 0 ? "text-amber-600" : "text-green-600"}
        isBold={true}
        className="col-span-2 md:col-span-1"
      />
    </div>
  );
};

export default AmountsSummary;
