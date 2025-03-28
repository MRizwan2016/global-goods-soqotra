
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAYMENT_METHODS } from "../../../accounts/payment/constants/paymentConstants";

interface PaymentMethodSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  formState,
  handleInputChange,
}) => {
  // Handle payment method selection
  const handlePaymentMethodChange = (value: string) => {
    const event = {
      target: {
        name: "paymentMethod",
        value,
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">PAYMENT METHOD:</label>
      <Select 
        value={formState.paymentMethod || ""} 
        onValueChange={handlePaymentMethodChange}
      >
        <SelectTrigger className="w-full border border-gray-300">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          {PAYMENT_METHODS.map(method => (
            <SelectItem key={method.id} value={method.id}>{method.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodSelector;
