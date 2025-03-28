
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInVariants } from "../utils/animationVariants";

// Define the Invoice interface
interface Invoice {
  id: string;
  invoiceNumber: string;
  date?: string;
  net?: number;
  amount?: number;
  consignee1?: string;
  consignee?: string;
  paid?: boolean;
  bookingForm?: string;
  bookNumber?: string;
  [key: string]: any; // Allow for other properties
}

interface SelectedInvoiceDetailsProps {
  selectedInvoice: Invoice | null;
  currencySymbol: string;
}

const SelectedInvoiceDetails: React.FC<SelectedInvoiceDetailsProps> = ({
  selectedInvoice,
  currencySymbol,
}) => {
  if (!selectedInvoice) return null;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span className="text-sm text-gray-500">Invoice Number:</span>
          <p className="font-semibold text-gray-900">{selectedInvoice.invoiceNumber}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Customer:</span>
          <p className="font-semibold text-gray-900">{selectedInvoice.consignee1 || selectedInvoice.consignee || 'N/A'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Date:</span>
          <p className="font-semibold text-gray-900">{selectedInvoice.date}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Total Amount:</span>
          <p className="font-semibold text-gray-900">{currencySymbol}{selectedInvoice.net || selectedInvoice.amount || 0}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Payment Status:</span>
          <p className="font-semibold">
            {selectedInvoice.paid ? 
              <span className="text-green-600">Paid</span> : 
              <span className="text-amber-600">Unpaid</span>
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedInvoiceDetails;
