// Saudi Arabia-specific data based on the requirements

export const saudiArabiaPorts = [
  { value: "DAMMAM", label: "DAMMAM" },
  { value: "JEDDAH", label: "JEDDAH" },
  { value: "RIYADH", label: "RIYADH" }
];

export const saudiArabiaSectors = [
  { value: "RIYADH", label: "RIYADH", port: "DAMMAM" },
  { value: "JEDDAH", label: "JEDDAH", port: "JEDDAH" },
  { value: "DAMMAM", label: "DAMMAM", port: "DAMMAM" },
  { value: "KHOBAR", label: "KHOBAR", port: "DAMMAM" },
  { value: "MECCA", label: "MECCA", port: "JEDDAH" },
  { value: "MEDINA", label: "MEDINA", port: "JEDDAH" },
  { value: "TABUK", label: "TABUK", port: "JEDDAH" },
  { value: "ABHA", label: "ABHA", port: "JEDDAH" },
  { value: "JAZAN", label: "JAZAN", port: "JEDDAH" },
  { value: "NAJRAN", label: "NAJRAN", port: "RIYADH" },
  { value: "HAIL", label: "HAIL", port: "RIYADH" },
  { value: "QASSIM", label: "QASSIM", port: "RIYADH" },
  { value: "JUBAIL", label: "JUBAIL", port: "DAMMAM" },
  { value: "YANBU", label: "YANBU", port: "JEDDAH" }
];

export const saudiArabiaSalesReps = [
  { value: "MR_LAHIRU", label: "MR. LAHIRU" },
  { value: "MR_AHMED", label: "MR. AHMED" },
  { value: "MR_MOHAMMAD", label: "MR. MOHAMMAD" }
];

export const saudiArabiaDrivers = [
  { value: "MR_HASSAN", label: "MR. HASSAN" },
  { value: "MR_ABDULLAH", label: "MR. ABDULLAH" },
  { value: "MR_OMAR", label: "MR. OMAR" },
  { value: "MR_KHALID", label: "MR. KHALID" }
];

export const saudiArabiaDistricts = [
  { value: "RIYADH_CENTRAL", label: "RIYADH (CENTRAL)" },
  { value: "EASTERN_PROVINCE", label: "EASTERN PROVINCE" },
  { value: "MAKKAH_REGION", label: "MAKKAH REGION" },
  { value: "ASIR_REGION", label: "ASIR REGION" },
  { value: "JAZAN_REGION", label: "JAZAN REGION" },
  { value: "NAJRAN_REGION", label: "NAJRAN REGION" },
  { value: "HAIL_REGION", label: "HAIL REGION" },
  { value: "NORTHERN_BORDERS", label: "NORTHERN BORDERS" },
  { value: "TABUK_REGION", label: "TABUK REGION" },
  { value: "QASSIM_REGION", label: "QASSIM REGION" },
  { value: "BAHAH_REGION", label: "AL BAHAH REGION" },
  { value: "JOUF_REGION", label: "AL JOUF REGION" },
  { value: "MADINAH_REGION", label: "MADINAH REGION" }
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
  "SAUDI ARABIA", "QATAR", "UAE", "OMAN", "KUWAIT", "BAHRAIN", "YEMEN", 
  "JORDAN", "LEBANON", "SYRIA", "IRAQ", "EGYPT", "SUDAN", "ERITREA", 
  "ETHIOPIA", "KENYA", "UGANDA", "TANZANIA", "INDIA", "PAKISTAN", 
  "BANGLADESH", "SRI LANKA", "PHILIPPINES", "NEPAL"
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
  "SAUDI ARABIA": "+966",
  "UAE": "+971",
  "OMAN": "+968",
  "KUWAIT": "+965",
  "BAHRAIN": "+973",
  "YEMEN": "+967",
  "JORDAN": "+962",
  "LEBANON": "+961",
  "SYRIA": "+963",
  "IRAQ": "+964",
  "EGYPT": "+20",
  "SUDAN": "+249",
  "ERITREA": "+291",
  "ETHIOPIA": "+251",
  "KENYA": "+254",
  "UGANDA": "+256",
  "TANZANIA": "+255",
  "INDIA": "+91",
  "PAKISTAN": "+92",
  "BANGLADESH": "+880",
  "SRI LANKA": "+94",
  "PHILIPPINES": "+63",
  "NEPAL": "+977"
};

// Door-to-door pricing based on sectors
export const doorToDoorPricing = {
  // QAR 15.00 sectors
  RIYADH: { price: 15.00, currency: "QAR" },
  DAMMAM: { price: 15.00, currency: "QAR" },
  KHOBAR: { price: 15.00, currency: "QAR" },
  JUBAIL: { price: 15.00, currency: "QAR" },
  
  // QAR 20.00 sectors
  JEDDAH: { price: 20.00, currency: "QAR" },
  MECCA: { price: 20.00, currency: "QAR" },
  MEDINA: { price: 20.00, currency: "QAR" },
  YANBU: { price: 20.00, currency: "QAR" },
  
  // QAR 25.00 sectors  
  TABUK: { price: 25.00, currency: "QAR" },
  ABHA: { price: 25.00, currency: "QAR" },
  JAZAN: { price: 25.00, currency: "QAR" },
  NAJRAN: { price: 25.00, currency: "QAR" },
  HAIL: { price: 25.00, currency: "QAR" },
  QASSIM: { price: 25.00, currency: "QAR" }
};

// Package details
export const saudiArabiaPackageTypes = [
  {
    name: "CARTON BOX",
    dimensions: { length: 20, width: 20, height: 20 },
    volume: 0.134
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
    name: "TRAVELLING BAGS",
    dimensions: { length: 22, width: 14, height: 12 },
    volume: 0.062
  },
  {
    name: "TRAVELLING BAGS",
    dimensions: { length: 31, width: 21, height: 13 },
    volume: 0.142
  },
  {
    name: "PERSONAL EFFECTS",
    dimensions: { length: 40, width: 30, height: 25 },
    volume: 0.500
  },
  {
    name: "HOUSEHOLD ITEMS",
    dimensions: { length: 50, width: 40, height: 30 },
    volume: 1.000
  },
  {
    name: "ELECTRONIC ITEMS",
    dimensions: { length: 35, width: 25, height: 20 },
    volume: 0.290
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