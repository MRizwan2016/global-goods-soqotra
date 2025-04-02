
import { Vessel, QatarVessel } from "./types/vesselTypes";

export const mockVesselData: QatarVessel[] = [
  {
    id: "vessel1",
    runningNumber: "VSL001",
    vesselName: "MSC ATLANTA",
    voyage: "QT2301",
    portOfLoading: "DOHA",
    portOfDischarge: "MOMBASA",
    shippingLine: "MSC",
    status: "ACTIVE",
    direction: "EXPORT",
    masterBL: "MSCU12345678",
    etd: "2023-12-05",
    eta: "2023-12-15",
    sector: "EAST AFRICA",
    containers: ["container2"]
  },
  {
    id: "vessel2",
    runningNumber: "VSL002",
    vesselName: "MAERSK COLUMBUS",
    voyage: "QT2302",
    portOfLoading: "DOHA",
    portOfDischarge: "COLOMBO",
    shippingLine: "MAERSK",
    status: "SCHEDULED",
    direction: "EXPORT",
    masterBL: "MAEU87654321",
    etd: "2023-12-15",
    eta: "2023-12-25",
    sector: "SOUTH ASIA",
    containers: []
  },
  {
    id: "vessel3",
    runningNumber: "VSL003",
    vesselName: "CMA CGM MARCO POLO",
    voyage: "QT2303",
    portOfLoading: "DOHA",
    portOfDischarge: "DUBAI",
    shippingLine: "CMA CGM",
    status: "SCHEDULED",
    direction: "EXPORT",
    masterBL: "CMAU12345678",
    etd: "2023-12-20",
    eta: "2023-12-30",
    sector: "MIDDLE EAST",
    containers: ["387"]
  }
];

export const containerStatusOptions = [
  "PENDING", 
  "LOADING", 
  "LOADED", 
  "IN_TRANSIT", 
  "ARRIVED", 
  "DELIVERED", 
  "RETURNED"
];

export const getVesselById = (id: string): QatarVessel | undefined => {
  return mockVesselData.find(vessel => vessel.id === id);
};

export const getContainersForVessel = (vesselId: string): string[] => {
  const vessel = getVesselById(vesselId);
  return vessel ? vessel.containers : [];
};

export const addContainerToVessel = (vesselId: string, containerId: string): boolean => {
  const vesselIndex = mockVesselData.findIndex(vessel => vessel.id === vesselId);
  if (vesselIndex === -1) return false;
  
  // Add container to vessel if not already added
  if (!mockVesselData[vesselIndex].containers.includes(containerId)) {
    mockVesselData[vesselIndex].containers.push(containerId);
    
    // Update localStorage to persist the change
    try {
      localStorage.setItem('vesselData', JSON.stringify(mockVesselData));
    } catch (error) {
      console.error("Error saving vessel data to localStorage:", error);
    }
    
    return true;
  }
  
  return false;
};

export const removeContainerFromVessel = (vesselId: string, containerId: string): boolean => {
  const vesselIndex = mockVesselData.findIndex(vessel => vessel.id === vesselId);
  if (vesselIndex === -1) return false;
  
  const containerIndex = mockVesselData[vesselIndex].containers.indexOf(containerId);
  if (containerIndex === -1) return false;
  
  mockVesselData[vesselIndex].containers.splice(containerIndex, 1);
  
  // Update localStorage to persist the change
  try {
    localStorage.setItem('vesselData', JSON.stringify(mockVesselData));
  } catch (error) {
    console.error("Error saving vessel data to localStorage:", error);
  }
  
  return true;
};

// Load from localStorage on module initialization
try {
  const savedVesselData = localStorage.getItem('vesselData');
  if (savedVesselData) {
    const parsedData = JSON.parse(savedVesselData);
    // Only update if the data is valid
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      // Update the mockVesselData while preserving the reference
      mockVesselData.length = 0;
      parsedData.forEach(vessel => mockVesselData.push(vessel));
    }
  }
} catch (error) {
  console.error("Error loading vessel data from localStorage:", error);
}

export default mockVesselData;
