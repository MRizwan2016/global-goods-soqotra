
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  QatarContainer,
  ContainerCargo,
  ItemListEntry,
  ConsigneeListItem, 
  UnsettledInvoice,
  PrintOptions
} from "../types/containerTypes";
import mockContainers, { mockCargoItems } from "../data/mockContainers";

const useContainerManifest = (containerId: string, onManifestSubmitted: () => void) => {
  const [container, setContainer] = useState<QatarContainer | null>(null);
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [confirmDate, setConfirmDate] = useState("");
  const [vgmWeight, setVgmWeight] = useState("");
  const [activeTab, setActiveTab] = useState("cargo");
  const [printViewVisible, setPrintViewVisible] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    section: "all" as "all" | "cargo" | "items" | "consignees" | "invoices",
    orientation: "portrait" as "portrait" | "landscape"
  });
  
  // Load container data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Find container by ID
      const foundContainer = mockContainers.find(c => c.id === containerId);
      
      if (foundContainer) {
        setContainer(foundContainer);
        setVgmWeight(foundContainer.weight?.toString() || "0");
        
        // Get cargo items for this container by container ID OR by running number
        const containerCargoItems = mockCargoItems.filter(item => 
          item.containerId === containerId || 
          (foundContainer.runningNumber && item.containerId === foundContainer.runningNumber.toString())
        );
        
        setCargoItems(containerCargoItems);
      } else {
        setError("Container not found");
        toast.error("Container not found");
      }
      
      // Set confirm date to today
      setConfirmDate(new Date().toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"}));
    } catch (err) {
      console.error("Error loading container data:", err);
      setError("Failed to load container data");
      toast.error("Failed to load container data");
    } finally {
      setIsLoading(false);
    }
  }, [containerId]);
  
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
  
  const handleConfirm = () => {
    if (!confirmDate) {
      toast.error("PLEASE ENTER A CONFIRMATION DATE");
      return;
    }
    
    if (!container) {
      toast.error("CONTAINER DATA NOT FOUND");
      return;
    }
    
    // Update container status
    try {
      // Find the container in the mockContainers array
      const containerIndex = mockContainers.findIndex(c => c.id === container.id);
      if (containerIndex >= 0) {
        mockContainers[containerIndex].status = "CONFIRMED";
        mockContainers[containerIndex].confirmDate = confirmDate;
        // In a real app, we would save to the backend
      }
      
      // Notify parent of successful submission
      onManifestSubmitted();
      
      toast.success("CONTAINER MANIFEST CONFIRMED SUCCESSFULLY", {
        action: {
          label: "VIEW MANIFEST",
          onClick: () => {
            // This will be handled in the parent component
            const event = new CustomEvent('viewContainerManifest', { 
              detail: { containerId } 
            });
            document.dispatchEvent(event);
          }
        }
      });
    } catch (err) {
      console.error("Error confirming manifest:", err);
      toast.error("FAILED TO CONFIRM MANIFEST");
    }
  };

  const handlePrint = () => {
    // Set printing state to prevent multiple clicks
    if (isPrinting) return;
    
    setIsPrinting(true);
    setPrintViewVisible(true);
    
    // Allow time for the print view to fully render before printing
    setTimeout(() => {
      // Apply print-specific body class
      document.body.classList.add('print-only-manifest');
      
      // Print after a short delay
      setTimeout(() => {
        window.print();
        
        // Reset after printing with a delay to ensure printing completes
        setTimeout(() => {
          document.body.classList.remove('print-only-manifest');
          setPrintViewVisible(false);
          setIsPrinting(false);
        }, 1000);
      }, 500);
    }, 800); // Increased delay before printing
  };
  
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);
  
  // Calculate totals
  const totalVolume = cargoItems.reduce((sum, item) => sum + item.volume, 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + item.weight, 0);
  const totalPackages = cargoItems.length;

  return {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    activeTab,
    setActiveTab,
    printViewVisible,
    setPrintViewVisible,
    isPrinting,
    printOptions,
    setPrintOptions,
    isLoading,
    error,
    totalPackages,
    totalVolume,
    totalWeight,
    itemList,
    consigneeList,
    unsettledInvoices,
    formatVolume,
    formatWeight,
    handleConfirm,
    handlePrint
  };
};

export default useContainerManifest;
