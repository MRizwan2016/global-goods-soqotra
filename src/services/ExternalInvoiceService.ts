/**
 * Service for syncing invoices from external systems like 192.168.100.41:8080
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

export class ExternalInvoiceService {
  private static readonly EXTERNAL_INVOICES_KEY = 'externalInvoices';
  private static readonly LAST_SYNC_KEY = 'lastInvoiceSync';

  /**
   * Sync invoices from external system (simulated for now)
   */
  static async syncInvoicesFromExternal(): Promise<boolean> {
    try {
      console.log("Syncing invoices from external system...");
      
      // Simulate fetching from external system 192.168.100.41:8080
      // In a real implementation, this would make HTTP requests
      const externalInvoices: ExternalInvoice[] = [
        {
          id: "ext_001",
          invoiceNumber: "EXT001001",
          date: new Date().toISOString().split('T')[0],
          customerName: "External Customer 1",
          amount: 1000,
          net: 1000,
          gross: 1000,
          discount: 0,
          totalPaid: 0,
          balanceToPay: 1000,
          paid: false,
          consignee: "External Consignee 1",
          consignee1: "External Consignee 1",
          shipper: "External Shipper 1",
          shipper1: "External Shipper 1",
          warehouse: "External Warehouse",
          shipmentType: "Air Freight",
          freightType: "Air Freight",
          bookingForm: "EXT-BF-001",
          bookNumber: "EXT-BF-001",
          awbNumber: "EXT-AWB-001",
          currency: "QAR",
          country: "Qatar"
        },
        {
          id: "ext_002",
          invoiceNumber: "EXT001002",
          date: new Date().toISOString().split('T')[0],
          customerName: "External Customer 2",
          amount: 1500,
          net: 1500,
          gross: 1500,
          discount: 0,
          totalPaid: 0,
          balanceToPay: 1500,
          paid: false,
          consignee: "External Consignee 2",
          consignee1: "External Consignee 2",
          shipper: "External Shipper 2",
          shipper1: "External Shipper 2",
          warehouse: "External Warehouse",
          shipmentType: "Sea Freight",
          freightType: "Sea Freight",
          bookingForm: "EXT-BF-002",
          bookNumber: "EXT-BF-002",
          awbNumber: "EXT-AWB-002",
          currency: "QAR",
          country: "Qatar"
        }
      ];

      // Store external invoices separately
      localStorage.setItem(this.EXTERNAL_INVOICES_KEY, JSON.stringify(externalInvoices));
      
      // Update last sync timestamp
      localStorage.setItem(this.LAST_SYNC_KEY, new Date().toISOString());
      
      console.log(`Synced ${externalInvoices.length} invoices from external system`);
      return true;
    } catch (error) {
      console.error("Error syncing external invoices:", error);
      return false;
    }
  }

  /**
   * Get all external invoices
   */
  static getExternalInvoices(): ExternalInvoice[] {
    try {
      const stored = localStorage.getItem(this.EXTERNAL_INVOICES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error getting external invoices:", error);
      return [];
    }
  }

  /**
   * Get combined local and external invoices
   */
  static getAllInvoices(): any[] {
    try {
      const localInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
      const externalInvoices = this.getExternalInvoices();
      
      return [...localInvoices, ...generatedInvoices, ...externalInvoices];
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
      const fiveMinutes = 5 * 60 * 1000;
      
      return (now - lastSyncTime) > fiveMinutes;
    } catch (error) {
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