
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  QatarContainer,
  ContainerCargo,
} from "../../types/containerTypes";
import mockContainers, { mockCargoItems } from "../../data/mockContainers";

export const useContainerData = (containerId: string) => {
  const [container, setContainer] = useState<QatarContainer | null>(null);
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [confirmDate, setConfirmDate] = useState("");
  const [vgmWeight, setVgmWeight] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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

  return {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    isLoading,
    error
  };
};
