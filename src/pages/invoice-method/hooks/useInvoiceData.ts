
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
