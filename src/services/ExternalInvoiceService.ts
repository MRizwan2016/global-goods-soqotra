/**
 * Service for syncing invoices from all country sources
 */

export interface ExternalInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  amount: number;
  net: number;
  gross: number;
  discount: number;
  totalPaid: number;
  balanceToPay: number;
  paid: boolean;
  consignee: string;
  consignee1: string;
  shipper: string;
  shipper1: string;
  warehouse: string;
  shipmentType: string;
  freightType: string;
  bookingForm: string;
  bookNumber: string;
  awbNumber: string;
  currency: string;
  country: string;
}

// Helper to safely extract a string name from a value that may be a string or object
const extractName = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.name) return String(val.name);
  return String(val) === '[object Object]' ? '' : String(val);
};

// Helper to safely parse localStorage JSON
const safeParseJSON = (key: string): any[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Extract pricing from nested or flat invoice data
const extractPricing = (inv: any): { gross: number; discount: number; net: number } => {
  // Check for nested pricing object (Sri Lanka format)
  if (inv.pricing && typeof inv.pricing === 'object') {
    return {
      gross: parseFloat(inv.pricing.gross) || 0,
      discount: parseFloat(inv.pricing.discount) || 0,
      net: parseFloat(inv.pricing.net) || 0,
    };
  }
  
  // Check formData nested pricing
  if (inv.formData) {
    const netAmount = parseFloat(inv.formData.netAmount) || parseFloat(inv.formData.totalPrice) || 0;
    const discount = parseFloat(inv.formData.discount) || 0;
    return {
      gross: netAmount + discount,
      discount,
      net: netAmount,
    };
  }
  
  // Flat fields
  const gross = parseFloat(inv.gross) || parseFloat(inv.grossAmount) || parseFloat(inv.total_amount) || parseFloat(inv.amount) || 0;
  const discount = parseFloat(inv.discount) || 0;
  const net = parseFloat(inv.net) || parseFloat(inv.netAmount) || parseFloat(inv.total_amount) || parseFloat(inv.amount) || gross - discount || 0;
  
  return { gross: gross || net + discount, discount, net: net || gross - discount };
};

// Convert any country invoice to a standard search-compatible format
const convertInvoice = (inv: any, country: string): any => {
  const pricing = extractPricing(inv);
  const shipperName = extractName(inv.shipper) || extractName(inv.shipper1) || extractName(inv.formData?.shipper1) || extractName(inv.shipper_name) || extractName(inv.shipperName) || '';
  const consigneeName = extractName(inv.consignee) || extractName(inv.consignee1) || extractName(inv.formData?.consignee1) || extractName(inv.consignee_name) || extractName(inv.consigneeName) || '';
  const invoiceNumber = String(inv.invoiceNumber || inv.formData?.invoiceNumber || inv.invoice_no || '');
  
  return {
    id: inv.id || invoiceNumber || crypto.randomUUID(),
    invoiceNumber,
    date: inv.formData?.date || inv.date || inv.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    net: pricing.net,
    gross: pricing.gross,
    discount: pricing.discount,
    paid: inv.paid || inv.status === 'PAID' || inv.paymentStatus === 'paid' || false,
    totalPaid: parseFloat(inv.totalPaid) || parseFloat(inv.paidAmount) || 0,
    balanceToPay: pricing.net - (parseFloat(inv.totalPaid) || parseFloat(inv.paidAmount) || 0),
    consignee: consigneeName,
    consignee1: consigneeName,
    shipper: shipperName,
    shipper1: shipperName,
    warehouse: inv.warehouse || inv.formData?.warehouse || inv.destination || '',
    shipmentType: inv.shipmentType || inv.freightType || inv.formData?.serviceType || inv.serviceType || '',
    freightType: inv.freightType || inv.shipmentType || inv.formData?.serviceType || inv.serviceType || '',
    bookingForm: inv.formData?.bookNumber || inv.bookingForm || inv.bookNumber || inv.book_no || inv.jobNumber || '',
    bookNumber: inv.formData?.bookNumber || inv.bookingForm || inv.bookNumber || inv.book_no || inv.jobNumber || '',
    awbNumber: inv.awbNumber || '',
    currency: inv.formData?.currency || inv.currency || 'QR',
    country: inv.country || country,
    amount: pricing.net,
    // Keep payment details for reference
    paymentStatus: inv.paymentStatus || (inv.paid ? 'paid' : 'unpaid'),
    paymentMethod: inv.paymentMethod || '',
  };
};

export class ExternalInvoiceService {
  private static readonly EXTERNAL_INVOICES_KEY = 'externalInvoices';
  private static readonly LAST_SYNC_KEY = 'lastInvoiceSync';

  /**
   * Sync invoices from external system
   */
  static async syncInvoicesFromExternal(): Promise<boolean> {
    try {
      console.log("Syncing invoices from all sources...");
      localStorage.setItem(this.LAST_SYNC_KEY, new Date().toISOString());
      return true;
    } catch (error) {
      console.error("Error syncing external invoices:", error);
      return false;
    }
  }

  /**
   * Get all invoices from all country sources
   */
  static getAllInvoices(): any[] {
    try {
      const allInvoices: any[] = [];
      
      // Country localStorage keys mapping
      const countrySources: { key: string; country: string }[] = [
        { key: 'invoices', country: 'QATAR' },
        { key: 'eritreaInvoices', country: 'ERITREA' },
        { key: 'sriLankaInvoices', country: 'SRI LANKA' },
        { key: 'sudanInvoices', country: 'SUDAN' },
        { key: 'philippinesInvoices', country: 'PHILIPPINES' },
        { key: 'algeria_invoices', country: 'ALGERIA' },
        { key: 'saudiArabiaInvoices', country: 'SAUDI ARABIA' },
        { key: 'kenyaInvoices', country: 'KENYA' },
        { key: 'generatedInvoices', country: 'QATAR' },
        { key: 'externalInvoices', country: 'EXTERNAL' },
      ];
      
      for (const source of countrySources) {
        const invoices = safeParseJSON(source.key);
        allInvoices.push(...invoices.map((inv: any) => convertInvoice(inv, inv.country || source.country)));
      }
      
      // Deduplicate first
      const seen = new Set<string>();
      const uniqueInvoices = allInvoices.filter(inv => {
        if (!inv.invoiceNumber || seen.has(inv.invoiceNumber)) return false;
        seen.add(inv.invoiceNumber);
        return true;
      });
      
      // Check payments and update paid status
      const payments = safeParseJSON('payments');
      if (payments.length > 0) {
        return uniqueInvoices.map(invoice => {
          const invoicePayments = payments.filter(
            (payment: any) => String(payment.invoiceNumber) === String(invoice.invoiceNumber)
          );
          if (invoicePayments.length > 0) {
            const totalPaid = invoicePayments.reduce(
              (sum: number, payment: any) => sum + (parseFloat(payment.amount) || 0), 0
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
      
      return uniqueInvoices;
    } catch (error) {
      console.error("Error getting all invoices:", error);
      return [];
    }
  }

  /**
   * Update invoice paid status across all country storage keys
   */
  static updateInvoicePaidStatus(invoiceNumber: string, paidAmount: number): void {
    const countrySources = [
      'invoices', 'eritreaInvoices', 'sriLankaInvoices', 'sudanInvoices',
      'philippinesInvoices', 'algeria_invoices', 'saudiArabiaInvoices',
      'kenyaInvoices', 'generatedInvoices', 'externalInvoices'
    ];
    
    for (const key of countrySources) {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) continue;
        const invoices = JSON.parse(stored);
        let updated = false;
        
        const updatedInvoices = invoices.map((inv: any) => {
          const invNumber = String(inv.invoiceNumber || inv.formData?.invoiceNumber || inv.invoice_no || '');
          if (invNumber === String(invoiceNumber)) {
            updated = true;
            const pricing = extractPricing(inv);
            const netAmount = pricing.net;
            const previousPaid = parseFloat(inv.totalPaid) || parseFloat(inv.paidAmount) || 0;
            const newTotalPaid = previousPaid + paidAmount;
            return {
              ...inv,
              paid: newTotalPaid >= netAmount,
              totalPaid: newTotalPaid,
              paidAmount: newTotalPaid,
              paymentStatus: newTotalPaid >= netAmount ? 'paid' : 'partial',
            };
          }
          return inv;
        });
        
        if (updated) {
          localStorage.setItem(key, JSON.stringify(updatedInvoices));
        }
      } catch (error) {
        console.error(`Error updating ${key}:`, error);
      }
    }
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
  }

  /**
   * Check if sync is needed (every 5 minutes)
   */
  static needsSync(): boolean {
    try {
      const lastSync = localStorage.getItem(this.LAST_SYNC_KEY);
      if (!lastSync) return true;
      const lastSyncTime = new Date(lastSync).getTime();
      const now = new Date().getTime();
      return (now - lastSyncTime) > 5 * 60 * 1000;
    } catch {
      return true;
    }
  }

  /**
   * Auto-sync if needed
   */
  static async autoSync(): Promise<void> {
    if (this.needsSync()) {
      await this.syncInvoicesFromExternal();
    }
  }
}

export default ExternalInvoiceService;
