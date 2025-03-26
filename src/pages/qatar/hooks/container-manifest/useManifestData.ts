
import { ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice } from "../../types/containerTypes";

export const useManifestData = (cargoItems: ContainerCargo[]) => {
  // Generate filtered item list based on cargo items
  const itemList: ItemListEntry[] = cargoItems.reduce((acc: ItemListEntry[], item) => {
    // Check if this invoice is already in the list
    const existingIndex = acc.findIndex(entry => entry.invoice === item.invoiceNumber);
    
    if (existingIndex >= 0) {
      // Add to existing invoice
      acc[existingIndex].packages += 1;
      acc[existingIndex].volume += item.volume;
    } else {
      // Create new invoice entry
      acc.push({
        id: item.id,
        invoice: item.invoiceNumber,
        shipper: item.shipper,
        consignee: item.consignee,
        packages: 1,
        volume: item.volume,
        packageName: item.packageName
      });
    }
    
    return acc;
  }, []);
  
  // Generate consignee list with contact information
  const consigneeList: ConsigneeListItem[] = cargoItems.reduce((acc: ConsigneeListItem[], item) => {
    // Check if this consignee is already in the list
    const existingIndex = acc.findIndex(
      entry => entry.consignee === item.consignee && entry.invoice === item.invoiceNumber
    );
    
    if (existingIndex >= 0) {
      // Add to existing consignee
      acc[existingIndex].volume += item.volume;
    } else {
      // Create new consignee entry with contact info
      acc.push({
        id: item.id,
        invoice: item.invoiceNumber,
        shipper: item.shipper.toUpperCase(),
        shipperContact: "MOBILE: +974 " + Math.floor(10000000 + Math.random() * 90000000),
        consignee: item.consignee.toUpperCase(),
        consigneeContact: "MOBILE: +94 " + Math.floor(700000000 + Math.random() * 90000000),
        volume: item.volume
      });
    }
    
    return acc;
  }, []);
  
  // Generate unsettled invoices from cargo items
  const unsettledInvoices: UnsettledInvoice[] = cargoItems.reduce((acc: UnsettledInvoice[], item) => {
    // Check if this invoice is already in the list
    const existingIndex = acc.findIndex(entry => 
      entry.invoiceNumber === item.invoiceNumber && 
      entry.shipper === item.shipper &&
      entry.consignee === item.consignee
    );
    
    if (existingIndex === -1) {
      // Create new invoice entry
      acc.push({
        id: item.id,
        invoiceNumber: item.invoiceNumber,
        shipper: item.shipper.toUpperCase(),
        consignee: item.consignee.toUpperCase(),
        amount: Math.floor(5000 + Math.random() * 10000) / 100,
        paid: Math.random() > 0.3 // 70% chance to be paid
      });
    }
    
    return acc;
  }, []);
  
  // Calculate totals
  const totalVolume = cargoItems.reduce((sum, item) => sum + item.volume, 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + item.weight, 0);
  const totalPackages = cargoItems.length;

  return {
    itemList,
    consigneeList,
    unsettledInvoices,
    totalVolume,
    totalWeight,
    totalPackages
  };
};
