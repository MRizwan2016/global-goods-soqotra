
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
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

  // Calculate if this is a partial payment
  const isPartialPayment = 
    formState.balanceToPay > 0 && 
    formState.amountPaid > 0 &&
    formState.amountPaid < formState.balanceToPay;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="flex flex-col md:flex-row justify-between gap-4"
    >
      <Button 
        variant="outline" 
        onClick={() => navigate("/accounts/payments")}
        className="border-gray-300 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Cancel
      </Button>

      <div className="flex gap-2">
        {isPartialPayment && (
          <div className="hidden md:flex items-center gap-2 text-amber-600 text-sm bg-amber-50 px-4 py-2 rounded-md border border-amber-200">
            <AlertCircle size={16} />
            <span>
              This is a partial payment of {formState.amountPaid.toFixed(2)}
            </span>
          </div>
        )}
      
        <Button 
          onClick={handleSave}
          disabled={!formState.invoiceNumber || formState.amountPaid <= 0 || !formState.country || !formState.currency || (selectedInvoice && selectedInvoice.paid)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
        >
          <Save size={16} />
          {selectedInvoice && selectedInvoice.paid 
            ? "Invoice Already Paid" 
            : isPartialPayment 
              ? "Save Partial Payment" 
              : "Save Payment"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ActionButtons;
