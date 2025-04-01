
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAYMENT_METHODS } from "../../../accounts/payment/constants/paymentConstants";

interface PaymentMethodSelectorProps {
  formState?: any;
  paymentMethod?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  formState,
  paymentMethod,
  handleInputChange,
  handleSelectChange,
}) => {
  // Handle payment method selection
  const handlePaymentMethodChange = (value: string) => {
    if (handleSelectChange) {
      handleSelectChange("paymentMethod", value);
    } else if (handleInputChange) {
      const event = {
        target: {
          name: "paymentMethod",
          value,
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      
      handleInputChange(event);
    }
  };

  // Determine the actual payment method value from either formState or direct prop
  const actualPaymentMethod = paymentMethod || (formState && formState.paymentMethod) || "";

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">PAYMENT METHOD:</label>
      <Select 
        value={actualPaymentMethod} 
        onValueChange={handlePaymentMethodChange}
      >
        <SelectTrigger className="w-full border border-gray-300">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          {PAYMENT_METHODS.map(method => (
            <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodSelector;
