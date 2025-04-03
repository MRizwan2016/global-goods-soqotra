
import { useState, useEffect } from "react";
import { ContainerCargo, QatarContainer } from "../../types/containerTypes";
import { toast } from "sonner";
import { mockCargoItems } from "../../data/mockContainers";

export const useCargoOperations = (
  containers: QatarContainer[], 
  setContainers: React.Dispatch<React.SetStateAction<QatarContainer[]>>,
  saveContainersToLocalStorage: (containers: QatarContainer[]) => void
) => {
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>(mockCargoItems);

  // Load cargo items from localStorage
  useEffect(() => {
    try {
      const savedCargoItems = localStorage.getItem('cargoItems');
      if (savedCargoItems) {
        const parsedCargoItems = JSON.parse(savedCargoItems);
        if (Array.isArray(parsedCargoItems)) {
          setCargoItems(parsedCargoItems);
        }
      }
    } catch (error) {
      console.error("Error loading cargo items:", error);
    }
  }, []);

  const saveCargoItemsToLocalStorage = (cargoItemsData: ContainerCargo[]) => {
    try {
      localStorage.setItem('cargoItems', JSON.stringify(cargoItemsData));
    } catch (error) {
      console.error("Error saving cargo items to localStorage:", error);
    }
  };

  const handleAddCargo = (cargo: ContainerCargo) => {
    // Check if this cargo is already in the container
    const existingCargoItems = cargoItems.filter(item => item.containerId === cargo.containerId);
    const isDuplicate = existingCargoItems.some(item => 
      item.invoiceNumber === cargo.invoiceNumber && 
      item.barcode === cargo.barcode
    );
    
    if (isDuplicate) {
      toast.error("This package is already loaded in the container", {
        position: "top-center"
      });
      return;
    }
    
    // Add cargo to the list
    const updatedCargoItems = [...cargoItems, cargo];
    setCargoItems(updatedCargoItems);
    saveCargoItemsToLocalStorage(updatedCargoItems);
    
    // Update container stats
    const containerId = cargo.containerId;
    const updatedContainers = containers.map(container => {
      if (container.id === containerId) {
        return {
          ...container,
          packages: (container.packages || 0) + 1,
          weight: (container.weight || 0) + cargo.weight,
          volume: (container.volume || 0) + cargo.volume,
          status: "LOADED" // Update status when cargo is added
        };
      }
      return container;
    });
    
    setContainers(updatedContainers);
    saveContainersToLocalStorage(updatedContainers);
    
    toast.success("Cargo item added to container", {
      description: `${cargo.packageName} from invoice ${cargo.invoiceNumber} added`,
      position: "top-center",
      className: "animate-slide-in-right"
    });
  };

  const getCurrentCargoItems = (containerId: string | null) => {
    if (!containerId) return [];
    return cargoItems.filter(item => item.containerId === containerId);
  };

  return {
    cargoItems,
    setCargoItems,
    handleAddCargo,
    getCurrentCargoItems,
    saveCargoItemsToLocalStorage
  };
};
