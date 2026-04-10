import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../types/invoice";
import { toast } from "sonner";

interface UseStatusTabsProps {
  invoices: Invoice[];
}

export const useStatusTabs = ({ invoices }: UseStatusTabsProps) => {
  const [selectedTab, setSelectedTab] = useState("unpaid");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const navigate = useNavigate();

  // Split invoices: unpaid = balance > 0 or not paid
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);

  const handlePayClick = useCallback((invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  }, []);

  const handleClosePaymentModal = useCallback(() => {
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  }, []);

  const handleViewPaymentDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentDetails(true);
    setShowReceiptDialog(true);

    let paymentData: any = null;
    try {
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      paymentData = payments.find((p: any) => p.invoiceNumber === invoice.invoiceNumber);
    } catch (e) {
      console.error("Error reading payments:", e);
    }

    const receiptData = {
      receiptNumber: paymentData?.receiptNumber || invoice.receiptNumber || `RCP-${invoice.invoiceNumber}`,
      invoiceNumber: invoice.invoiceNumber,
      date: paymentData?.paymentDate || invoice.paymentDate || invoice.date || new Date().toISOString().split('T')[0],
      customer: (invoice.consignee1 && typeof invoice.consignee1 === 'object') ? (invoice.consignee1 as any)?.name : (String(invoice.consignee1 || '') || invoice.customer || invoice.customerName || invoice.consigneeName || 'N/A'),
      amount: paymentData?.amount || invoice.totalPaid || invoice.paidAmount || invoice.net || invoice.amount || 0,
      paymentMethod: paymentData?.paymentMethod || invoice.paymentMethod || 'cash',
      currency: invoice.currency || 'QAR',
      remarks: paymentData?.remarks || invoice.remarks || ''
    };

    window.dispatchEvent(new CustomEvent('open-receipt', { detail: { receiptData } }));
  };

  const handleViewInvoice = (id: string) => {
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
    showPaymentModal,
    showPaymentDetails,
    showReceiptDialog,
    handlePayClick,
    handleClosePaymentModal,
    handleViewPaymentDetails,
    handleViewInvoice,
    handleClosePaymentDetails
  };
};
