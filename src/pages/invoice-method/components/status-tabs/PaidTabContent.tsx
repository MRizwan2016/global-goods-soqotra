
import React from "react";
import { motion } from "framer-motion";
import { ListFilter, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import InvoiceTable from "./InvoiceTable";
import { Invoice } from "./Invoice";

interface PaidTabContentProps {
  invoices: Invoice[];
  handleViewPaymentDetails: (invoice: Invoice) => void;
  handleViewInvoice: (id: string) => void;
}

const PaidTabContent: React.FC<PaidTabContentProps> = ({
  invoices,
  handleViewPaymentDetails,
  handleViewInvoice
}) => {
  const navigate = useNavigate();

  if (invoices.length === 0) {
    return <EmptyState type="paid" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ListFilter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            Print List
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => navigate('/accounts/payments/reconciliation')}
        >
          <FileText className="h-4 w-4" />
          View All Payments
        </Button>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <InvoiceTable
          invoices={invoices}
          handlePayClick={() => {}}
          handleViewInvoice={handleViewInvoice}
          handleViewPaymentDetails={handleViewPaymentDetails}
        />
      </div>
    </motion.div>
  );
};

export default PaidTabContent;
