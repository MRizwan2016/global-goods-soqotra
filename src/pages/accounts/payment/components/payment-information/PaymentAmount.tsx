
import React from "react";
import { Input } from "@/components/ui/input";
import { FormState } from "../../types";

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
    <div>
      <label className="text-sm font-medium mb-1 block text-gray-700">
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
        />
      </div>
    </div>
  );
};

export default PaymentAmount;
