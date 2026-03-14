
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
    setShowReceiptDialog(true);
    
    // Look for payment data in localStorage
    let paymentData: any = null;
    try {
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      paymentData = payments.find((p: any) => p.invoiceNumber === invoice.invoiceNumber);
    } catch (e) {
      console.error("Error reading payments:", e);
    }

    // Dispatch event to open receipt dialog with invoice payment details
    const receiptData = {
      receiptNumber: paymentData?.receiptNumber || invoice.receiptNumber || `RCP-${invoice.invoiceNumber}`,
      invoiceNumber: invoice.invoiceNumber,
      date: paymentData?.paymentDate || invoice.paymentDate || invoice.date || new Date().toISOString().split('T')[0],
      customer: typeof invoice.consignee1 === 'object' ? invoice.consignee1?.name : (invoice.consignee1 || invoice.customer || invoice.customerName || invoice.consigneeName || 'N/A'),
      amount: paymentData?.amount || invoice.totalPaid || invoice.paidAmount || invoice.net || invoice.amount || 0,
      paymentMethod: paymentData?.paymentMethod || invoice.paymentMethod || 'cash',
      currency: invoice.currency || 'QAR',
      remarks: paymentData?.remarks || invoice.remarks || ''
    };

    window.dispatchEvent(new CustomEvent('open-receipt', { detail: { receiptData } }));
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
