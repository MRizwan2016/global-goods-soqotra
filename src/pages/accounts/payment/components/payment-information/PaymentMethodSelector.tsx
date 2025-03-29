
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAYMENT_METHODS } from "../../constants/paymentConstants";
import { FormState } from "../../types";

interface PaymentMethodSelectorProps {
  formState: FormState;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  formState,
  handleSelectChange,
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block text-gray-700">
        Payment Method:
      </label>
      <Select 
        value={formState.receivableAccount} 
        onValueChange={(value) => handleSelectChange("receivableAccount", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          {PAYMENT_METHODS.map((method) => (
            <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodSelector;
