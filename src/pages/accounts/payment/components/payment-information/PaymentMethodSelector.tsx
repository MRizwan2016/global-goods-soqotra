
import React from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFadeInVariants } from "../../utils/animationVariants";
import { PAYMENT_METHODS } from "../../constants/paymentConstants";

interface PaymentMethodSelectorProps {
  receivableAccount: string;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  receivableAccount,
  handleSelectChange,
}) => {
  const fadeWithDelay = getFadeInVariants(0.4);
  
  return (
    <motion.div 
      className="flex flex-col"
      initial={fadeWithDelay.initial}
      animate={fadeWithDelay.animate}
      transition={fadeWithDelay.transition}
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
          {PAYMENT_METHODS.map((method) => (
            <SelectItem key={method.id} value={method.id} className="cursor-pointer">
              {method.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default PaymentMethodSelector;
