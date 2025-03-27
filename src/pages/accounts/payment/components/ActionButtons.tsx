
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  formState: {
    invoiceNumber: string;
    amountPaid: number;
    country: string;
    currency: string;
  };
  selectedInvoice: any;
  handleSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  formState,
  selectedInvoice,
  handleSave,
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="flex justify-between"
    >
      <Button 
        variant="outline" 
        onClick={() => navigate("/accounts/payments")}
        className="border-gray-300"
      >
        Cancel
      </Button>
      <Button 
        onClick={handleSave}
        disabled={!formState.invoiceNumber || formState.amountPaid <= 0 || !formState.country || !formState.currency || (selectedInvoice && selectedInvoice.paid)}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
      >
        {selectedInvoice && selectedInvoice.paid ? "Invoice Already Paid" : "Save Payment"}
      </Button>
    </motion.div>
  );
};

export default ActionButtons;
