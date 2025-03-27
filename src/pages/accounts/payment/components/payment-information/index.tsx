
import React from "react";
import { motion } from "framer-motion";
import AmountsSummary from "./AmountsSummary";
import PaymentControls from "./PaymentControls";

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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="border-t border-dashed border-gray-200 pt-6 mt-6">
      <h3 className="font-medium text-lg mb-4 text-gray-800">Payment Information</h3>
      
      <motion.div
        variants={container}
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
