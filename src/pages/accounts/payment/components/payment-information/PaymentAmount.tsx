
import React from "react";
import { Input } from "@/components/ui/input";
import { FormState } from "../../types";

interface PaymentAmountProps {
  formState: FormState;
  currencySymbol: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentAmount: React.FC<PaymentAmountProps> = ({
  formState,
  currencySymbol,
  handleInputChange,
  handlePaymentAmountChange
}) => {
  // Use the specialized handler if provided, otherwise fall back to the general handler
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Payment amount changed:", e.target.value);
    if (handlePaymentAmountChange) {
      handlePaymentAmountChange(e);
    } else {
      handleInputChange(e);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="amountPaid" className="text-sm font-medium text-gray-600 mb-1">
        Payment Amount
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{currencySymbol}</span>
        </div>
        <Input
          id="amountPaid"
          name="amountPaid"
          type="number"
          value={formState.amountPaid || ""}
          onChange={onAmountChange}
          className="pl-8 bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          placeholder="0.00"
          step="0.01"
          min="0"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Enter the payment amount collected</p>
    </div>
  );
};

export default PaymentAmount;
