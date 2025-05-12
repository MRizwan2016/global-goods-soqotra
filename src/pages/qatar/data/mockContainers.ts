
import { QatarContainer, ContainerCargo } from "../types/containerTypes";

// This is the updated mockContainers array with no sample containers
const mockContainers: QatarContainer[] = [];

// Add mock cargo items
const mockCargoItems: ContainerCargo[] = [];

// Load from localStorage on module initialization
try {
  const savedContainers = localStorage.getItem('containers');
  if (savedContainers) {
    const parsedContainers = JSON.parse(savedContainers);
    // Only update if the data is valid
    if (Array.isArray(parsedContainers) && parsedContainers.length > 0) {
      // Update mockContainers while preserving the reference
      mockContainers.length = 0;
      parsedContainers.forEach(container => mockContainers.push(container));
    }
  }
} catch (error) {
  console.error("Error loading containers from localStorage:", error);
}

export { mockContainers, mockCargoItems };
export default mockContainers;
