
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Receipt } from "lucide-react";
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
      className="w-full mb-6"
    >
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Search for Invoice</h3>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Enter Invoice Number (GY format):
          </label>
          
          <div className="relative w-full">
            <Input
              value={invoicePrefix}
              onChange={(e) => setInvoicePrefix(e.target.value)}
              placeholder="Start typing GY..."
              className="pr-10"
              autoComplete="off"
            />
            <Button 
              onClick={handleInvoiceSearch}
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full aspect-square text-gray-500 hover:text-gray-700"
              type="button"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <AnimatePresence>
            {showInvoiceSelector && matchingInvoices.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-1 border rounded-md shadow-lg max-h-60 overflow-y-auto z-50 bg-white w-full border-gray-200"
              >
                <div className="p-2 bg-blue-50 border-b border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800">Matching Invoices</h4>
                </div>
                <div>
                  {matchingInvoices.map((invoice) => (
                    <motion.div
                      key={invoice.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 transition-colors"
                      onClick={() => handleSelectInvoice(invoice)}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-gray-800">{invoice.invoiceNumber}</span>
                        </div>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${invoice.paid ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {invoice.paid ? 'PAID' : 'UNPAID'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          Amount: {invoice.net || invoice.amount || 0}
                        </span>
                        <span>
                          {invoice.consignee1 || invoice.consignee || 'No consignee'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceSearch;
