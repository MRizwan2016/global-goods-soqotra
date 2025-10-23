// Eritrea-specific data based on the requirements screenshot

export const eritreaPorts = [
  { value: "MUSSAMWA", label: "MUSSAMWA" },
  { value: "ASSAB", label: "ASSAB" }
];

export const eritreaSectors = [
  { value: "central", label: "Central Region", port: "MASSAWA", region: "Central" },
  { value: "anseba", label: "Anseba Region", port: "MASSAWA", region: "Anseba" },
  { value: "gash-barka", label: "Gash-Barka", port: "MASSAWA", region: "Gash-Barka" },
  { value: "southern", label: "Southern Region", port: "MASSAWA", region: "Southern" },
  { value: "northern-red-sea", label: "Northern Red Sea", port: "MASSAWA", region: "Northern Red Sea" },
  { value: "southern-red-sea", label: "Southern Red Sea", port: "ASAB", region: "Southern Red Sea" }
];

// Sector to cities mapping based on the provided table
export const sectorCitiesMapping = {
  "central": ["ASMARA", "KEREN"],
  "anseba": ["HAMALMALO", "HAGAT"],
  "gash-barka": ["AGORDAT", "BARENTU", "TESSENEI"],
  "southern": ["DEKENHARE", "MENDEFERA", "ADI KEY", "SANAFE"],
  "northern-red-sea": ["MASSAWA", "GINDAA", "ABFABET", "NAKFA"],
  "southern-red-sea": ["ASAB"]
};

export const eritreaSalesReps = [
  { value: "MR_YOUSUF_MOHAMED_IBRAHIM", label: "MR. YOUSUF MOHAMED IBRAHIM" },
  { value: "MR_SALEH_MOHAMED_IBRAHIM", label: "MR. SALEH MOHAMED IBRAHIM" }
];

export const eritreaDrivers = [
  { value: "MR_JOHNY", label: "MR. JOHNY" },
  { value: "MR_SALIH", label: "MR. SALIH" },
  { value: "MR_IDRIES_KARAR", label: "MR. IDRIES KARAR" },
  { value: "MR_BAKHEETH", label: "MR. BAKHEETH" }
];

export const eritreaDistricts = [
  { value: "SUBZOBAS", label: "SUBZOBAS" },
  { value: "MAEKEL_CENTRAL", label: "MAEKEL (CENTRAL)" },
  { value: "DEBUB_SOUTHERN", label: "DEBUB (SOUTHERN)" },
  { value: "GASH_BARKA_N_REDSEA", label: "GASH-BARKA (N. REDSEA)" },
  { value: "ANSEBA_N_REDSEA", label: "ANSEBA (N. REDSEA)" },
  { value: "SEMENAWI_KEYIH_BAHRI_N_REDSEA", label: "SEMENAWI KEYIH BAHRI (N. REDSEA)" },
  { value: "DEBUBAWI_N_REDSEA", label: "DEBUBAWI (N. REDSEA)" }
];

// Name prefixes for shipper/consignee
export const namePrefixes = [
  { value: "MR", label: "MR." },
  { value: "MRS", label: "MRS." },
  { value: "MS", label: "MS." },
  { value: "REV", label: "REV." },
  { value: "SHEIKH", label: "SHEIKH" },
  { value: "DR", label: "DR." },
  { value: "PROFESSOR", label: "PROFESSOR" }
];

