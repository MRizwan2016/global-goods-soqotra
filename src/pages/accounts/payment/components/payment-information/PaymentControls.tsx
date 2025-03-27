
import React from "react";
import PaymentAmount from "./PaymentAmount";
import PaymentDatePicker from "./PaymentDatePicker";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface PaymentControlsProps {
  formState: {
    amountPaid: number;
    receivableAccount: string;
  };
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateSelect: (selectedDate: Date | undefined) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentControls: React.FC<PaymentControlsProps> = ({
  formState,
  currencySymbol,
  date,
  handleInputChange,
  handleDateSelect,
  handleSelectChange,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-teal-100">
      <PaymentAmount
        amountPaid={formState.amountPaid}
        currencySymbol={currencySymbol}
        handleInputChange={handleInputChange}
      />
      
      <PaymentDatePicker
        date={date}
        handleDateSelect={handleDateSelect}
      />
      
      <PaymentMethodSelector
        receivableAccount={formState.receivableAccount}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default PaymentControls;
