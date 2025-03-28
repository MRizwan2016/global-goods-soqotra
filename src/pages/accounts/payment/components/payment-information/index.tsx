
import React from "react";
import { motion } from "framer-motion";
import AmountsSummary from "./AmountsSummary";
import PaymentAmount from "./PaymentAmount";
import PaymentDatePicker from "./PaymentDatePicker";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentControls from "./PaymentControls";
import { fadeInVariants } from "../../utils/animationVariants";
import { FormState } from "../../types";

interface PaymentInformationProps {
  formState: FormState;
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateSelect: (date: Date | undefined) => void;
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
    <motion.div 
      variants={fadeInVariants}
      initial="hidden"
      animate="show"
      className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Information</h3>
      
      <div className="space-y-6">
        <AmountsSummary 
          formState={formState}
          currencySymbol={currencySymbol}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <PaymentAmount 
              formState={formState}
              currencySymbol={currencySymbol}
              handleInputChange={handleInputChange}
            />
          </div>
          
          <div>
            <PaymentDatePicker 
              date={date}
              handleDateSelect={handleDateSelect}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <PaymentMethodSelector 
              formState={formState}
              handleSelectChange={handleSelectChange}
            />
          </div>
          
          <div>
            <PaymentControls 
              formState={formState}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentInformation;
