
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
  
  useEffect(() => {
    // Load invoices from localStorage or mockData
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const parsedInvoices = JSON.parse(storedInvoices);
        setInvoices(parsedInvoices);
      } else {
        // Ensure we include invoice 010000 in mock data
        // First convert mockInvoiceData to Invoice[] using type assertion with unknown as intermediate step
        const mockData = [...mockInvoiceData] as unknown as Invoice[];
        
        // Check if 010000 exists in mock data
        const hasInvoice010000 = mockData.some(invoice => invoice.invoiceNumber === "010000");
        
        if (!hasInvoice010000) {
          mockData.push({
            id: "inv-010000",
            invoiceNumber: "010000",
            date: "2025-02-15",
            shipper1: "Global Exports Ltd.",
            consignee1: "Qatar Imports Co.",
            salesAgent: "John Doe",
            warehouse: "Main Warehouse",
            doorToDoor: true,
            nic: "QAT123456",
            volume: 2.5,
            weight: 230,
            packages: 5,
            gross: 1200,
            discount: 0,
            net: 1200,
            paid: false,
            statusCharge: 0,
            offerDiscount: 0,
            branch: "Doha",
            sector: "Air",
            transportType: "Air",
          });
        }
        
        setInvoices(mockData);
        localStorage.setItem('invoices', JSON.stringify(mockData));
        console.log("Loaded mock invoice data with invoice 010000");
      }
    } catch (error) {
      console.error("Error loading invoices:", error);
      toast.error("Could not load invoice data");
    }
  }, []);

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
