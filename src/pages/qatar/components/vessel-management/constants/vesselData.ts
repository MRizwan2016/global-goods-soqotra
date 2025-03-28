
export const DEFAULT_PORT_OF_LOADING = "DOHA";

export const SHIPPING_LINES = [
  "MSC",
  "MAERSK",
  "CMA CGM",
  "HAPAG-LLOYD",
  "ONE",
  "EVERGREEN",
  "COSCO",
  "YANG MING",
  "HMM",
  "ZIM"
];

export const VESSEL_STATUSES = [
  "ALL",
  "NEW",
  "SCHEDULED",
  "LOADING",
  "IN_TRANSIT",
  "ARRIVED",
  "DISCHARGED",
  "COMPLETED"
];

export const DIRECTIONS = [
  "IMPORT",
  "EXPORT",
  "MIX"
];

export const SECTORS = [
  "EAST AFRICA",
  "WEST AFRICA",
  "SOUTH ASIA",
  "MIDDLE EAST",
  "EUROPE",
  "FAR EAST",
  "COLOMBO"
];

// Add SECTOR_PORT_MAP that maps sectors to ports
export const SECTOR_PORT_MAP: Record<string, string[]> = {
  "EAST AFRICA": ["MOMBASA", "DAR ES SALAAM", "ZANZIBAR"],
  "WEST AFRICA": ["LAGOS", "TEMA", "DAKAR"],
  "SOUTH ASIA": ["MUMBAI", "CHENNAI", "COLOMBO"],
  "MIDDLE EAST": ["JEDDAH", "DUBAI", "SALALAH"],
  "EUROPE": ["ROTTERDAM", "HAMBURG", "PIRAEUS"],
  "FAR EAST": ["SINGAPORE", "HONG KONG", "SHANGHAI"],
  "COLOMBO": ["COLOMBO"]
};

export const STATUS_COLORS = {
  "NEW": "bg-blue-100 text-blue-800",
  "SCHEDULED": "bg-purple-100 text-purple-800",
  "LOADING": "bg-yellow-100 text-yellow-800",
  "IN_TRANSIT": "bg-green-100 text-green-800",
  "ARRIVED": "bg-lime-100 text-lime-800",
  "DISCHARGED": "bg-indigo-100 text-indigo-800",
  "COMPLETED": "bg-gray-100 text-gray-800"
};

// Generate a running number for vessels
export const generateRunningNumber = (existingNumbers: string[] = []): string => {
  let highestNum = 0;
  
  existingNumbers.forEach(num => {
    if (num && num.startsWith("VSL")) {
      const numericPart = parseInt(num.substring(3));
      if (!isNaN(numericPart) && numericPart > highestNum) {
        highestNum = numericPart;
      }
    }
  });
  
  // Increment and format with leading zeros
  const nextNum = highestNum + 1;
  return `VSL${nextNum.toString().padStart(3, '0')}`;
};
