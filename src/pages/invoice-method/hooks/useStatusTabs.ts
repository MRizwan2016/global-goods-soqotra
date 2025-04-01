
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Invoice } from "../components/status-tabs/Invoice";

interface UseStatusTabsProps {
  invoices: Invoice[];
}

export const useStatusTabs = ({ invoices }: UseStatusTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("unpaid");
  const navigate = useNavigate();
  
  // Filter invoices into paid and unpaid
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);
  
  // Handle pay button click
  const handlePayClick = (invoice: Invoice) => {
    console.log("Processing payment for invoice:", invoice.invoiceNumber);
    
    try {
      // Store the selected invoice in sessionStorage for the payment page
      sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
      
      // Navigate to payment page - fix the navigation path
      console.log("Redirecting to payment page...");
      navigate('/accounts/payment/add');
      
      // Show a toast notification
      toast.success("Redirecting to payment page");
    } catch (error) {
      console.error("Error navigating to payment page:", error);
      toast.error("Could not open payment page. Please try again.");
    }
  };
  
  // Handle view payment details
  const handleViewPaymentDetails = (invoice: Invoice) => {
    console.log("Viewing payment details for invoice:", invoice.invoiceNumber);
    
    // Navigate to payment details
    navigate(`/accounts/payments/details/${invoice.id}`);
  };
  
  // Handle view invoice
  const handleViewInvoice = (id: string) => {
    console.log("Viewing invoice:", id);
    
    try {
      // Navigate to the invoice print view
      navigate(`/data-entry/print-documents/invoice-print/${id}`);
    } catch (error) {
      console.error("Error navigating to invoice:", error);
      toast.error("Could not view invoice. Please try again.");
    }
  };

  return {
    selectedTab,
    setSelectedTab,
    unpaidInvoices,
    paidInvoices,
    handlePayClick,
    handleViewPaymentDetails,
    handleViewInvoice
  };
};
