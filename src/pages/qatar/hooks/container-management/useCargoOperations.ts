
import { useState, useEffect } from "react";
import { QatarContainer, ContainerCargo } from "../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { mockCargoItems } from "../../data/mockContainers";

export const useCargoOperations = (
  containers: QatarContainer[],
  setContainers: React.Dispatch<React.SetStateAction<QatarContainer[]>>,
  saveContainersToLocalStorage: () => void
) => {
  // In-memory cargo items state
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>(mockCargoItems);
  
  // Load cargo items from localStorage when component mounts
  useEffect(() => {
    try {
      const savedCargoItems = localStorage.getItem('cargoItems');
      if (savedCargoItems) {
        setCargoItems(JSON.parse(savedCargoItems));
      }
    } catch (error) {
      console.error("Error loading cargo items from localStorage:", error);
    }
  }, []);
  
  const saveCargoItemsToLocalStorage = () => {
    try {
      localStorage.setItem('cargoItems', JSON.stringify(cargoItems));
    } catch (error) {
      console.error("Error saving cargo items to localStorage:", error);
    }
  };
  
  // Add a new cargo item to a container
  const handleAddCargo = (cargo: ContainerCargo) => {
    // If cargo doesn't have an ID, generate one
    if (!cargo.id) {
      cargo.id = uuidv4();
    }
    
    // Update the cargo items array
    const updatedCargoItems = [...cargoItems, cargo];
    setCargoItems(updatedCargoItems);
    
    // Update the container's package count, volume, and weight
    const containerIndex = containers.findIndex(c => c.id === cargo.containerId);
    if (containerIndex >= 0) {
      const container = containers[containerIndex];
      const containerCargoItems = updatedCargoItems.filter(item => item.containerId === container.id);
      
      const updatedContainer = {
        ...container,
        packages: containerCargoItems.length,
        volume: containerCargoItems.reduce((sum, item) => sum + (item.volume || 0), 0),
        weight: containerCargoItems.reduce((sum, item) => sum + (item.weight || 0), 0)
      };
      
      const updatedContainers = [...containers];
      updatedContainers[containerIndex] = updatedContainer;
      setContainers(updatedContainers);
      
      // Save changes to localStorage
      saveContainersToLocalStorage();
    }
    
    // Save cargo items to localStorage
    saveCargoItemsToLocalStorage();
    
    return cargo;
  };
  
  // Get cargo items for a specific container
  const getCurrentCargoItems = (containerId: string | null): ContainerCargo[] => {
    if (!containerId) return [];
    
    // Load from localStorage first if present
    try {
      const savedCargoItems = localStorage.getItem(`cargoItems_${containerId}`);
      if (savedCargoItems) {
        return JSON.parse(savedCargoItems);
      }
    } catch (error) {
      console.error("Error loading specific container cargo items:", error);
    }
    
    // Fall back to in-memory items
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
