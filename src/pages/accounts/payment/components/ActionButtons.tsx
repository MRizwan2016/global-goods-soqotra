
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { FormState } from "../types";

interface ActionButtonsProps {
  formState: FormState;
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
        className="border-gray-300 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Cancel
      </Button>
      <Button 
        onClick={handleSave}
        disabled={!formState.invoiceNumber || formState.amountPaid <= 0 || !formState.country || !formState.currency || (selectedInvoice && selectedInvoice.paid)}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
      >
        <Save size={16} />
        {selectedInvoice && selectedInvoice.paid ? "Invoice Already Paid" : "Save Payment"}
      </Button>
    </motion.div>
  );
};

export default ActionButtons;
