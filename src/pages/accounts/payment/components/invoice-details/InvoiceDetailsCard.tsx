
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInVariants } from "../../utils/animationVariants";
import InvoiceDetailsGrid from "./InvoiceDetailsGrid";

interface InvoiceDetailsCardProps {
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
  isPaid: boolean;
  currency: string;
  currencySymbol: string;
}

const InvoiceDetailsCard: React.FC<InvoiceDetailsCardProps> = (props) => {
  return (
    <motion.div 
      initial={fadeInVariants.initial}
      animate={fadeInVariants.animate}
      transition={{ duration: 0.3 }}
      className="border p-4 rounded-md bg-gradient-to-r from-indigo-50 to-purple-50 mb-6 shadow-inner"
    >
      <h3 className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        Selected Invoice Details
      </h3>
      <InvoiceDetailsGrid {...props} />
    </motion.div>
  );
};

export default InvoiceDetailsCard;
