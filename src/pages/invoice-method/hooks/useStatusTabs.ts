
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../types/invoice";
import { toast } from "sonner";

interface UseStatusTabsProps {
  invoices: Invoice[];
}

export const useStatusTabs = ({ invoices }: UseStatusTabsProps) => {
  const [selectedTab, setSelectedTab] = useState("unpaid");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const navigate = useNavigate();

  // Split invoices into paid and unpaid
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);

  const handlePayClick = (invoice: Invoice) => {
    console.log("Pay button clicked for invoice:", invoice);
    setSelectedInvoice(invoice);
    
    // Store the invoice data temporarily to use it in the payment form
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to the payment page
    navigate('/accounts/payment/add');
    
    toast.success("Payment form opened", {
      description: `Processing payment for invoice ${invoice.invoiceNumber}`,
    });
  };

  const handleViewPaymentDetails = (invoice: Invoice) => {
    console.log("View payment details for invoice:", invoice);
    setSelectedInvoice(invoice);
    setShowPaymentDetails(true);
    
    // Show receipt dialog
    setShowReceiptDialog(true);
  };

  const handleViewInvoice = (id: string) => {
    console.log("View invoice details for ID:", id);
    // Navigate to the InvoiceDetailsView component instead of print preview
    navigate(`/reports/cargo/invoice/${id}`);
    toast.success("Opening invoice details");
  };

  const handleClosePaymentDetails = () => {
    setShowPaymentDetails(false);
    setShowReceiptDialog(false);
  };

  return {
    selectedTab,
    setSelectedTab,
    unpaidInvoices,
    paidInvoices,
    selectedInvoice,
    showPaymentDetails,
    showReceiptDialog,
    handlePayClick,
    handleViewPaymentDetails,
    handleViewInvoice,
    handleClosePaymentDetails
  };
};
