
import React from "react";
import { motion } from "framer-motion";
import { Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentAmountProps {
  amountPaid: number;
  currencySymbol: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PaymentAmount: React.FC<PaymentAmountProps> = ({
  amountPaid,
  currencySymbol,
  handleInputChange,
}) => {
  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
        <Banknote className="h-4 w-4 text-green-600" />
        AMOUNT PAID:
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
          {currencySymbol}
        </span>
        <Input
          name="amountPaid"
          value={amountPaid.toString()}
          onChange={handleInputChange}
          type="number"
          className="border-green-200 focus-visible:ring-green-300 font-medium pl-8"
        />
      </div>
    </motion.div>
  );
};

export default PaymentAmount;
