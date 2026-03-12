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

// Helper to safely parse localStorage JSON
const safeParseJSON = (key: string): any[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Convert any country invoice to a standard search-compatible format
const convertInvoice = (inv: any, country: string): any => ({
  id: inv.id || inv.invoiceNumber || crypto.randomUUID(),
  invoiceNumber: inv.invoiceNumber || inv.formData?.invoiceNumber || inv.invoice_no || '',
  date: inv.formData?.date || inv.date || inv.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  net: inv.formData?.netAmount || inv.net || inv.total_amount || inv.totalAmount || inv.amount || 0,
  gross: inv.gross || inv.formData?.netAmount || inv.net || inv.total_amount || inv.amount || 0,
  discount: inv.discount || 0,
  paid: inv.paid || inv.status === 'PAID' || inv.paymentStatus === 'paid' || false,
  totalPaid: inv.totalPaid || inv.paidAmount || 0,
  balanceToPay: inv.balanceToPay || inv.formData?.netAmount || inv.net || inv.total_amount || inv.amount || 0,
  consignee: inv.formData?.consignee1 || inv.consignee1 || inv.consignee_name || inv.consignee || '',
  consignee1: inv.formData?.consignee1 || inv.consignee1 || inv.consignee_name || inv.consignee || '',
  shipper: inv.formData?.shipper1 || inv.shipper1 || inv.shipper_name || inv.shipper || '',
  shipper1: inv.formData?.shipper1 || inv.shipper1 || inv.shipper_name || inv.shipper || '',
  warehouse: inv.warehouse || '',
  shipmentType: inv.shipmentType || inv.freightType || '',
  freightType: inv.freightType || inv.shipmentType || '',
  bookingForm: inv.formData?.bookNumber || inv.bookingForm || inv.book_no || '',
  bookNumber: inv.formData?.bookNumber || inv.bookingForm || inv.book_no || '',
  awbNumber: inv.awbNumber || '',
  currency: inv.formData?.currency || inv.currency || 'QR',
  country: country,
  amount: inv.formData?.netAmount || inv.net || inv.total_amount || inv.totalAmount || inv.amount || 0,
});

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
      
      // Check payments and update paid status
      const payments = safeParseJSON('payments');
      if (payments.length > 0) {
        return allInvoices.map(invoice => {
          const invoicePayments = payments.filter(
            (payment: any) => payment.invoiceNumber === invoice.invoiceNumber
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
      
      // Deduplicate
      const seen = new Set<string>();
      return allInvoices.filter(inv => {
        if (!inv.invoiceNumber || seen.has(inv.invoiceNumber)) return false;
        seen.add(inv.invoiceNumber);
        return true;
      });
    } catch (error) {
      console.error("Error getting all invoices:", error);
      return [];
    }
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
