
import { toast } from "sonner";
import { QatarContainer } from "../../types/containerTypes";
import mockContainers from "../../data/mockContainers";

export const useManifestConfirmation = (container: QatarContainer | null, containerId: string, confirmDate: string, onManifestSubmitted: () => void) => {
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
        
        // Save additional data that might be needed for printing
        if (!mockContainers[containerIndex].packages) {
          // Calculate total packages if not already set
          const packages = container.cargoItems?.length || 0;
          mockContainers[containerIndex].packages = packages;
        }
        
        if (!mockContainers[containerIndex].volume) {
          // Calculate total volume if not already set
          const volume = container.cargoItems?.reduce((sum, item) => sum + Number(item.volume), 0) || 0;
          mockContainers[containerIndex].volume = volume;
        }
        
        if (!mockContainers[containerIndex].weight) {
          // Calculate total weight if not already set
          const weight = container.cargoItems?.reduce((sum, item) => sum + Number(item.weight), 0) || 0;
          mockContainers[containerIndex].weight = weight;
        }
        
        // In a real app, we would save to the backend
      }
      
      // Store the containerId in localStorage so we can retrieve it later
      // This ensures the manifest can be viewed after being confirmed
      localStorage.setItem('lastConfirmedContainerId', containerId);
      
      // Also store the confirmed date for reference
      localStorage.setItem(`container_${containerId}_confirmDate`, confirmDate);
      
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

  return {
    handleConfirm
  };
};
