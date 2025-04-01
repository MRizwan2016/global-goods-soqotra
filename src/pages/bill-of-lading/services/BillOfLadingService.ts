
import { mockBLData } from "../components/mockData";

export interface BillOfLading {
  id: string;
  blNumber: string;
  date: string;
  shipper: string;
  shipperAddress?: string;
  consignee: string;
  consigneeAddress?: string;
  notifyParty?: string;
  notifyPartyAddress?: string;
  deliveryAgent?: string;
  origin: string;
  destination: string;
  cargoType: string;
  vessel: string;
  voyageNo?: string;
  loadingPort?: string;
  dischargePort?: string;
  grossWeight?: string;
  netWeight?: string;
  measurement?: string;
  packages?: string;
  marksAndNumbers?: string;
  goodsDescription?: string;
  containerNo?: string;
  sealNo?: string;
  status: string;
  shippingMarks?: string;
  freightCharges?: string;
  placeOfIssue?: string;
  dateOfIssue?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  chassisNumber?: string;
  specialInstructions?: string;
}

const STORAGE_KEY = 'bill_of_lading_data';

// Function to get all Bills of Lading (from localStorage if available, or fallback to mock data)
export const getBillOfLadingData = (): BillOfLading[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : mockBLData;
    }
    // If no stored data, save the mock data to localStorage for future use
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBLData));
    return mockBLData;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return mockBLData;
  }
};

// Function to save a Bill of Lading (new or updated)
export const saveBillOfLading = (blData: BillOfLading): BillOfLading => {
  try {
    const allBLs = getBillOfLadingData();
    
    // Check if this is an update to an existing record
    const existingIndex = allBLs.findIndex(bl => bl.id === blData.id);
    
    if (existingIndex >= 0) {
      // Update existing record
      allBLs[existingIndex] = { ...allBLs[existingIndex], ...blData };
    } else {
      // Add new record with a new ID if not provided
      const newBL = {
        ...blData,
        id: blData.id || `bl-${Date.now()}`
      };
      allBLs.push(newBL);
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allBLs));
    
    // Return the saved/updated record
    return existingIndex >= 0 ? allBLs[existingIndex] : allBLs[allBLs.length - 1];
  } catch (error) {
    console.error("Error saving Bill of Lading:", error);
    throw new Error("Failed to save Bill of Lading");
  }
};

// Function to get a single Bill of Lading by ID
export const getBillOfLadingById = (id: string): BillOfLading | undefined => {
  const allBLs = getBillOfLadingData();
  return allBLs.find(bl => bl.id === id);
};

// Function to delete a Bill of Lading
export const deleteBillOfLading = (id: string): boolean => {
  try {
    const allBLs = getBillOfLadingData();
    const updatedBLs = allBLs.filter(bl => bl.id !== id);
    
    if (updatedBLs.length < allBLs.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBLs));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting Bill of Lading:", error);
    return false;
  }
};

export const filterBillOfLadingData = (
  data: BillOfLading[],
  searchText: string,
  origin: string,
  destination: string,
  cargoType: string,
  status: string
): BillOfLading[] => {
  return data.filter(
    (item) =>
      (searchText === "" || 
        item.blNumber.toLowerCase().includes(searchText.toLowerCase()) || 
        item.shipper.toLowerCase().includes(searchText.toLowerCase()) || 
        item.consignee.toLowerCase().includes(searchText.toLowerCase())) &&
      (origin === "ALL" || item.origin === origin) &&
      (destination === "ALL" || item.destination === destination) &&
      (cargoType === "ALL" || item.cargoType === cargoType) &&
      (status === "ALL" || item.status === status)
  );
};

export const paginateBillOfLadingData = (
  data: BillOfLading[],
  currentPage: number,
  entriesPerPage: number
): BillOfLading[] => {
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  return data.slice(indexOfFirstEntry, indexOfLastEntry);
};