// Qatar cities as requested
export const qatarCities = [
  "AL HILAL", "NAJMA", "WUKAIR", "ABU NAKLA", "MANSOORA", "AZIZIA", "AL WAAB", 
  "BAAYA", "MUAITHAR", "WAKRA", "DAFFNA", "WEST BAY", "MADEENA KHALEEFA", 
  "AIN KHALITH", "NASARIYA", "SHAHANIYA", "SALWA ROAD", "BANI HAJAR", 
  "NEW SALATHA", "AL SAAD", "MUSHERIEB", "INDUSTRIAL AREA", "RAS LAFFAN", 
  "AL KEESHA", "MATHAR AL QADEEM", "MUNTAZA", "AL KHOR", "KARATHIYATH", 
  "GARAFA", "EDUCATIONAL CITY", "ABU SAMRA", "AL ASIRI", "AL HITMI", 
  "AL JABAR", "UMM SALAAL ALI", "UMM SALAAL MOHAMED", "AL DHAKIRA", 
  "AL JUMAILIYAH", "AL KARRARA", "AL MESSILA", "AL MIRQAB", "AL REYYAN", 
  "AL RUWAIS", "ABU SIDRA", "AL WAJBA", "BARWA CITY", "BIN OMRAN", 
  "BARWA VILLAGE", "ASIAN CITY", "BU SIDRA", "AL NASAR STREET"
];

// Destination countries
export const destinationCountries = [
  "ERITREA", "SUDAN", "KENYA", "SRI LANKA", "PHILIPPINES", "SAUDI ARABIA", 
  "QATAR", "UAE", "OMAN", "KUWAIT", "UGANDA", "BURUNDI", "TANZANIA", 
  "MOZAMBIQUE", "TUNISIA", "ALGERIA", "LIBYA", "MOROCCO", "JORDAN"
];

// Eritrea cities for consignee/shipper destination
export const eritreaCities = [
  "ASMARA", "MENDEFERA", "MASSAWA", "DEKEMHARE", "BARENTU", 
  "ADI KEYH", "IDI", "ASSAB", "AKORDAT", "KEREN"
];

// Saudi Arabia cities (Riyadh districts) for consignee/shipper destination
export const saudiCities = [
  "ISHBILIYAH", "AL IZDIHAR", "AL ISKAN", "AL ANDALUS", "AL BUJAIRI", "AL BADIAH", 
  "AT TAAWUN", "AL JAZIRAH", "AL JANADRIYAH", "AL HAZM", "AL HAMARA", "AL KHALIDEYA", 
  "AL KHUZAMA", "AL KHALEEJ", "AD DAR AL BAIDA", "AL DARIYAH", "AD DIRAH", "AR RAID", 
  "AL RABWAH", "AR RABI", "AL RAHMANYAH", "AR RAFIAH", "AR RIMAL", "AL RAWABI", 
  "AL RAWDAH", "AR RAYYAN", "AL ZAHRA", "AS SAADAH", "AL SAFARAT", "AS SALAM", 
  "AS SULAY", "AL SULIMANIYYAH", "AS SUWAIDI", "AS SUWAIDI AL GHARABI", "AL SHARAFEYYAH", 
  "ASH SHIFA", "ASH SHIMAISI", "ASH SHUHADA", "AS SALHIYAH", "AS SAHAFAH", "AL SAFA", 
  "AS SINAIYAH", "AD DHUBBAT", "AL URAIJA AL GHARBIYAH", "AL URAIJA AL WUSTA", 
  "AL AZIZIYZH", "AL AQIQ", "AL OLAYA", "AL AWALI", "AL GHADIR", "AL FARUQ", 
  "AL FALAH", "AL FAYHA", "AL FAISALIYAH", "AL QADISIYAH", "AL QUDS", "AL MUTAMARAT", 
  "AL MUHAMADIYYAH", "AL MURABBA", "AL MURSALAT", "AL MARWAH", "AL MURUJ", "AL MISHAL", 
  "AL MASANI", "AL MASIF", "AL MAATHER", "AL MAATHER ASH SHAMALI", "AL MAIZILAH", 
  "AL MUGHRIZAT", "AL MALAZ", "AL MALQA", "KING ABDULAZIZ", "KING ABDULLAH", 
  "KING FAHD", "KING FAISAL", "AL MANAKH", "AL MANAR", "AL MANSOURAH", "AL MUNSIYAH", 
  "AN NAKHIL", "AN NADA", "AN NARJIS", "AL NUZHA", "AN NASIM ASH SHARQI", 
  "AN NASIM AL GHARBI", "AN NADHIM", "AN NAFAL", "AN NAMUDHAJIYAH", "AL NAHDAH", 
  "AL HADA", "AL WAHAH", "AL WADI", "AL WOROUD", "AL WIZARAT", "AL WISHAM", 
  "AL YASMIN", "AL YARMUK", "AL YAMAMAH", "UMM AL HAMAM AL SHARQI", "UMM AL HAMAM AL GHARBI", 
  "UMM SALIM", "JARIR", "HITTIN", "SULTANAH", "SHUBRA", "SALAH AD DIN", "TUWAIQ", 
  "DHAHRAT LABAN", "UTAIQAH", "IRQAH", "ULAISHAH", "GHUBAIRAH", "GHIRNATAH", 
  "QURTUBAH", "MANFUHAH", "NAMAR"
];

