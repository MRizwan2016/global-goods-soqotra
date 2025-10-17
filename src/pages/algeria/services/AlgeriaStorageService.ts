import { AlgeriaContainer } from "../types/algeriaTypes";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";

const CONTAINERS_KEY = 'algeria_containers';
const INVOICES_KEY = 'algeria_invoices';

export class AlgeriaStorageService {
  // Container operations
  static async loadContainers(): Promise<AlgeriaContainer[]> {
    try {
      const stored = localStorage.getItem(CONTAINERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Algeria containers:", error);
      return [];
    }
  }

  static async addContainer(container: AlgeriaContainer): Promise<void> {
    try {
      const containers = await this.loadContainers();
      containers.push(container);
      localStorage.setItem(CONTAINERS_KEY, JSON.stringify(containers));
    } catch (error) {
      console.error("Error adding container:", error);
      throw error;
    }
  }

  static async updateContainer(container: AlgeriaContainer): Promise<void> {
    try {
      const containers = await this.loadContainers();
      const index = containers.findIndex(c => c.id === container.id);
      if (index !== -1) {
        containers[index] = container;
        localStorage.setItem(CONTAINERS_KEY, JSON.stringify(containers));
      }
    } catch (error) {
      console.error("Error updating container:", error);
      throw error;
    }
  }

  static async deleteContainer(containerId: string): Promise<void> {
    try {
      const containers = await this.loadContainers();
      const filtered = containers.filter(c => c.id !== containerId);
      localStorage.setItem(CONTAINERS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting container:", error);
      throw error;
    }
  }

  // Invoice operations
  static async loadInvoices(): Promise<AlgeriaInvoice[]> {
    try {
      const stored = localStorage.getItem(INVOICES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Algeria invoices:", error);
      return [];
    }
  }

  static async addInvoice(invoice: AlgeriaInvoice): Promise<void> {
    try {
      const invoices = await this.loadInvoices();
      invoices.push(invoice);
      localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
    } catch (error) {
      console.error("Error adding invoice:", error);
      throw error;
    }
  }

  static async deleteInvoice(invoiceId: string): Promise<void> {
    try {
      const invoices = await this.loadInvoices();
      const filtered = invoices.filter(i => i.id !== invoiceId);
      localStorage.setItem(INVOICES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting invoice:", error);
      throw error;
    }
  }
}
