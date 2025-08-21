import { TunisiaContainer } from "../types/tunisiaTypes";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";

export class TunisiaStorageService {
  private static readonly INVOICES_KEY = "tunisia-invoices";
  private static readonly CONTAINERS_KEY = "tunisia-containers";

  // Invoice methods
  static saveInvoices(invoices: TunisiaInvoice[]): void {
    localStorage.setItem(this.INVOICES_KEY, JSON.stringify(invoices));
  }

  static loadInvoices(): TunisiaInvoice[] {
    try {
      const data = localStorage.getItem(this.INVOICES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading invoices:", error);
      return [];
    }
  }

  static addInvoice(invoice: TunisiaInvoice): void {
    const invoices = this.loadInvoices();
    const existingIndex = invoices.findIndex(inv => inv.id === invoice.id);
    
    if (existingIndex >= 0) {
      invoices[existingIndex] = invoice;
    } else {
      invoices.push(invoice);
    }
    
    this.saveInvoices(invoices);
  }

  static updateInvoice(invoice: TunisiaInvoice): void {
    this.addInvoice(invoice); // Same logic for update
  }

  static deleteInvoice(invoiceId: string): void {
    const invoices = this.loadInvoices();
    const filtered = invoices.filter(inv => inv.id !== invoiceId);
    this.saveInvoices(filtered);
  }

  static getInvoiceById(invoiceId: string): TunisiaInvoice | null {
    const invoices = this.loadInvoices();
    return invoices.find(inv => inv.id === invoiceId) || null;
  }

  static getInvoiceByExportPlate(exportPlate: string): TunisiaInvoice | null {
    const invoices = this.loadInvoices();
    return invoices.find(inv => 
      inv.vehicle.exportPlate?.toLowerCase().trim() === exportPlate.toLowerCase().trim()
    ) || null;
  }

  // Container methods
  static saveContainers(containers: TunisiaContainer[]): void {
    localStorage.setItem(this.CONTAINERS_KEY, JSON.stringify(containers));
  }

  static loadContainers(): TunisiaContainer[] {
    try {
      const data = localStorage.getItem(this.CONTAINERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading containers:", error);
      return [];
    }
  }

  static addContainer(container: TunisiaContainer): void {
    const containers = this.loadContainers();
    const existingIndex = containers.findIndex(cont => cont.id === container.id);
    
    if (existingIndex >= 0) {
      containers[existingIndex] = container;
    } else {
      containers.push(container);
    }
    
    this.saveContainers(containers);
  }

  static updateContainer(container: TunisiaContainer): void {
    this.addContainer(container); // Same logic for update
  }

  static deleteContainer(containerId: string): void {
    const containers = this.loadContainers();
    const filtered = containers.filter(cont => cont.id !== containerId);
    this.saveContainers(filtered);
  }

  static getContainerById(containerId: string): TunisiaContainer | null {
    const containers = this.loadContainers();
    return containers.find(cont => cont.id === containerId) || null;
  }

  // Sync invoice updates to containers
  static syncInvoiceToContainers(updatedInvoice: TunisiaInvoice): void {
    const containers = this.loadContainers();
    const updatedContainers = containers.map(container => ({
      ...container,
      loadedVehicles: container.loadedVehicles.map(vehicle => {
        // Match by export plate or chassis number
        if (vehicle.exportPlate === updatedInvoice.vehicle.exportPlate ||
            vehicle.chassisNumber === updatedInvoice.vehicle.chassisNumber) {
          return {
            ...vehicle,
            make: updatedInvoice.vehicle.make,
            model: updatedInvoice.vehicle.model,
            year: updatedInvoice.vehicle.year,
            color: updatedInvoice.vehicle.color,
            chassisNumber: updatedInvoice.vehicle.chassisNumber,
            plateNumber: updatedInvoice.vehicle.plateNumber,
            engineNumber: updatedInvoice.vehicle.engineNumber,
            country: updatedInvoice.vehicle.country,
            hsCode: updatedInvoice.vehicle.hsCode,
            exportPlate: updatedInvoice.vehicle.exportPlate,
            type: updatedInvoice.vehicle.type,
            freightCharge: updatedInvoice.vehicle.freightCharge,
            photos: updatedInvoice.vehicle.photos,
            customerInfo: updatedInvoice.customer
          };
        }
        return vehicle;
      })
    }));
    
    this.saveContainers(updatedContainers);
  }

  // Clear all data
  static clearAllData(): void {
    localStorage.removeItem(this.INVOICES_KEY);
    localStorage.removeItem(this.CONTAINERS_KEY);
  }

  // Export data for backup
  static exportData(): { invoices: TunisiaInvoice[], containers: TunisiaContainer[] } {
    return {
      invoices: this.loadInvoices(),
      containers: this.loadContainers()
    };
  }

  // Import data from backup
  static importData(data: { invoices: TunisiaInvoice[], containers: TunisiaContainer[] }): void {
    if (data.invoices) {
      this.saveInvoices(data.invoices);
    }
    if (data.containers) {
      this.saveContainers(data.containers);
    }
  }
}