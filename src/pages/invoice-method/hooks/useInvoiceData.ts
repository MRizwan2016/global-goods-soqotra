
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Invoice } from "../types/invoice";

export const useInvoiceData = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Setup storage event listener to refresh when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage change detected in PaymentReceivable, refreshing...");
      setRefreshTrigger(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  useEffect(() => {
    // Load invoices from localStorage
    try {
      let parsedInvoices: Invoice[] = [];
      const storedInvoices = localStorage.getItem('invoices');
      
      if (storedInvoices) {
        parsedInvoices = JSON.parse(storedInvoices);
        console.log("Loaded invoices from localStorage:", parsedInvoices);
      }
      
      // Also load Eritrea invoices
      const eritreaInvoices = localStorage.getItem('eritreaInvoices');
      if (eritreaInvoices) {
        const parsedEritreaInvoices = JSON.parse(eritreaInvoices);
        console.log("Loaded Eritrea invoices:", parsedEritreaInvoices);
        
        // Convert Eritrea invoice format to standard format
        const convertedEritreaInvoices = parsedEritreaInvoices.map((invoice: any) => ({
          id: invoice.id || invoice.invoiceNumber,
          invoiceNumber: invoice.invoiceNumber || invoice.formData?.invoiceNumber,
          date: invoice.formData?.date || invoice.date || new Date().toISOString().split('T')[0],
          shipper1: invoice.formData?.shipper1 || invoice.shipper1,
          consignee1: invoice.formData?.consignee1 || invoice.consignee1,
          net: invoice.formData?.netAmount || invoice.net || invoice.formData?.totalCharges || 1500,
          paid: invoice.paid || false,
          balanceToPay: invoice.formData?.netAmount || invoice.net || invoice.formData?.totalCharges || 1500,
          currency: invoice.formData?.currency || 'QR',
          bookingForm: invoice.formData?.bookNumber || invoice.bookingForm,
          country: "ERITREA"
        }));
        
        parsedInvoices = [...parsedInvoices, ...convertedEritreaInvoices];
      }
      
      // Check if there are payments for any invoices
      const payments = localStorage.getItem('payments');
      if (payments) {
        const parsedPayments = JSON.parse(payments);
        
        // Update paid status based on payments
        parsedInvoices = parsedInvoices.map(invoice => {
          // Find all payments for this invoice
          const invoicePayments = parsedPayments.filter(
            (payment: any) => payment.invoiceNumber === invoice.invoiceNumber
          );
          
          // If there are payments, mark the invoice as paid
          if (invoicePayments.length > 0) {
            const totalPaid = invoicePayments.reduce(
              (sum: number, payment: any) => sum + (parseFloat(payment.amount) || 0), 
              0
            );
            
            // Mark as paid if the total payments equal or exceed the invoice amount
            const invoiceAmount = invoice.net || invoice.amount || 0;
            return {
              ...invoice,
              paid: totalPaid >= invoiceAmount,
              totalPaid: totalPaid,
              paidAmount: totalPaid
            };
          }
          
          return invoice;
        });
      }
      
      // Update state with invoices
      setInvoices(parsedInvoices);
      
    } catch (error) {
      console.error("Error loading invoices:", error);
      toast.error("Could not load invoice data");
    }
  }, [refreshTrigger]); // Re-run this effect when refreshTrigger changes

  return { invoices };
};
