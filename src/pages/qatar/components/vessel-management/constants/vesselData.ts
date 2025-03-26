
// Ports and sectors data for vessel management
export const PORTS = [
  "Doha", "Mombasa", "Nairobi", "Asmara", "Hargeisa", "Port Sudan", 
  "Tunis", "Kampala", "Berbara", "Mogadishu", "Dammam", "Addis Ababa", 
  "Riyadh", "Jeddah", "Dubai", "Sharjah", "Jabel Ali", "Sohar", "HAMAD SEA PORT", "COLOMBO"
];

// Mapping of sectors to their ports of discharge
export const SECTOR_PORT_MAP: {[key: string]: string[]} = {
  "Sri Lanka": ["COLOMBO", "GALLE", "KURUNEGALA"],
  "Kenya": ["Mombasa", "Nairobi", "Kampala"],
  "Uganda": ["Kampala"],
  "Tunisia": ["Tunis"],
  "United Arab Emirates": ["Dubai", "Sharjah", "Jabel Ali"],
  "Saudi Arabia": ["Dammam", "Riyadh", "Jeddah"],
  "Sudan": ["Port Sudan"],
  "Eritrea": ["Asmara"],
  "Oman": ["Sohar"],
  "Qatar": ["Doha", "HAMAD SEA PORT"],
  "Somalia": ["Mogadishu", "Berbara", "Hargeisa"],
  "Ethiopia": ["Addis Ababa"],
  "COLOMBO": ["COLOMBO"],
  "GALLE": ["GALLE"],
  "KURUNEGALA": ["KURUNEGALA"]
};

export const DEFAULT_PORT_OF_LOADING = "HAMAD SEA PORT";

export const SECTORS = [
  "Sri Lanka", "Kenya", "Uganda", "Tunisia", "United Arab Emirates", 
  "Saudi Arabia", "Sudan", "Eritrea", "Oman", "Qatar", "Somalia", "Ethiopia", "COLOMBO", "GALLE", "KURUNEGALA"
];

export const SHIPPING_LINES = [
  { value: "ABUDHABI SHIPPING", label: "ABUDHABI SHIPPING : ADS" },
  { value: "MAERSK LINE", label: "MAERSK LINE : MSK" },
  { value: "MSC", label: "MSC" },
  { value: "CMA CGM", label: "CMA CGM" }
];

// Generate running numbers starting from 100
export const generateRunningNumber = (existingNumbers: string[] = []): string => {
  // Find the highest existing number
  let highestNumber = 99;
  
  existingNumbers.forEach(numStr => {
    const num = parseInt(numStr, 10);
    if (!isNaN(num) && num > highestNumber) {
      highestNumber = num;
    }
  });
  
  // Return the next number
  return (highestNumber + 1).toString();
};
