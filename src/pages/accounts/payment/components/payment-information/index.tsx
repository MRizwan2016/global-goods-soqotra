
import React from "react";
import { FormState } from "../../types";
import PaymentSummary from "./PaymentSummary";
import PaymentInputs from "./PaymentInputs";
import PaymentControls from "./PaymentControls";

interface PaymentInformationProps {
  formState: FormState;
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateSelect: (date: Date) => void;
  handleSelectChange: (name: string, value: string) => void;
  handlePaymentAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  formState,
  currencySymbol,
  date,
  handleInputChange,
  handleDateSelect,
  handleSelectChange,
  handlePaymentAmountChange,
}) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
      
      <PaymentSummary
        formState={formState}
        currencySymbol={currencySymbol}
      />
      
      <PaymentInputs
        formState={formState}
        currencySymbol={currencySymbol}
        date={date}
        handleInputChange={handleInputChange}
        handleDateSelect={handleDateSelect}
        handleSelectChange={handleSelectChange}
        handlePaymentAmountChange={handlePaymentAmountChange}
      />
      
      <PaymentControls
        formState={formState}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default PaymentInformation;
