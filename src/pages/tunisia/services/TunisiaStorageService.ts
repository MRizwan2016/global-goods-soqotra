import { TunisiaContainer } from "../types/tunisiaTypes";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";
import { supabase } from "@/integrations/supabase/client";

export class TunisiaStorageService {
  private static readonly INVOICES_KEY = "tunisia-invoices";
  private static readonly CONTAINERS_KEY = "tunisia-containers";

  // Migration helper - move data from localStorage to Supabase
  private static async migrateDataToSupabase(): Promise<void> {
    try {
      // Use a default user ID for Tunisia project (no authentication required)
      const defaultUserId = 'tunisia-user-default';

      // Migrate invoices
      const localInvoices = localStorage.getItem(this.INVOICES_KEY);
      if (localInvoices) {
        const invoices = JSON.parse(localInvoices);
        for (const invoice of invoices) {
          await this.saveInvoiceToSupabase(invoice);
        }
        localStorage.removeItem(this.INVOICES_KEY);
      }

      // Migrate containers
      const localContainers = localStorage.getItem(this.CONTAINERS_KEY);
      if (localContainers) {
        const containers = JSON.parse(localContainers);
        for (const container of containers) {
          await this.saveContainerToSupabase(container);
        }
        localStorage.removeItem(this.CONTAINERS_KEY);
      }
    } catch (error) {
      console.error("Error migrating data:", error);
    }
  }

  // Invoice methods
  static async saveInvoices(invoices: TunisiaInvoice[]): Promise<void> {
    // This method is now deprecated - use individual save methods
    console.warn("saveInvoices is deprecated, migrating to Supabase");
    await this.migrateDataToSupabase();
  }

  static async loadInvoices(): Promise<TunisiaInvoice[]> {
    try {
      // Use a default user ID for Tunisia project (no authentication required)
      const defaultUserId = 'tunisia-user-default';

      const { data, error } = await supabase
        .from('tunisia_invoices')
        .select('*')
        .eq('user_id', defaultUserId);

      if (error) throw error;
      
      // Transform database data to TunisiaInvoice format
      return (data || []).map(item => ({
        id: item.id,
        invoiceNumber: item.invoice_number,
        customer: item.customer_id as any, // This will need proper customer lookup
        vehicle: item.vehicle as any,
        personalEffects: item.personal_effects as any,
        totalAmount: Number(item.total_amount),
        date: item.date,
        status: (item.status as "DRAFT" | "CONFIRMED" | "LOADED") || "DRAFT",
        paymentDetails: item.payment_details as any
      }));
    } catch (error) {
      console.error("Error loading invoices:", error);
      return [];
    }
  }

  private static async saveInvoiceToSupabase(invoice: TunisiaInvoice): Promise<void> {
    // Use a default user ID for Tunisia project (no authentication required)
    const defaultUserId = 'tunisia-user-default';

    const { error } = await supabase
      .from('tunisia_invoices')
      .upsert({
        user_id: defaultUserId,
        invoice_number: invoice.invoiceNumber,
        customer_id: typeof invoice.customer === 'object' ? invoice.customer.id : invoice.customer,
        vehicle: invoice.vehicle as any,
        personal_effects: invoice.personalEffects as any,
        total_amount: invoice.totalAmount,
        date: invoice.date,
        status: invoice.status,
        payment_details: invoice.paymentDetails as any
      });

    if (error) throw error;
  }

  static async addInvoice(invoice: TunisiaInvoice): Promise<void> {
    await this.saveInvoiceToSupabase(invoice);
  }

  static async updateInvoice(invoice: TunisiaInvoice): Promise<void> {
    await this.saveInvoiceToSupabase(invoice);
  }

  static async deleteInvoice(invoiceId: string): Promise<void> {
    const { error } = await supabase
      .from('tunisia_invoices')
      .delete()
      .eq('id', invoiceId);

    if (error) throw error;
  }

  static async getInvoiceById(invoiceId: string): Promise<TunisiaInvoice | null> {
    try {
      const { data, error } = await supabase
        .from('tunisia_invoices')
        .select('*')
        .eq('id', invoiceId)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return {
        id: data.id,
        invoiceNumber: data.invoice_number,
        customer: data.customer_id as any,
        vehicle: data.vehicle as any,
        personalEffects: data.personal_effects as any,
        totalAmount: Number(data.total_amount),
        date: data.date,
        status: (data.status as "DRAFT" | "CONFIRMED" | "LOADED") || "DRAFT",
        paymentDetails: data.payment_details as any
      };
    } catch (error) {
      console.error("Error getting invoice:", error);
      return null;
    }
  }

  static async getInvoiceByExportPlate(exportPlate: string): Promise<TunisiaInvoice | null> {
    try {
      const invoices = await this.loadInvoices();
      return invoices.find(inv => 
        inv.vehicle.exportPlate?.toLowerCase().trim() === exportPlate.toLowerCase().trim()
      ) || null;
    } catch (error) {
      console.error("Error getting invoice by export plate:", error);
      return null;
    }
  }

