import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Invoice } from "../types/invoice";
import { supabase } from "@/integrations/supabase/client";
import { calculateStorageFee } from "@/utils/storageFeesCalculator";

const getCurrencyForCountry = (country?: string): string => {
  switch (country?.toLowerCase()) {
    case 'qatar': return 'QAR';
    case 'saudi arabia': return 'SAR';
    case 'sri lanka': return 'LKR';
    case 'kenya': return 'KES';
    case 'sudan': return 'SDG';
    case 'uae': case 'united arab emirates': return 'AED';
    case 'tunisia': return 'TND';
    case 'somalia': return 'USD';
    case 'oman': return 'OMR';
    case 'bahrain': return 'BHD';
    case 'kuwait': return 'KWD';
    case 'egypt': return 'EGP';
    case 'ethiopia': return 'ETB';
    case 'uganda': return 'UGX';
    case 'india': return 'INR';
    default: return 'QAR';
  }
};

const getDisplayCurrency = (
  summaryInvoice: { currency?: string | null; country?: string | null },
  regionalInvoice?: { shipper_country?: string | null; country?: string | null } | null
): string => {
  const originCountry = regionalInvoice?.shipper_country?.trim();

  if (originCountry) {
    return getCurrencyForCountry(originCountry);
  }

  if (summaryInvoice.currency?.trim()) {
    return summaryInvoice.currency;
  }

  return getCurrencyForCountry(summaryInvoice.country || undefined);
};

