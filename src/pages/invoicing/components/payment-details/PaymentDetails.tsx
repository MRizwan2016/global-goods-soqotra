
import React from "react";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentStatusSelector from "./PaymentStatusSelector";
import DatePicker from "./DatePicker";
import PaymentAmounts from "./PaymentAmounts";
import InvoiceDetails from "./InvoiceDetails";
import AdditionalDetails from "./AdditionalDetails";

interface PaymentDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  formState,
  handleInputChange,
}) => {
  // Handle date selection
  const handleDateChange = (date: Date | undefined, fieldName: string) => {
    if (date) {
      const event = {
        target: {
          name: fieldName,
          value: date.toISOString().split('T')[0],
        },
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
        PAYMENT DETAILS
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {/* First row with Payment Method and Status */}
        <PaymentMethodSelector formState={formState} handleInputChange={handleInputChange} />
        <PaymentStatusSelector formState={formState} handleInputChange={handleInputChange} />

        {/* Payment Dates */}
        <DatePicker 
          label="PAYMENT DATE"
          name="paymentDate"
          value={formState.paymentDate}
          handleDateChange={handleDateChange}
        />
        <DatePicker 
          label="BANKING DATE"
          name="bankingDate"
          value={formState.bankingDate}
          handleDateChange={handleDateChange}
        />

        {/* Payment Amounts */}
        <PaymentAmounts formState={formState} handleInputChange={handleInputChange} />
        
        {/* Invoice Details */}
        <InvoiceDetails formState={formState} />
        
        {/* Additional Details */}
        <AdditionalDetails formState={formState} />
      </div>
    </div>
  );
};

export default PaymentDetails;
