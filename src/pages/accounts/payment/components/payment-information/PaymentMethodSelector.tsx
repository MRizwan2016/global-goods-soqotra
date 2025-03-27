
import React from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethodSelectorProps {
  receivableAccount: string;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  receivableAccount,
  handleSelectChange,
}) => {
  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
        <CreditCard className="h-4 w-4 text-purple-600" />
        PAYMENT METHOD:
      </label>
      <Select
        value={receivableAccount}
        onValueChange={(value) => handleSelectChange("receivableAccount", value)}
      >
        <SelectTrigger className="border-purple-200 focus:ring-purple-300">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent className="bg-white z-50">
          <SelectItem value="CASH_IN_HAND" className="cursor-pointer">CASH IN HAND</SelectItem>
          <SelectItem value="BANK_TRANSFER" className="cursor-pointer">BANK TRANSFER</SelectItem>
          <SelectItem value="CREDIT_CARD" className="cursor-pointer">CREDIT CARD</SelectItem>
          <SelectItem value="CHEQUE" className="cursor-pointer">CHEQUE</SelectItem>
          <SelectItem value="MOBILE_MONEY" className="cursor-pointer">MOBILE MONEY</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default PaymentMethodSelector;
