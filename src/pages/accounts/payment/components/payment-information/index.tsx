
import React from "react";
import { FormState } from "../../types";
import PaymentDatePicker from "./PaymentDatePicker";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentAmount from "./PaymentAmount";
import PaymentControls from "./PaymentControls";
import AmountsSummary from "./AmountsSummary";

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
      
      <AmountsSummary
        formState={formState}
        currencySymbol={currencySymbol}
      />
      
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
      
      <PaymentControls
        formState={formState}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default PaymentInformation;
