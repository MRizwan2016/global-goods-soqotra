
// Warehouse options by country
export const warehouseOptions: Record<string, string[]> = {
  "Kenya": ["Nairobi CFS", "Mombasa CFS"],
  "Sri Lanka": ["Colombo Warehouse"],
  "Philippines": ["Manila Warehouse"],
  "Saudi Arabia": ["Riyadh Warehouse", "Dammam Warehouse"],
  "United Arab Emirates": ["Dubai Warehouse", "Jabel Ali Warehouse", "Sharjah Warehouse"],
  "Eritrea": ["Asmara Warehouse"],
  "Sudan": ["Khartoum Warehouse"],
  "Tunisia": ["Tunis Warehouse"],
  "Uganda": ["Kampala Warehouse"],
  "Kuwait": ["Kuwait Warehouse"],
  "Oman": ["Muscat Warehouse", "Sohar Warehouse", "Salalah Warehouse"],
  "Qatar": ["Doha Warehouse"]
};

// City options by country
export const cityOptions: Record<string, string[]> = {
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle"],
  "Philippines": ["Manila", "Cebu", "Davao"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Jabel Ali"],
  "Eritrea": ["Asmara", "Keren", "Massawa"],
  "Sudan": ["Khartoum", "Omdurman", "Port Sudan"],
  "Tunisia": ["Tunis", "Sfax", "Sousse"],
  "Uganda": ["Kampala", "Entebbe", "Jinja"],
  "Kuwait": ["Kuwait City", "Hawalli", "Salmiya"],
  "Oman": ["Muscat", "Salalah", "Sohar"],
  "Qatar": ["Doha", "Al Wakrah", "Al Khor", "Al Rayyan", "Al Saad"]
};

// Default country and city
export const DEFAULT_COUNTRY = "Kenya";
export const DEFAULT_WAREHOUSE = "Nairobi CFS";

// Specific Kenya pricing constants
export const KENYA_PRICING = {
  "Mombasa CFS": 14, // QAR per kg
  "Nairobi CFS": 15  // QAR per kg
};
