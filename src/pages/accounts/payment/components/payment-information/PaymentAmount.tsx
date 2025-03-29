
import React from "react";
import { Input } from "@/components/ui/input";
import { FormState } from "../../types";
import { motion } from "framer-motion";

interface PaymentAmountProps {
  formState: FormState;
  currencySymbol: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PaymentAmount: React.FC<PaymentAmountProps> = ({
  formState,
  currencySymbol,
  handleInputChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block text-gray-700">
        Amount Paid:
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{currencySymbol}</span>
        </div>
        <Input
          name="amountPaid"
          type="number"
          value={formState.amountPaid}
          onChange={handleInputChange}
          className="pl-8"
          min={0}
          step={0.01}
          placeholder="Enter payment amount"
        />
      </div>
      {formState.balanceToPay > 0 && formState.amountPaid < formState.balanceToPay && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-amber-600 font-medium"
        >
          This is a partial payment. {currencySymbol}{(formState.balanceToPay - formState.amountPaid).toFixed(2)} will remain unpaid.
        </motion.div>
      )}
    </div>
  );
};

export default PaymentAmount;
