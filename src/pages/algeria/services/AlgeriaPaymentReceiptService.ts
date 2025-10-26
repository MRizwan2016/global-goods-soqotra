export interface AlgeriaPaymentReceipt {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  date: string;
  customer: string;
  amount: number;
  paymentMethod: string;
  currency: string;
  remarks?: string;
}

export class AlgeriaPaymentReceiptService {
  private static STORAGE_KEY = "algeria_payment_receipts";

  static async loadReceipts(): Promise<AlgeriaPaymentReceipt[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Algeria payment receipts:", error);
      return [];
    }
  }

  static async saveReceipt(receipt: AlgeriaPaymentReceipt): Promise<void> {
    try {
      const receipts = await this.loadReceipts();
      receipts.push(receipt);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(receipts));
    } catch (error) {
      console.error("Error saving Algeria payment receipt:", error);
      throw error;
    }
  }

  static async getReceiptByInvoiceNumber(invoiceNumber: string): Promise<AlgeriaPaymentReceipt | null> {
    const receipts = await this.loadReceipts();
    return receipts.find(r => r.invoiceNumber === invoiceNumber) || null;
  }
}
