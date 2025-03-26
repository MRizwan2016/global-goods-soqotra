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

export const DEFAULT_PORT_OF_LOADING = "DOHA PORT, QATAR";

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
export const generateRunningNumber = (existingNumbers: string[]): string => {
  // Extract and find the highest numeric part from existing running numbers
  let highestNumber = 0;
  
  existingNumbers.forEach(num => {
    // Extract numeric part of the running number
    const numericPart = parseInt(num.replace(/\D/g, ''));
    if (!isNaN(numericPart) && numericPart > highestNumber) {
      highestNumber = numericPart;
    }
  });
  
  // Generate new running number
  const newNumber = highestNumber + 1;
  
  // Format with leading zeros to keep 3 digits
  return `V${String(newNumber).padStart(3, '0')}`;
};
