
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fadeInVariants } from "../utils/animationVariants";

// Define interface for the invoice object to ensure type safety
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

interface InvoiceSearchProps {
  invoicePrefix: string;
  setInvoicePrefix: React.Dispatch<React.SetStateAction<string>>;
  matchingInvoices: Invoice[];
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectInvoice: (invoice: Invoice) => void;
  handleInvoiceSearch: () => void;
}

const InvoiceSearch: React.FC<InvoiceSearchProps> = ({
  invoicePrefix,
  setInvoicePrefix,
  matchingInvoices,
  showInvoiceSelector,
  setShowInvoiceSelector,
  handleSelectInvoice,
  handleInvoiceSearch,
}) => {
  return (
    <motion.div 
      variants={fadeInVariants}
      initial="hidden"
      animate="show"
      className="flex gap-4 items-start mb-6"
    >
      <div className="w-full max-w-md relative">
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Enter Invoice Number (GY format):
        </label>
        <div className="flex">
          <Input
            value={invoicePrefix}
            onChange={(e) => setInvoicePrefix(e.target.value)}
            placeholder="Start typing GY..."
            className="rounded-r-none border-r-0 focus-visible:ring-1 focus-visible:ring-indigo-400"
          />
          <Button 
            onClick={handleInvoiceSearch}
            className="rounded-l-none bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <AnimatePresence>
          {showInvoiceSelector && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mt-1 border rounded-md shadow-lg max-h-60 overflow-y-auto absolute z-50 bg-white w-full border-indigo-200"
            >
              <div className="p-2 bg-indigo-50 border-b border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-800">Matching Invoices</h4>
              </div>
              {matchingInvoices.length > 0 ? (
                <div>
                  {matchingInvoices.map((invoice) => (
                    <motion.div
                      key={invoice.id}
                      className="p-3 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"
                      onClick={() => handleSelectInvoice(invoice)}
                      whileHover={{ backgroundColor: "rgba(238, 242, 255, 0.6)" }}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium text-indigo-800">{invoice.invoiceNumber}</span>
                        <span className={`text-sm ${invoice.paid ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}`}>
                          {invoice.paid ? 'PAID' : 'UNPAID'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span className="text-indigo-600 font-medium">
                          Amount: ${invoice.net || invoice.amount || 0}
                        </span>
                        <span>
                          {invoice.consignee1 || invoice.consignee || 'No consignee'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No matching invoices found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InvoiceSearch;
