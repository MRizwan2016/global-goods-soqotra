
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
    
    // Add a slight delay to simulate network request
    const loadTimer = setTimeout(() => {
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
          
          if (containerCargoItems.length === 0) {
            console.warn(`No cargo items found for container ID ${containerId} or running number ${foundContainer.runningNumber}`);
          }
          
          setCargoItems(containerCargoItems);
          
          // Set confirm date to today
          setConfirmDate(new Date().toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"}));
        } else {
          console.error(`Container not found with ID: ${containerId}`);
          setError(`Container with ID ${containerId} not found. Please check the container ID and try again.`);
          toast.error("Container not found", {
            description: "The requested container could not be located in the system.",
            duration: 5000
          });
        }
      } catch (err) {
        console.error("Error loading container data:", err);
        setError("Failed to load container data. Please try again or contact support.");
        toast.error("Failed to load container data", {
          description: "There was an error retrieving the container information.",
          duration: 5000
        });
      } finally {
        setIsLoading(false);
      }
    }, 800); // Added delay to make loading state visible
    
    return () => clearTimeout(loadTimer);
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
