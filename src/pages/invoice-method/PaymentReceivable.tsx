
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PaymentHeader from "./components/PaymentHeader";
import SearchFilters from "./components/SearchFilters";
import StatusTabs from "./components/StatusTabs";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";

// Define a proper type for the invoice
interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  shipper1: string;
  consignee1: string;
  salesAgent: string;
  warehouse: string;
  doorToDoor: boolean;
  nic: string;
  volume: number | string;  // Allow both number and string
  weight: number | string;  // Allow both number and string
  packages: number;
  gross: number;
  discount: number;
  net: number;
  paid: boolean;
  statusCharge: number;
  offerDiscount: number;
  branch?: string;          // Make optional
  sector?: string;          // Make optional
  transportType?: string;   // Make optional
  customer?: string;        // Add customer field from mockData
  // Additional fields that might be in the mock data
  [key: string]: any;       // Allow any additional properties
}

const PaymentReceivable = () => {
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
    // Load invoices from localStorage or mockData
    try {
      let parsedInvoices: Invoice[] = [];
      const storedInvoices = localStorage.getItem('invoices');
      
      if (storedInvoices) {
        parsedInvoices = JSON.parse(storedInvoices);
        console.log("Loaded invoices from localStorage:", parsedInvoices);
      } else {
        // If no invoices in localStorage, load from mockData
        parsedInvoices = [...mockInvoiceData] as unknown as Invoice[];
        console.log("Loaded mock invoice data");
      }
      
      // Check if invoice 010000 exists
      const hasInvoice010000 = parsedInvoices.some(invoice => invoice.invoiceNumber === "010000");
      
      // Add invoice 010000 if it doesn't exist
      if (!hasInvoice010000) {
        // Always add invoice 010000 as unpaid initially
        parsedInvoices.push({
          id: "inv-010000",
          invoiceNumber: "010000",
          date: "2023-03-30",
          shipper1: "Global Exports Ltd.",
          consignee1: "PASTOR ZACH RICH",
          salesAgent: "John Doe",
          warehouse: "Main Warehouse",
          doorToDoor: true,
          nic: "QAT123456",
          volume: 2.5,
          weight: 230,
          packages: 5,
          gross: 1500,
          discount: 0,
          net: 1500,
          paid: false, // We'll check payment status elsewhere
          statusCharge: 0,
          offerDiscount: 0,
          branch: "Doha",
          sector: "Air",
          transportType: "Air",
          bookingForm: "BF-10000",
          freightType: "Air Freight",
          amount: 1500,
          currency: "QAR"
        });
        
        console.log("Added invoice 010000 to the list");
      }
      
      // Check if there are payments for invoice 010000
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
      
      // Save updated invoices to localStorage
      localStorage.setItem('invoices', JSON.stringify(parsedInvoices));
      
      // Update state with invoices
      setInvoices(parsedInvoices);
      
    } catch (error) {
      console.error("Error loading invoices:", error);
      toast.error("Could not load invoice data");
    }
  }, [refreshTrigger]); // Re-run this effect when refreshTrigger changes

  return (
    <Layout title="Payment Receivable">
      <div className="space-y-6">
        <PaymentHeader />
        <SearchFilters />
        <StatusTabs invoices={invoices} />
      </div>
    </Layout>
  );
};

export default PaymentReceivable;