export const useInvoiceData = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const loadAllInvoices = async () => {
      try {
        let allInvoices: Invoice[] = [];

        // Load from payment_receivable_summary view (regional invoices with payment data)
        const { data: summaryData, error: summaryError } = await supabase
          .from('payment_receivable_summary' as any)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1000);

        if (!summaryError && summaryData) {
          const invoiceNumbers = (summaryData as any[])
            .map((inv) => inv.invoice_number)
            .filter(Boolean);

          let regionalCurrencyMap = new Map<string, { shipper_country?: string | null; country?: string | null }>();

          if (invoiceNumbers.length > 0) {
            const { data: regionalCurrencyData } = await supabase
              .from('regional_invoices')
              .select('invoice_number, shipper_country, country')
              .in('invoice_number', invoiceNumbers);

            regionalCurrencyMap = new Map(
              (regionalCurrencyData || []).map((invoice) => [invoice.invoice_number, invoice])
            );
          }

          const converted = (summaryData as any[]).map((inv): Invoice => {
            const net = Number(inv.net) || Number(inv.gross) || 0;
            const totalPaid = Number(inv.total_paid) || 0;
            const balanceDue = Number(inv.balance_due) || 0;
            const isPaid = balanceDue <= 0 && totalPaid > 0;
            const isPartial = totalPaid > 0 && balanceDue > 0;
            const regionalInvoice = regionalCurrencyMap.get(inv.invoice_number);

            return {
              id: inv.id,
              invoiceNumber: inv.invoice_number,
              date: inv.invoice_date || '',
              shipper1: inv.shipper_name || '',
              consignee1: inv.consignee_name || '',
              net: net,
              gross: Number(inv.gross) || net,
              discount: Number(inv.discount) || 0,
              paid: isPaid,
              partiallyPaid: isPartial,
              totalPaid: totalPaid,
              paidAmount: totalPaid,
              balanceToPay: balanceDue,
              currency: getDisplayCurrency(inv, regionalInvoice),
              country: inv.country || '',
              amount: net,
              bookingForm: inv.book_number || inv.job_number || '',
              warehouse: inv.warehouse || '',
              paymentStatus: inv.payment_status || 'UNPAID',
              paymentMethod: inv.payment_method || '',
              shipperMobile: inv.shipper_mobile || '',
              consigneeMobile: inv.consignee_mobile || '',
            };
          });
          allInvoices.push(...converted);
        } else if (summaryError) {
          console.warn("Could not load summary view, falling back to regional_invoices", summaryError);
          // Fallback to regional_invoices directly
          const { data: regionalData } = await supabase
            .from('regional_invoices')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1000);

          if (regionalData) {
            const regionalConverted = regionalData.map((inv): Invoice => {
              const net = inv.net || inv.gross || 0;
              const isPaid = inv.payment_status === 'PAID';
              const isPartial = inv.payment_status === 'PARTIAL';
              const totalPaid = isPaid ? net : isPartial ? (net * 0.5) : 0;

              return {
                id: inv.id,
                invoiceNumber: inv.invoice_number,
                date: inv.invoice_date || inv.created_at?.split('T')[0] || '',
                shipper1: inv.shipper_name || '',
                consignee1: inv.consignee_name || '',
                net, gross: inv.gross || net,
                discount: inv.discount || 0,
                paid: isPaid, partiallyPaid: isPartial,
                totalPaid, paidAmount: totalPaid,
                balanceToPay: Math.max(0, net - totalPaid),
                currency: getCurrencyForCountry(inv.country),
                country: inv.country || '',
                amount: net,
                bookingForm: inv.book_number || inv.job_number || '',
                warehouse: inv.destination || '',
                paymentStatus: inv.payment_status || 'UNPAID',
                paymentMethod: inv.payment_method || '',
                shipperMobile: inv.shipper_mobile || '',
                consigneeMobile: inv.consignee_mobile || '',
              };
            });
            allInvoices.push(...regionalConverted);
          }
        }

        // Also load from invoices table (legacy Qatar)
        try {
          const { data: dbInvoices, error } = await supabase
            .from('invoices')
            .select('*')
            .limit(500);

          if (!error && dbInvoices && dbInvoices.length > 0) {
            const dbConverted = dbInvoices.map((inv): Invoice => ({
              id: inv.id,
              invoiceNumber: inv.invoice_no || inv.invoice_code || '',
              date: inv.created_at?.split('T')[0] || '',
              shipper1: inv.shipper_name || '',
              consignee1: inv.consignee_name || '',
              net: inv.total_amount || 0,
              gross: inv.total_amount || 0,
              discount: 0,
              paid: false,
              balanceToPay: inv.total_amount || 0,
              currency: 'QAR',
              bookingForm: inv.book_no || '',
              country: 'QATAR',
              amount: inv.total_amount || 0,
            }));

            const existingNumbers = new Set(allInvoices.map(i => i.invoiceNumber));
            const newDbInvoices = dbConverted.filter(i => i.invoiceNumber && !existingNumbers.has(i.invoiceNumber));
            allInvoices.push(...newDbInvoices);
          }
        } catch (dbError) {
          console.log("Could not load from invoices table");
        }

        // Deduplicate by invoice number
        const seen = new Set<string>();
        allInvoices = allInvoices.filter(inv => {
          if (!inv.invoiceNumber || seen.has(inv.invoiceNumber)) return false;
          seen.add(inv.invoiceNumber);
          return true;
        });

        // Load warehouse storage fees and add to balances
        try {
          const { data: storageData } = await supabase
            .from('warehouse_storage' as any)
            .select('*')
            .eq('storage_fee_paid', false);

          if (storageData && (storageData as any[]).length > 0) {
            const storageFeeMap = new Map<string, number>();
            for (const sr of storageData as any[]) {
              const fee = calculateStorageFee(
                sr.cargo_type === 'vehicle' ? 'vehicle' : 'personal_effects',
                sr.warehouse_received_date,
                Number(sr.total_cbm) || 0
              );
              if (fee.totalFee > 0) {
                const existing = storageFeeMap.get(sr.invoice_number) || 0;
                storageFeeMap.set(sr.invoice_number, existing + fee.totalFee);
              }
            }

            // Add storage fees to matching invoices' balance
            allInvoices = allInvoices.map(inv => {
              const storageFee = storageFeeMap.get(inv.invoiceNumber) || 0;
              if (storageFee > 0) {
                return {
                  ...inv,
                  storageFee,
                  balanceToPay: (inv.balanceToPay || 0) + storageFee,
                  net: (inv.net || 0) + storageFee,
                };
              }
              return inv;
            });
          }
        } catch (storageErr) {
          console.log("Could not load storage fees:", storageErr);
        }

        console.log(`Loaded ${allInvoices.length} total invoices from database`);
        setInvoices(allInvoices);
      } catch (error) {
        console.error("Error loading invoices:", error);
        toast.error("Could not load invoice data");
      }
    };

    loadAllInvoices();
  }, []);

  return { invoices };
};
