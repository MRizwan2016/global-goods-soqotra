
import React from "react";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../types";

interface PaymentActionButtonsProps {
  selectedInvoice: Invoice | null;
  amountPaid: number;
  onSave: () => void;
  onSaveWithReceipt: () => void;
}

const PaymentActionButtons: React.FC<PaymentActionButtonsProps> = ({
  selectedInvoice,
  amountPaid,
  onSave,
  onSaveWithReceipt
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row gap-4 pt-4">
      <button
        onClick={() => navigate('/accounts/payments')}
        className="w-full md:w-1/4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="w-full md:w-1/4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        disabled={!selectedInvoice || amountPaid <= 0}
      >
        Save Payment
      </button>
      <button
        onClick={onSaveWithReceipt}
        className="w-full md:w-2/4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
        disabled={!selectedInvoice || amountPaid <= 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 17.5v-11" />
        </svg>
        Save & Generate Receipt
      </button>
    </div>
  );
};

export default PaymentActionButtons;
