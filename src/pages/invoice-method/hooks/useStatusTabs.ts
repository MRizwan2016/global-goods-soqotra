
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../components/status-tabs/Invoice";

interface UseStatusTabsProps {
  invoices: Invoice[];
}

export const useStatusTabs = ({ invoices }: UseStatusTabsProps) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("unpaid");
  
  // Filter invoices by payment status
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);
  
  // Handle payment button click
  const handlePayClick = (invoice: Invoice) => {
    // Store the selected invoice in sessionStorage for the payment page to access
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to the payment page
    navigate('/accounts/payment/add');
  };
  
  // Handle view payment details
  const handleViewPaymentDetails = (invoice: Invoice) => {
    // For paid invoices, navigate to a details page
    navigate(`/accounts/payments/reconciliation?invoice=${invoice.invoiceNumber}`);
  };
  
  // Handle view invoice
  const handleViewInvoice = (id: string) => {
    // Navigate to invoice view page
    window.open(`/invoice/view/${id}`, '_blank');
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