// Country codes for mobile numbers
export const countryCodes = {
  "QATAR": "+974",
  "ERITREA": "+291",
  "SUDAN": "+249",
  "KENYA": "+254",
  "SRI LANKA": "+94",
  "PHILIPPINES": "+63",
  "SAUDI ARABIA": "+966",
  "UAE": "+971",
  "OMAN": "+968",
  "KUWAIT": "+965",
  "UGANDA": "+256",
  "BURUNDI": "+257",
  "TANZANIA": "+255",
  "MOZAMBIQUE": "+258",
  "TUNISIA": "+216",
  "ALGERIA": "+213",
  "LIBYA": "+218",
  "MOROCCO": "+212",
  "JORDAN": "+962"
};

// Updated Eritrea Sector Pricing with final door-to-door prices
export const eritreaSectorPricing = {
  "central": {
    cities: {
      "ASMARA": { freightPerKg: 11, doorToDoor: { available: true, charge: 4 } },
      "KEREN": { freightPerKg: 11, doorToDoor: { available: true, charge: 4 } }
    }
  },
  "anseba": {
    cities: {
      "HAMELMALO": { freightPerKg: 0, doorToDoor: { available: true, charge: 4 } },
      "HAGAT": { freightPerKg: 11, doorToDoor: { available: true, charge: 5 } }
    }
  },
  "gash-barka": {
    cities: {
      "AGORDAT": { freightPerKg: 11, doorToDoor: { available: true, charge: 5 } },
      "BARENTU": { freightPerKg: 11, doorToDoor: { available: true, charge: 6 } },
      "TESSENEI": { freightPerKg: 11, doorToDoor: { available: true, charge: 6 } }
    }
  },
  "southern": {
    cities: {
      "DEKEMHARE": { freightPerKg: 11, doorToDoor: { available: true, charge: 4 } },
      "MENDEFERA": { freightPerKg: 11, doorToDoor: { available: true, charge: 4 } },
      "ADI KEYH": { freightPerKg: 0, doorToDoor: { available: true, charge: 6 } },
      "SENAFE": { freightPerKg: 0, doorToDoor: { available: true, charge: 5 } }
    }
  },
  "northern-red-sea": {
    cities: {
      "MASSAWWA": { freightPerKg: 11, doorToDoor: { available: true, charge: 5 } },
      "GINDAA": { freightPerKg: 11, doorToDoor: { available: true, charge: 5 } },
      "AFABET": { freightPerKg: 11, doorToDoor: { available: true, charge: 5 } },
      "NAKFA": { freightPerKg: 11, doorToDoor: { available: true, charge: 6 } }
    }
  },
  "southern-red-sea": {
    cities: {
      "ASAB": { freightPerKg: 0, doorToDoor: { available: true, charge: 6 } }
    }
  }
};

// Dynamic sector management
export const createNewSector = (name: string, freightPerKg: number, doorToDoorAvailable: boolean, doorToDoorCharge: number) => {
  const sectorKey = name.toUpperCase().replace(/\s+/g, '_');
  return {
    value: sectorKey,
    label: name.toUpperCase(),
    port: "MASSAWA",
    pricing: {
      freightPerKg,
      doorToDoor: {
        available: doorToDoorAvailable,
        charge: doorToDoorCharge
      }
    }
  };
};

