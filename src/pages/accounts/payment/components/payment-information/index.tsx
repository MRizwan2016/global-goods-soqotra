
import React from "react";
import { motion } from "framer-motion";
import AmountsSummary from "./AmountsSummary";
import PaymentControls from "./PaymentControls";
import { containerVariants } from "../../utils/animationVariants";

interface PaymentInformationProps {
  formState: {
    grossAmount: number;
    discount: number;
    netAmount: number;
    totalPaid: number;
    balanceToPay: number;
    amountPaid: number;
    receivableAccount: string;
  };
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateSelect: (selectedDate: Date | undefined) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  formState,
  currencySymbol,
  date,
  handleInputChange,
  handleDateSelect,
  handleSelectChange,
}) => {
  return (
    <div className="border-t border-dashed border-gray-200 pt-6 mt-6">
      <h3 className="font-medium text-lg mb-4 text-gray-800">Payment Information</h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AmountsSummary 
          formState={formState}
          currencySymbol={currencySymbol}
          handleInputChange={handleInputChange}
        />
        
        <PaymentControls
          formState={formState}
          currencySymbol={currencySymbol}
          date={date}
          handleInputChange={handleInputChange}
          handleDateSelect={handleDateSelect}
          handleSelectChange={handleSelectChange}
        />
      </motion.div>
    </div>
  );
};

export default PaymentInformation;
