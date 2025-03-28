
import { Vessel } from "./types/vesselTypes";

export const mockVesselData: Vessel[] = [
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

export const getVesselById = (id: string): Vessel | undefined => {
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
  return true;
};

export default mockVesselData;
