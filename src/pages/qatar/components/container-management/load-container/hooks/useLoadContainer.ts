
import { useState, useEffect } from "react";
import { ContainerCargo, QatarContainer } from "../../../../types/containerTypes";
import { toast } from "sonner";
import useBarcodeScanner from "../../../../hooks/useBarcodeScanner";

interface UseLoadContainerProps {
  containerId: string;
  containerData?: QatarContainer | null;
  onLoadComplete: () => void;
}

export const useLoadContainer = ({
  containerId,
  containerData,
  onLoadComplete
}: UseLoadContainerProps) => {
  // State
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [activeTab, setActiveTab] = useState<string>("advancedSearch");
  const [loadedInvoiceNumbers, setLoadedInvoiceNumbers] = useState<Set<string>>(new Set());
  
  // Load existing cargo items for this container
  useEffect(() => {
    try {
      // First try to load container-specific cargo items
      const containerSpecificItems = localStorage.getItem(`cargoItems_${containerId}`);
      if (containerSpecificItems) {
        const parsedItems = JSON.parse(containerSpecificItems);
        setCargoItems(parsedItems);
        
        // Track which invoice numbers are already loaded
        const invoiceNumbers = new Set<string>();
        parsedItems.forEach((item: ContainerCargo) => {
          if (item.invoiceNumber) {
            invoiceNumbers.add(item.invoiceNumber);
          }
        });
        setLoadedInvoiceNumbers(invoiceNumbers);
        
        console.log(`Loaded ${parsedItems.length} cargo items for container ${containerId} from container-specific storage`);
        return;
      }
      
      // If no container-specific items, fall back to global cargo items
      const savedCargoItems = JSON.parse(localStorage.getItem('cargoItems') || '[]');
      const containerCargo = savedCargoItems.filter((item: any) => item.containerId === containerId);
      
      setCargoItems(containerCargo);
      
      // Track which invoice numbers are already loaded
      const invoiceNumbers = new Set<string>();
      containerCargo.forEach((item: ContainerCargo) => {
        if (item.invoiceNumber) {
          invoiceNumbers.add(item.invoiceNumber);
        }
      });
      setLoadedInvoiceNumbers(invoiceNumbers);
      
      console.log(`Loaded ${containerCargo.length} cargo items for container ${containerId} from global storage`);
    } catch (error) {
      console.error("Error loading cargo items:", error);
      toast.error("Error loading existing cargo items", {
        description: "Please try refreshing the page"
      });
    }
  }, [containerId]);
  
  // Handle barcode detection
  const handlePackageBarcodeDetected = (barcode: string) => {
    // Get invoices from localStorage
    const storedInvoices = localStorage.getItem('invoices');
    const generatedInvoices = localStorage.getItem('generatedInvoices');
    let allInvoices: any[] = [];

    try {
      if (storedInvoices) {
        allInvoices = [...JSON.parse(storedInvoices)];
      }
      if (generatedInvoices) {
        allInvoices = [...allInvoices, ...JSON.parse(generatedInvoices)];
      }

      // Try to find the invoice by invoice number or package/barcode
      const matchingInvoice = allInvoices.find((inv: any) => 
        inv.invoiceNumber === barcode || 
        inv.packages?.toString() === barcode
      );

      if (matchingInvoice) {
        toast.success(`Detected invoice: ${matchingInvoice.invoiceNumber}`, {
          description: "Invoice details loaded automatically"
        });
      } else {
        toast.info(`Barcode detected: ${barcode}`, {
          description: "No matching invoice found. Use the entry forms to add cargo with this barcode"
        });
      }
    } catch (error) {
      console.error("Error processing barcode:", error);
      toast.info(`Barcode detected: ${barcode}`, {
        description: "Use the entry forms to add cargo with this barcode"
      });
    }
  };
  
  // Setup barcode scanner
  const { scanning, toggleScanning } = useBarcodeScanner({
    onBarcodeDetected: handlePackageBarcodeDetected,
    enabled: true
  });
  
  // Handle adding cargo
  const handleAddCargo = (cargo: ContainerCargo) => {
    // Check for duplicate package (same invoice + barcode)
    const isDuplicate = cargoItems.some(item => 
      item.invoiceNumber === cargo.invoiceNumber && 
      item.barcode === cargo.barcode && 
      cargo.barcode !== ""
    );
    
    if (isDuplicate) {
      toast.error("This package is already loaded in the container", {
        description: "Each package can only be loaded once",
      });
      return;
    }
    
    // Add to state
    const updatedItems = [...cargoItems, cargo];
    setCargoItems(updatedItems);
    
    // Update loaded invoice numbers
    if (cargo.invoiceNumber) {
      setLoadedInvoiceNumbers(prev => new Set([...prev, cargo.invoiceNumber]));
    }
    
    // Save to container-specific storage immediately
    try {
      localStorage.setItem(`cargoItems_${containerId}`, JSON.stringify(updatedItems));
      console.log(`Saved ${updatedItems.length} cargo items to container-specific storage for container ${containerId}`);
    } catch (err) {
      console.error("Error saving cargo to container-specific storage:", err);
    }
    
    toast.success(`Cargo item added to container`, {
      description: `Invoice: ${cargo.invoiceNumber}, ${cargo.packageName}`
    });
  };
  
  // Handle removing cargo
  const handleRemoveCargo = (cargoId: string) => {
    // Find the cargo to be removed
    const cargoToRemove = cargoItems.find(item => item.id === cargoId);
    if (!cargoToRemove) return;
    
    // Update state
    const updatedItems = cargoItems.filter(item => item.id !== cargoId);
    setCargoItems(updatedItems);
    
    // Save updated items to container-specific storage immediately
    try {
      localStorage.setItem(`cargoItems_${containerId}`, JSON.stringify(updatedItems));
      console.log(`Updated cargo items in container-specific storage after removal for container ${containerId}`);
    } catch (err) {
      console.error("Error updating cargo in container-specific storage after removal:", err);
    }
    
    // Check if this was the last item for this invoice
    if (cargoToRemove.invoiceNumber) {
      const hasMoreItemsWithSameInvoice = updatedItems.some(item => 
        item.invoiceNumber === cargoToRemove.invoiceNumber
      );
      
      // If no more items with this invoice, remove from loaded invoices
      if (!hasMoreItemsWithSameInvoice) {
        const updatedInvoiceNumbers = new Set(loadedInvoiceNumbers);
        updatedInvoiceNumbers.delete(cargoToRemove.invoiceNumber);
        setLoadedInvoiceNumbers(updatedInvoiceNumbers);
      }
    }
    
    toast.info(`Cargo item removed`);
  };
  
  // Handle load completion
  const handleLoadComplete = () => {
    // Save cargo items to both global and container-specific storage
    try {
      // Save to global cargo storage
      const savedCargoItems = JSON.parse(localStorage.getItem('cargoItems') || '[]');
      
      // Remove existing items for this container
      const filteredItems = savedCargoItems.filter((item: any) => item.containerId !== containerId);
      
      // Add current items
      const updatedCargoItems = [...filteredItems, ...cargoItems];
      localStorage.setItem('cargoItems', JSON.stringify(updatedCargoItems));
      
      // Ensure container-specific storage is up to date
      localStorage.setItem(`cargoItems_${containerId}`, JSON.stringify(cargoItems));
      
      console.log(`Saved ${cargoItems.length} cargo items for container ${containerId} to both storages`);
      
      // Update the container in localStorage to reflect loading status
      const containers = JSON.parse(localStorage.getItem('containers') || '[]');
      const updatedContainers = containers.map((container: QatarContainer) => {
        if (container.id === containerId) {
          return {
            ...container,
            status: 'LOADED',
            packages: cargoItems.length,
            weight: cargoItems.reduce((sum, item) => sum + (parseFloat(item.weight.toString()) || 0), 0),
            volume: cargoItems.reduce((sum, item) => sum + (parseFloat(item.volume.toString()) || 0), 0),
          };
        }
        return container;
      });
      localStorage.setItem('containers', JSON.stringify(updatedContainers));
      
      // Find the container we just updated and save it to its specific storage too
      const updatedContainer = updatedContainers.find((c: QatarContainer) => c.id === containerId);
      if (updatedContainer) {
        localStorage.setItem(`container_${containerId}`, JSON.stringify(updatedContainer));
        console.log("Updated container data saved to container-specific storage:", updatedContainer);
      }
      
      // Proceed to manifest
      onLoadComplete();
      
      toast.success("Container loading complete", {
        description: `Added ${cargoItems.length} cargo items to container`
      });
    } catch (error) {
      console.error("Error saving cargo items:", error);
      toast.error("Error saving cargo items", {
        description: "Please try again"
      });
    }
  };

  return {
    cargoItems,
    activeTab,
    setActiveTab,
    scanning,
    toggleScanning,
    handleAddCargo,
    handleRemoveCargo,
    handleLoadComplete
  };
};
