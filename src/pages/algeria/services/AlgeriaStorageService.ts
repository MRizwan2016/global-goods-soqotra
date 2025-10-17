import { AlgeriaContainer, AlgeriaVehicle } from "../types/algeriaTypes";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";

const CONTAINERS_KEY = 'algeria_containers';
const INVOICES_KEY = 'algeria_invoices';
const VEHICLES_KEY = 'algeria_vehicles';

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

  // Vehicle operations
  static async loadVehicles(): Promise<AlgeriaVehicle[]> {
    try {
      const stored = localStorage.getItem(VEHICLES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading Algeria vehicles:", error);
      return [];
    }
  }

  static async addVehicle(vehicle: AlgeriaVehicle): Promise<void> {
    try {
      const vehicles = await this.loadVehicles();
      vehicles.push(vehicle);
      localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
    } catch (error) {
      console.error("Error adding vehicle:", error);
      throw error;
    }
  }

  static async updateVehicle(vehicle: AlgeriaVehicle): Promise<void> {
    try {
      const vehicles = await this.loadVehicles();
      const index = vehicles.findIndex(v => v.id === vehicle.id);
      if (index !== -1) {
        vehicles[index] = vehicle;
        localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      throw error;
    }
  }

  static async deleteVehicle(vehicleId: string): Promise<void> {
    try {
      const vehicles = await this.loadVehicles();
      const filtered = vehicles.filter(v => v.id !== vehicleId);
      localStorage.setItem(VEHICLES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      throw error;
    }
  }

  static async getVehicleByExportPlate(exportPlate: string): Promise<AlgeriaVehicle | null> {
    try {
      const vehicles = await this.loadVehicles();
      return vehicles.find(v => v.exportPlate === exportPlate) || null;
    } catch (error) {
      console.error("Error finding vehicle:", error);
      return null;
    }
  }
}
