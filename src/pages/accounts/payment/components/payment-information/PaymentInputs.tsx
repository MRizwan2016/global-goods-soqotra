
import React from "react";
import { FormState } from "../../types";
import PaymentAmount from "./PaymentAmount";
import PaymentDatePicker from "./PaymentDatePicker";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface PaymentInputsProps {
  formState: FormState;
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateSelect: (date: Date) => void;
  handleSelectChange: (name: string, value: string) => void;
  handlePaymentAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInputs: React.FC<PaymentInputsProps> = ({
  formState,
  currencySymbol,
  date,
  handleInputChange,
  handleDateSelect,
  handleSelectChange,
  handlePaymentAmountChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PaymentAmount
        formState={formState}
        currencySymbol={currencySymbol}
        handleInputChange={handleInputChange}
        handlePaymentAmountChange={handlePaymentAmountChange}
      />
      
      <PaymentDatePicker
        date={date}
        handleDateSelect={handleDateSelect}
      />
      
      <PaymentMethodSelector
        formState={formState}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default PaymentInputs;