// Legacy door-to-door pricing (maintained for compatibility)
export const doorToDoorPricing = {
  // QAR 10.00 sectors
  KASSALA: { price: 10.00, currency: "QAR" },
  GIRBA: { price: 10.00, currency: "QAR" },
  SHUWAIKH: { price: 10.00, currency: "QAR" },
  ALZEER: { price: 10.00, currency: "QAR" },
  UM_SHAJARA: { price: 10.00, currency: "QAR" },
  AL_GADHAREEF: { price: 10.00, currency: "QAR" },
  ASMARA: { price: 11.00, currency: "QAR" },
  
  // QAR 26.00 sectors
  ALFA_JADEEDHA: { price: 26.00, currency: "QAR" },
  AL_MADEENAH: { price: 26.00, currency: "QAR" },
  GARGOOR: { price: 26.00, currency: "QAR" },
  KARKOORA: { price: 26.00, currency: "QAR" },
  
  // QAR 12.00 sectors  
  ATHBARA: { price: 12.00, currency: "QAR" },
  SHANDEE: { price: 12.00, currency: "QAR" },
  DUNGULAR: { price: 12.00, currency: "QAR" },
  AL_DAMAL: { price: 12.00, currency: "QAR" },
  MARWI: { price: 12.00, currency: "QAR" }
};

// Package details from screenshot
export const eritreaPackageTypes = [
  {
    name: "DRUM - BIG",
    dimensions: { length: 23, width: 23, height: 36 },
    volume: 0.319
  },
  {
    name: "BARREL",
    dimensions: { length: 30, width: 25, height: 25 },
    volume: 0.315
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 20, width: 20, height: 20 },
    volume: 0.134
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 19, width: 19, height: 29 },
    volume: 0.176
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 24, width: 24, height: 30 },
    volume: 0.290
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 24, width: 24, height: 24 },
    volume: 0.232
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 30, width: 30, height: 30 },
    volume: 0.453
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 14, width: 14, height: 14 },
    volume: 0.048
  },
  {
    name: "CARTON BOX",
    dimensions: { length: 24, width: 24, height: 26 },
    volume: 0.240
  },
  {
    name: "TRAVELLING BAGS",
    dimensions: { length: 31, width: 21, height: 13 },
    volume: 0.142
  },
  {
    name: "TRAVELLING BAGS",
    dimensions: { length: 34, width: 20, height: 16 },
    volume: 0.192
  },
  {
    name: "TRAVELLING BAGS",
    dimensions: { length: 32, width: 13, height: 20 },
    volume: 0.140
  },
  {
    name: "TRAVELLING BAGS",
    dimensions: { length: 35, width: 20, height: 12 },
    volume: 0.141
  },
  {
    name: "TRAVELLING BAGS",
    dimensions: { length: 26, width: 14, height: 15 },
    volume: 0.092
  },
  {
    name: "DUVET",
    dimensions: { length: 23, width: 18, height: 11 },
    volume: 0.076
  },
  {
    name: "WASHING MACHINE",
    dimensions: { length: 41, width: 36, height: 22 },
    volume: 0.545
  },
  {
    name: "BED (MEDICAL BED)",
    dimensions: { length: 198, width: 28, height: 104 }, // 78x11x41 inches converted to cm
    volume: 0.576, // 198 x 28 x 104 cm = 0.576 m³
    weight: 54.90 // Weight in kg
  }
];

// Calculate volume weight (industry standard: 1 cubic meter = 167 kg)
export const calculateVolumeWeight = (length: number, width: number, height: number): number => {
  const volumeInCubicMeters = (length * width * height) / 1000000; // Convert cm³ to m³
  return volumeInCubicMeters * 167; // Volume weight in kg
};

// Calculate cubic feet from cubic meters
export const calculateCubicFeet = (cubicMeters: number): number => {
  return cubicMeters * 35.3147; // 1 m³ = 35.3147 ft³
};