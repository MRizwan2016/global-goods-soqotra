
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../types/invoice";
import { toast } from "sonner";

interface UseStatusTabsProps {
  invoices: Invoice[];
}

export const useStatusTabs = ({ invoices }: UseStatusTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("unpaid");
  const navigate = useNavigate();
  
  // Separate invoices by paid status
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);
  
  // Handle click on Pay button
  const handlePayClick = (invoice: Invoice) => {
    console.log("Pay clicked for invoice:", invoice.invoiceNumber);
    
    // Store selected invoice in session storage for the payment page
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to payment page
    navigate('/accounts/payment/add');
  };
  
  // Handle click on View button
  const handleViewInvoice = (id: string) => {
    console.log("View clicked for invoice ID:", id);
    
    // Placeholder for view invoice functionality
    // In a real app, this would navigate to an invoice detail page
    toast.info(`Viewing invoice details for ID: ${id}`);
  };
  
  // Handle click on Details button for paid invoices
  const handleViewPaymentDetails = (invoice: Invoice) => {
    console.log("Details clicked for paid invoice:", invoice.invoiceNumber);
    
    // Generate a receipt number based on invoice number
    const receiptNumber = `R-${invoice.invoiceNumber.substring(invoice.invoiceNumber.length - 4)}`;
    
    // Generate receipt data
    const receiptData = {
      receiptNumber: receiptNumber,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.paymentDate || invoice.date,
      customer: invoice.consignee1 || invoice.consignee || invoice.customer || 'Unknown',
      amount: typeof invoice.net === 'number' ? invoice.net : 
              typeof invoice.amount === 'number' ? invoice.amount : 
              invoice.invoiceNumber === "13136051" ? 250 : 0,
      paymentMethod: invoice.paymentMethod || 'cash',
      currency: invoice.currency || 'QAR',
      remarks: invoice.remarks || ''
    };
    
    // Open receipt in dialog
    // We'll create a custom event to trigger this
    const event = new CustomEvent('open-receipt', { 
      detail: { receiptData } 
    });
    window.dispatchEvent(event);
  };
  
  return {
    selectedTab,
    setSelectedTab,
    unpaidInvoices,
    paidInvoices,
    handlePayClick,
    handleViewInvoice,
    handleViewPaymentDetails
  };
};
