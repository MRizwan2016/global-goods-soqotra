
import React from "react";
import { motion } from "framer-motion";
import EmptyState from "./EmptyState";
import InvoiceTable from "./InvoiceTable";
import { Invoice } from "./Invoice";

interface UnpaidTabContentProps {
  invoices: Invoice[];
  handlePayClick: (invoice: Invoice) => void;
  handleViewInvoice: (id: string) => void;
}

const UnpaidTabContent: React.FC<UnpaidTabContentProps> = ({
  invoices,
  handlePayClick,
  handleViewInvoice
}) => {
  if (invoices.length === 0) {
    return <EmptyState type="unpaid" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <InvoiceTable
          invoices={invoices}
          handlePayClick={handlePayClick}
          handleViewInvoice={handleViewInvoice}
        />
      </div>
    </motion.div>
  );
};

export default UnpaidTabContent;
