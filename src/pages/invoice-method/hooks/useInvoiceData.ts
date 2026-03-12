import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Invoice } from "../types/invoice";
import { supabase } from "@/integrations/supabase/client";

// Helper to safely parse localStorage JSON
const safeParseJSON = (key: string): any[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Safely extract a string name from a value that might be an object
const extractName = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.name) return String(val.name);
  return '';
};

// Convert any country invoice format to standard Invoice
const convertToStandardInvoice = (invoice: any, country: string): Invoice => ({
  id: invoice.id || invoice.invoiceNumber || crypto.randomUUID(),
  invoiceNumber: invoice.invoiceNumber || invoice.formData?.invoiceNumber || invoice.invoice_no || '',
  date: invoice.formData?.date || invoice.date || invoice.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  shipper1: invoice.formData?.shipper1 || invoice.shipper1 || invoice.shipper_name || invoice.shipper || '',
  consignee1: invoice.formData?.consignee1 || invoice.consignee1 || invoice.consignee_name || invoice.consignee || '',
  net: invoice.formData?.netAmount || invoice.net || invoice.formData?.totalCharges || invoice.total_amount || invoice.totalAmount || invoice.amount || 0,
  paid: invoice.paid || invoice.status === 'PAID' || invoice.paymentStatus === 'paid' || false,
  balanceToPay: invoice.balanceToPay || invoice.formData?.netAmount || invoice.net || invoice.total_amount || invoice.amount || 0,
  currency: invoice.formData?.currency || invoice.currency || 'QR',
  bookingForm: invoice.formData?.bookNumber || invoice.bookingForm || invoice.book_no || '',
  country: country,
  amount: invoice.formData?.netAmount || invoice.net || invoice.total_amount || invoice.totalAmount || invoice.amount || 0,
  totalPaid: invoice.totalPaid || invoice.paidAmount || 0,
  paidAmount: invoice.paidAmount || invoice.totalPaid || 0,
});

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
    const loadAllInvoices = async () => {
      try {
        let allInvoices: Invoice[] = [];
        
        // 1. Load main (Qatar) invoices from localStorage
        const mainInvoices = safeParseJSON('invoices');
        allInvoices.push(...mainInvoices.map((inv: any) => convertToStandardInvoice(inv, inv.country || 'QATAR')));
        
        // 2. Load Eritrea invoices
        const eritreaInvoices = safeParseJSON('eritreaInvoices');
        allInvoices.push(...eritreaInvoices.map((inv: any) => convertToStandardInvoice(inv, 'ERITREA')));
        
        // 3. Load Sri Lanka invoices
        const sriLankaInvoices = safeParseJSON('sriLankaInvoices');
        allInvoices.push(...sriLankaInvoices.map((inv: any) => convertToStandardInvoice(inv, 'SRI LANKA')));
        
        // 4. Load Sudan invoices
        const sudanInvoices = safeParseJSON('sudanInvoices');
        allInvoices.push(...sudanInvoices.map((inv: any) => convertToStandardInvoice(inv, 'SUDAN')));
        
        // 5. Load Philippines invoices
        const philippinesInvoices = safeParseJSON('philippinesInvoices');
        allInvoices.push(...philippinesInvoices.map((inv: any) => convertToStandardInvoice(inv, 'PHILIPPINES')));
        
        // 6. Load Algeria invoices
        const algeriaInvoices = safeParseJSON('algeria_invoices');
        allInvoices.push(...algeriaInvoices.map((inv: any) => convertToStandardInvoice(inv, 'ALGERIA')));
        
        // 7. Load Saudi Arabia / UPB invoices
        const saudiInvoices = safeParseJSON('saudiArabiaInvoices');
        allInvoices.push(...saudiInvoices.map((inv: any) => convertToStandardInvoice(inv, 'SAUDI ARABIA')));
        
        // 8. Load Kenya invoices
        const kenyaInvoices = safeParseJSON('kenyaInvoices');
        allInvoices.push(...kenyaInvoices.map((inv: any) => convertToStandardInvoice(inv, 'KENYA')));
        
        // 9. Load generated invoices
        const generatedInvoices = safeParseJSON('generatedInvoices');
        allInvoices.push(...generatedInvoices.map((inv: any) => convertToStandardInvoice(inv, inv.country || 'QATAR')));
        
        // 10. Load from Supabase invoices table
        try {
          const { data: dbInvoices, error } = await supabase
            .from('invoices')
            .select('*')
            .limit(500);
          
          if (!error && dbInvoices && dbInvoices.length > 0) {
            const dbConverted = dbInvoices.map((inv) => ({
              id: inv.id,
              invoiceNumber: inv.invoice_no || inv.invoice_code || '',
              date: inv.created_at?.split('T')[0] || '',
              shipper1: inv.shipper_name || '',
              consignee1: inv.consignee_name || '',
              net: inv.total_amount || 0,
              paid: false,
              balanceToPay: inv.total_amount || 0,
              currency: 'QR',
              bookingForm: inv.book_no || '',
              country: 'QATAR',
              amount: inv.total_amount || 0,
            } as Invoice));
            
            // Only add DB invoices that aren't already in local list
            const existingNumbers = new Set(allInvoices.map(i => i.invoiceNumber));
            const newDbInvoices = dbConverted.filter(i => !existingNumbers.has(i.invoiceNumber));
            allInvoices.push(...newDbInvoices);
          }
        } catch (dbError) {
          console.log("Could not load from database, using local data only");
        }
        
        // 11. Check payments and update paid status
        const payments = safeParseJSON('payments');
        if (payments.length > 0) {
          allInvoices = allInvoices.map(invoice => {
            const invoicePayments = payments.filter(
              (payment: any) => payment.invoiceNumber === invoice.invoiceNumber
            );
            
            if (invoicePayments.length > 0) {
              const totalPaid = invoicePayments.reduce(
                (sum: number, payment: any) => sum + (parseFloat(payment.amount) || 0), 
                0
              );
              
              const invoiceAmount = invoice.net || invoice.amount || 0;
              return {
                ...invoice,
                paid: totalPaid >= invoiceAmount,
                totalPaid,
                paidAmount: totalPaid,
                balanceToPay: Math.max(0, invoiceAmount - totalPaid),
              };
            }
            
            return invoice;
          });
        }
        
        // Deduplicate by invoice number (keep first occurrence)
        const seen = new Set<string>();
        allInvoices = allInvoices.filter(inv => {
          if (!inv.invoiceNumber || seen.has(inv.invoiceNumber)) return false;
          seen.add(inv.invoiceNumber);
          return true;
        });
        
        console.log(`Loaded ${allInvoices.length} total invoices from all sources`);
        setInvoices(allInvoices);
        
      } catch (error) {
        console.error("Error loading invoices:", error);
        toast.error("Could not load invoice data");
      }
    };
    
    loadAllInvoices();
  }, [refreshTrigger]);

  return { invoices };
};
