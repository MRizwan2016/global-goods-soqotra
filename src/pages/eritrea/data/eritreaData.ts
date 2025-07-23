// Eritrea-specific data based on the requirements screenshot

export const eritreaPorts = [
  { value: "MUSSAMWA", label: "MUSSAMWA" },
  { value: "ASSAB", label: "ASSAB" }
];

export const eritreaSectors = [
  { value: "KASSALA", label: "KASSALA", port: "MUSSAMWA" },
  { value: "GIRBA", label: "GIRBA", port: "MUSSAMWA" },
  { value: "SHUWAIKH", label: "SHUWAIKH", port: "MUSSAMWA" },
  { value: "ALZEER", label: "ALZEER", port: "MUSSAMWA" },
  { value: "UM_SHAJARA", label: "UM SHAJARA", port: "MUSSAMWA" },
  { value: "AL_GADHAREEF", label: "AL GADHAREEF", port: "MUSSAMWA" },
  { value: "ALFA_JADEEDHA", label: "ALFA JADEEDHA", port: "MUSSAMWA" },
  { value: "AL_MADEENAH", label: "AL MADEENAH", port: "MUSSAMWA" },
  { value: "GARGOOR", label: "GARGOOR", port: "MUSSAMWA" },
  { value: "KARKOORA", label: "KARKOORA", port: "MUSSAMWA" },
  { value: "ATHBARA", label: "ATHBARA", port: "MUSSAMWA" },
  { value: "SHANDEE", label: "SHANDEE", port: "MUSSAMWA" },
  { value: "DUNGULAR", label: "DUNGULAR", port: "MUSSAMWA" },
  { value: "AL_DAMAL", label: "AL DAMAL", port: "MUSSAMWA" },
  { value: "MARWI", label: "MARWI", port: "MUSSAMWA" }
];

export const eritreaSalesReps = [
  { value: "MR_SALEH", label: "MR. SALEH" },
  { value: "MR_YOUSUF", label: "MR. YOUSUF" },
  { value: "MR_ABDUL_QADAR", label: "MR. ABDUL QADAR" }
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

// Door-to-door pricing based on sectors (from screenshot)
export const doorToDoorPricing = {
  // QAR 10.00 sectors
  KASSALA: { price: 10.00, currency: "QAR" },
  GIRBA: { price: 10.00, currency: "QAR" },
  SHUWAIKH: { price: 10.00, currency: "QAR" },
  ALZEER: { price: 10.00, currency: "QAR" },
  UM_SHAJARA: { price: 10.00, currency: "QAR" },
  AL_GADHAREEF: { price: 10.00, currency: "QAR" },
  
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