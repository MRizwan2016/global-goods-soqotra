import { supabase } from "@/integrations/supabase/client";
import { TunisiaContainer } from "../types/tunisiaTypes";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";

export class TunisiaStorageService {
  private static readonly INVOICES_KEY = "tunisia-invoices";
  private static readonly CONTAINERS_KEY = "tunisia-containers";

  // Get current user ID, throw error if not authenticated
  private static async getCurrentUserId(): Promise<string> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      throw new Error('User must be authenticated to access Tunisia data');
    }
    return session.user.id;
  }

  // Migration helper - move data from localStorage to Supabase
  private static async migrateDataToSupabase(): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();

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
      const userId = await this.getCurrentUserId();

      const { data, error } = await supabase
        .from('tunisia_invoices')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      // Transform database data to TunisiaInvoice format
      return (data || []).map(item => {
        // Parse customer data properly
        let customer;
        try {
          customer = typeof item.customer_id === 'string' 
            ? JSON.parse(item.customer_id) 
            : item.customer_id;
        } catch {
          customer = { id: item.customer_id, name: 'Unknown Customer' };
        }

        return {
          id: item.id,
          invoiceNumber: item.invoice_number,
          customer: customer,
          vehicle: item.vehicle as any,
          personalEffects: item.personal_effects as any,
          totalAmount: Number(item.total_amount),
          date: item.date,
          status: (item.status as "DRAFT" | "CONFIRMED" | "LOADED") || "DRAFT",
          paymentDetails: item.payment_details as any,
          supportingDocuments: (item as any).supporting_documents || undefined,
          hblNumber: (item as any).hbl_number || undefined
        };
      });
    } catch (error) {
      console.error("Error loading invoices:", error);
      return [];
    }
  }

  private static async saveInvoiceToSupabase(invoice: TunisiaInvoice): Promise<void> {
    const userId = await this.getCurrentUserId();

    // Prepare the data to save with proper customer information
    const dataToSave = {
      id: invoice.id, // Include ID for proper upsert
      user_id: userId,
      invoice_number: invoice.invoiceNumber,
      customer_id: typeof invoice.customer === 'object' ? JSON.stringify(invoice.customer) : invoice.customer,
      vehicle: invoice.vehicle as any,
      personal_effects: invoice.personalEffects as any,
      total_amount: invoice.totalAmount,
      date: invoice.date,
      status: invoice.status,
      payment_details: invoice.paymentDetails as any
    };

    // Add supporting documents and HBL number if they exist in the invoice
    if (invoice.supportingDocuments) {
      (dataToSave as any).supporting_documents = invoice.supportingDocuments;
    }
    if (invoice.hblNumber) {
      (dataToSave as any).hbl_number = invoice.hblNumber;
    }

    const { error } = await supabase
      .from('tunisia_invoices')
      .upsert(dataToSave);

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
      
      // Parse customer data properly
      let customer;
      try {
        customer = typeof data.customer_id === 'string' 
          ? JSON.parse(data.customer_id) 
          : data.customer_id;
      } catch {
        customer = { id: data.customer_id, name: 'Unknown Customer' };
      }

      return {
        id: data.id,
        invoiceNumber: data.invoice_number,
        customer: customer,
        vehicle: data.vehicle as any,
        personalEffects: data.personal_effects as any,
        totalAmount: Number(data.total_amount),
        date: data.date,
        status: (data.status as "DRAFT" | "CONFIRMED" | "LOADED") || "DRAFT",
        paymentDetails: data.payment_details as any,
        supportingDocuments: (data as any).supporting_documents || undefined,
        hblNumber: (data as any).hbl_number || undefined
      };
    } catch (error) {
      console.error("Error getting invoice:", error);
      return null;
    }
  }

  static async getInvoiceByExportPlate(exportPlate: string): Promise<TunisiaInvoice | null> {
    try {
      // First try from database
      const { data: dbData, error: dbError } = await supabase
        .from('tunisia_invoices')
        .select('*')
        .ilike('vehicle->>exportPlate', `%${exportPlate}%`)
        .limit(1)
        .single();

      if (!dbError && dbData) {
        console.log("Found invoice in database:", dbData.invoice_number);
        return this.convertDbInvoiceToLocal(dbData);
      }

      // Fallback to local storage
      const invoices = await this.loadInvoices();
      console.log("Searching for export plate:", exportPlate);
      console.log("Available export plates:", invoices.map(inv => inv.vehicle.exportPlate).filter(Boolean));
      
      const found = invoices.find(inv => {
        const invExportPlate = inv.vehicle.exportPlate?.toString().toLowerCase().trim();
        const searchPlate = exportPlate.toString().toLowerCase().trim();
        console.log("Comparing:", invExportPlate, "vs", searchPlate);
        return invExportPlate === searchPlate;
      });
      
      console.log("Found invoice:", found ? found.invoiceNumber : "Not found");
      return found || null;
    } catch (error) {
      console.error("Error getting invoice by export plate:", error);
      return null;
    }
  }

  private static convertDbInvoiceToLocal(dbInvoice: any): TunisiaInvoice {
    return {
      id: dbInvoice.id,
      invoiceNumber: dbInvoice.invoice_number,
      customer: {
        id: dbInvoice.customer_id,
        name: dbInvoice.vehicle?.customerName || "Unknown Customer",
        mobile: dbInvoice.vehicle?.customerMobile || "",
        metrashMobile: dbInvoice.vehicle?.customerMetrashMobile || "",
        prefix: dbInvoice.vehicle?.customerPrefix || "MR.",
        address: dbInvoice.vehicle?.customerAddress || ""
      },
      vehicle: dbInvoice.vehicle,
      personalEffects: dbInvoice.personal_effects || [],
      totalAmount: Number(dbInvoice.total_amount),
      date: dbInvoice.date,
      status: "CONFIRMED",
      hblNumber: dbInvoice.hbl_number,
      paymentStatus: dbInvoice.payment_details ? "paid" : "unpaid",
      paymentDetails: dbInvoice.payment_details,
      supportingDocuments: dbInvoice.supporting_documents || []
    };
  }

  // Container methods
  static async saveContainers(containers: TunisiaContainer[]): Promise<void> {
    // This method is now deprecated - use individual save methods
    console.warn("saveContainers is deprecated, migrating to Supabase");
    await this.migrateDataToSupabase();
  }

  static async loadContainers(): Promise<TunisiaContainer[]> {
    try {
      const userId = await this.getCurrentUserId();

      const { data, error } = await supabase
        .from('tunisia_containers')
        .select('*')
        .eq('user_id', userId);

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
    const userId = await this.getCurrentUserId();

    const { error } = await supabase
      .from('tunisia_containers')
      .upsert({
        user_id: userId,
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
    const userId = await this.getCurrentUserId();

    await supabase.from('tunisia_invoices').delete().eq('user_id', userId);
    await supabase.from('tunisia_containers').delete().eq('user_id', userId);
    
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

  // Clean up duplicate containers
  static async cleanupDuplicateContainers(): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      
      // Get all containers
      const { data: containers, error } = await supabase
        .from('tunisia_containers')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (!containers) return;

      // Group by container number and keep only the latest one
      const containerGroups: { [key: string]: any[] } = {};
      containers.forEach(container => {
        if (!containerGroups[container.container_number]) {
          containerGroups[container.container_number] = [];
        }
        containerGroups[container.container_number].push(container);
      });

      // Delete duplicates
      for (const containerNumber in containerGroups) {
        const group = containerGroups[containerNumber];
        if (group.length > 1) {
          // Sort by created_at and keep the latest
          group.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          const toDelete = group.slice(1); // Remove the first (latest) item
          
          for (const container of toDelete) {
            await supabase
              .from('tunisia_containers')
              .delete()
              .eq('id', container.id);
          }
          
          console.log(`Cleaned up ${toDelete.length} duplicate containers for ${containerNumber}`);
        }
      }
    } catch (error) {
      console.error("Error cleaning up duplicate containers:", error);
    }
  }
}