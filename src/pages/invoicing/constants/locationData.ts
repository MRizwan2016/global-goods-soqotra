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
  "Qatar": ["Doha Warehouse", "Industrial Area Warehouse", "Al Khor Warehouse", "Al Wakra Warehouse"],
  "Tanzania": ["Dar es Salaam Warehouse"],
  "Mozambique": ["Maputo Warehouse"],
  "Somalia": ["Mogadishu Warehouse"],
  "Ethiopia": ["Addis Ababa Warehouse"]
};

// City options by country
export const cityOptions: Record<string, string[]> = {
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle", "Kurunegala"],
  "Philippines": ["Manila", "Cebu", "Davao"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Jabel Ali"],
  "Eritrea": ["Asmara", "Keren", "Massawa", "Kassara"],
  "Sudan": ["Khartoum", "Omdurman", "Port Sudan"],
  "Tunisia": ["Tunis", "Sfax", "Sousse", "La Marsa"],
  "Uganda": ["Kampala", "Entebbe", "Jinja"],
  "Kuwait": ["Kuwait City", "Hawalli", "Salmiya"],
  "Oman": ["Muscat", "Salalah", "Sohar"],
  "Qatar": [
    "Doha", "Al Rayyan", "Al Khor", "Al Saad", "Mansoora", "Najma", 
    "Bin Omran", "Bin Mahmood", "Al Waab", "Industrial Area", 
    "New Industrial Area", "Birkath Al Awamar", "Onaiza", "Doha Jadeed", 
    "Doha City", "Doha Al Jadeed", "Um Salaal Ali", "Um Salaal Mohamed", 
    "West Bay", "Katara", "Daffna", "Barwa Al Barha", "Barwa Madinath", 
    "Wakra", "Wukair", "Baaya", "Muaithar", "Old Al Rayyan", "Sheheliya", 
    "New Sheheliya", "Abu Nakhla", "Makainis", "Ain Khalith", "Bu Sidra", 
    "Abu Hamoor", "Abu Sidra", "Aziziya", "Bani Hajar", "Duhail", 
    "Dukhan", "Education City", "Muntaza", "New Salatha", "Old Salatha", 
    "Moora", "Nuaija", "Al Hitmi", "Um-Gualaina", "Mathar Al Kadeem", 
    "Messaieed", "Nasaraniya", "Madeena Khaleefa", "Garafa", "Jamaliya", 
    "Lakhta", "Asian City", "Labour City"
  ],
  "India": ["Mumbai", "Chennai", "Delhi", "Kolkata"],
  "Singapore": ["Singapore"],
  "Bahrain": ["Manama", "Riffa", "Muharraq"],
  "Tanzania": ["Dar es Salaam", "Arusha", "Dodoma", "Mwanza"],
  "Mozambique": ["Maputo", "Beira", "Nampula"],
  "Somalia": ["Mogadishu", "Hargeisa", "Kismayo"],
  "Ethiopia": ["Addis Ababa", "Dire Dawa", "Mekelle"]
};

// Country codes for phone numbers
export const COUNTRY_CODES: Record<string, string> = {
  "Kenya": "+254 ",
  "Sri Lanka": "+94 ",
  "Philippines": "+63 ",
  "Saudi Arabia": "+966 ",
  "United Arab Emirates": "+971 ",
  "Eritrea": "+291 ",
  "Sudan": "+249 ",
  "Tunisia": "+216 ",
  "Uganda": "+256 ",
  "Kuwait": "+965 ",
  "Oman": "+968 ",
  "Qatar": "+974 ",
  "India": "+91 ",
  "Singapore": "+65 ",
  "Bahrain": "+973 ",
  "Tanzania": "+255 ",
  "Mozambique": "+258 ",
  "Somalia": "+252 ",
  "Ethiopia": "+251 "
};

// Default country and city
export const DEFAULT_COUNTRY = "Kenya";
export const DEFAULT_WAREHOUSE = "Nairobi CFS";

// Specific Kenya pricing constants
export const KENYA_PRICING = {
  "Mombasa CFS": 14, // QAR per kg
  "Nairobi CFS": 15  // QAR per kg
};

// Qatar Towns list as requested
export const qatarTowns: string[] = [
  "Doha",
  "Al Rayyan", 
  "Wukair", 
  "Wakra", 
  "Al Khor",
  "Al Saad",
  "Mansoora", 
  "Najma", 
  "Madeena Khaleefa", 
  "Garafa", 
  "Bin Omran", 
  "Bin Mahmoud", 
  "Muaithar", 
  "Baaya", 
  "Ain Khalid", 
  "Mathar Al Qadeem", 
  "Al Hilal", 
  "Thumama", 
  "Al Waab", 
  "Um Salaal Ali", 
  "Um Salaal Mohamed", 
  "Zobara", 
  "Shamal", 
  "Fereej Al Sudan", 
  "Al Naasar Street", 
  "West Bay", 
  "Onaiza", 
  "Karana", 
  "Katara", 
  "Industrial Area", 
  "New Industrial Area"
];
