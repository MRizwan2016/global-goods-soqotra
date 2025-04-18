
import React from "react";
import AmountsSummary from "./AmountsSummary";
import { FormState } from "../../types";

interface PaymentSummaryProps {
  formState: FormState;
  currencySymbol: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  formState,
  currencySymbol,
}) => {
  return (
    <div className="mb-6">
      <AmountsSummary
        formState={formState}
        currencySymbol={currencySymbol}
      />
    </div>
  );
};

export default PaymentSummary;