  // Container methods
  static async saveContainers(containers: TunisiaContainer[]): Promise<void> {
    // This method is now deprecated - use individual save methods
    console.warn("saveContainers is deprecated, migrating to Supabase");
    await this.migrateDataToSupabase();
  }

  static async loadContainers(): Promise<TunisiaContainer[]> {
    try {
      // Use a default user ID for Tunisia project (no authentication required)
      const defaultUserId = 'tunisia-user-default';

      const { data, error } = await supabase
        .from('tunisia_containers')
        .select('*')
        .eq('user_id', defaultUserId);

      if (error) throw error;
      
      // Transform database data to TunisiaContainer format
      return (data || []).map(item => ({
        id: item.id,
        containerNumber: item.container_number,
        sealNumber: item.seal_number || '',
        type: '40HC' as const,
        maxVehicles: 6,
        loadedVehicles: (item.loaded_vehicles as any) || [],
        personalEffects: [],
        dateOfLoading: item.created_at,
        status: item.status as any || 'EMPTY',
        totalFreightCharge: 0,
        totalPersonalEffectsCharge: 0,
        totalCharge: 0
      }));
    } catch (error) {
      console.error("Error loading containers:", error);
      return [];
    }
  }

  private static async saveContainerToSupabase(container: TunisiaContainer): Promise<void> {
    // Use a default user ID for Tunisia project (no authentication required)
    const defaultUserId = 'tunisia-user-default';

    const { error } = await supabase
      .from('tunisia_containers')
      .upsert({
        user_id: defaultUserId,
        container_number: container.containerNumber,
        status: container.status,
        seal_number: container.sealNumber,
        loaded_vehicles: container.loadedVehicles as any
      });

    if (error) throw error;
  }

  static async addContainer(container: TunisiaContainer): Promise<void> {
    await this.saveContainerToSupabase(container);
  }

  static async updateContainer(container: TunisiaContainer): Promise<void> {
    await this.saveContainerToSupabase(container);
  }

  static async deleteContainer(containerId: string): Promise<void> {
    const { error } = await supabase
      .from('tunisia_containers')
      .delete()
      .eq('id', containerId);

    if (error) throw error;
  }

  static async getContainerById(containerId: string): Promise<TunisiaContainer | null> {
    try {
      const { data, error } = await supabase
        .from('tunisia_containers')
        .select('*')
        .eq('id', containerId)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return {
        id: data.id,
        containerNumber: data.container_number,
        sealNumber: data.seal_number || '',
        type: '40HC' as const,
        maxVehicles: 6,
        loadedVehicles: (data.loaded_vehicles as any) || [],
        personalEffects: [],
        dateOfLoading: data.created_at,
        status: data.status as any || 'EMPTY',
        totalFreightCharge: 0,
        totalPersonalEffectsCharge: 0,
        totalCharge: 0
      };
    } catch (error) {
      console.error("Error getting container:", error);
      return null;
    }
  }

  // Sync invoice updates to containers
  static async syncInvoiceToContainers(updatedInvoice: TunisiaInvoice): Promise<void> {
    const containers = await this.loadContainers();
    
    for (const container of containers) {
      let hasChanges = false;
      const updatedVehicles = container.loadedVehicles.map(vehicle => {
        // Match by export plate or chassis number
        if (vehicle.exportPlate === updatedInvoice.vehicle.exportPlate ||
            vehicle.chassisNumber === updatedInvoice.vehicle.chassisNumber) {
          hasChanges = true;
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
      });
      
      if (hasChanges) {
        await this.updateContainer({
          ...container,
          loadedVehicles: updatedVehicles
        });
      }
    }
  }

  // Clear all data
  static async clearAllData(): Promise<void> {
    // Use a default user ID for Tunisia project (no authentication required)
    const defaultUserId = 'tunisia-user-default';

    await supabase.from('tunisia_invoices').delete().eq('user_id', defaultUserId);
    await supabase.from('tunisia_containers').delete().eq('user_id', defaultUserId);
    
    localStorage.removeItem(this.INVOICES_KEY);
    localStorage.removeItem(this.CONTAINERS_KEY);
  }

  // Export data for backup
  static async exportData(): Promise<{ invoices: TunisiaInvoice[], containers: TunisiaContainer[] }> {
    return {
      invoices: await this.loadInvoices(),
      containers: await this.loadContainers()
    };
  }

  // Import data from backup
  static async importData(data: { invoices: TunisiaInvoice[], containers: TunisiaContainer[] }): Promise<void> {
    if (data.invoices) {
      for (const invoice of data.invoices) {
        await this.addInvoice(invoice);
      }
    }
    if (data.containers) {
      for (const container of data.containers) {
        await this.addContainer(container);
      }
    }
  }
}