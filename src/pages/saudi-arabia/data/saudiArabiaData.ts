// Saudi Arabia-specific data

export const saudiArabiaPorts = [
  { value: "JEDDAH", label: "JEDDAH" },
  { value: "DAMMAM", label: "DAMMAM" },
  { value: "RIYADH", label: "RIYADH (DRY PORT)" }
];

// 13 Provinces with their main cities
export const saudiProvinces: Record<string, string[]> = {
  "RIYADH - CENTRAL": ["RIYADH"],
  "MAKKAH - MECCA": ["JEDDAH", "MECCA", "TAIF"],
  "MADINAH - MEDINAH": ["MEDINAH", "YANBU"],
  "EASTERN PROVINCE - ASH SHARQIYAH": ["DAMMAM", "AL-KHOBAR", "JUBAIL", "DHAHRAN"],
  "AL-QASSIM": ["BURAIDAH", "UNAIZAH"],
  "ASIR": ["ABHA", "KHAMIS MUSHAIT"],
  "TABUK": ["TABUK"],
  "HA'IL": ["HAIL"],
  "JAWF": ["SAKAKA"],
  "JIZAN": ["JIZAN"],
  "NAJRAN": ["NAJRAN"],
  "BAHRAN": [],
  "BAHAH": ["AL BAHAH"],
  "NORTHERN BORDERS": ["ARAR"],
};

// Flat list of all cities for quick lookup
export const saudiCities = Object.values(saudiProvinces).flat().filter(c => c.length > 0);

// Sectors mapped from provinces
export const saudiArabiaSectors = [
  { value: "RIYADH", label: "RIYADH", port: "RIYADH" },
  { value: "JEDDAH", label: "JEDDAH", port: "JEDDAH" },
  { value: "MECCA", label: "MECCA", port: "JEDDAH" },
  { value: "TAIF", label: "TAIF", port: "JEDDAH" },
  { value: "MEDINAH", label: "MEDINAH", port: "JEDDAH" },
  { value: "YANBU", label: "YANBU", port: "JEDDAH" },
  { value: "DAMMAM", label: "DAMMAM", port: "DAMMAM" },
  { value: "AL-KHOBAR", label: "AL-KHOBAR", port: "DAMMAM" },
  { value: "JUBAIL", label: "JUBAIL", port: "DAMMAM" },
  { value: "DHAHRAN", label: "DHAHRAN", port: "DAMMAM" },
  { value: "BURAIDAH", label: "BURAIDAH", port: "RIYADH" },
  { value: "ABHA", label: "ABHA", port: "JEDDAH" },
  { value: "TABUK", label: "TABUK", port: "JEDDAH" },
  { value: "HAIL", label: "HAIL", port: "RIYADH" },
  { value: "JIZAN", label: "JIZAN", port: "JEDDAH" },
  { value: "NAJRAN", label: "NAJRAN", port: "JEDDAH" },
  { value: "AL BAHAH", label: "AL BAHAH", port: "JEDDAH" },
  { value: "ARAR", label: "ARAR", port: "RIYADH" },
];

export const saudiArabiaDistricts = Object.keys(saudiProvinces).map(p => ({
  value: p.replace(/\s+/g, "_").toUpperCase(),
  label: p,
}));

export const saudiArabiaSalesReps = [
  { value: "MPA_RANATHUNGA", label: "M.P.A.Ranathunga/204" },
  { value: "MR_SAJJAD", label: "MR. SAJJAD" },
  { value: "MR_IMAM", label: "MR. IMAM UBAIDULLA" },
  { value: "MR_LAHIRU", label: "MR. LAHIRU CHATHURANGA" },
];

export const saudiArabiaDrivers = [
  { value: "41067", label: "MR. ASHOKA UDESH (41067)" },
  { value: "41070", label: "MR. KANAYA (41070)" },
  { value: "41073", label: "MR. BAKEETH (41073)" },
  { value: "215004", label: "MR. MOHAMMED NOOR (215004)" },
  { value: "119929", label: "MR. JOHNY VENAKDY (119929)" },
];

export const saudiArabiaVehicles = [
  { value: "41067", label: "41067 - ASHOKA UDESH" },
  { value: "41070", label: "41070 - KANAYA" },
  { value: "41073", label: "41073 - BAKEETH" },
  { value: "215004", label: "215004 - MOHAMMED NOOR" },
  { value: "119929", label: "119929 - JOHNY VENAKDY" },
];

export const saudiVehicleDriverMap: { truck: string; driver: string }[] = [
  { truck: "41067", driver: "MR. ASHOKA UDESH" },
  { truck: "41070", driver: "MR. KANAYA" },
  { truck: "41073", driver: "MR. BAKEETH" },
  { truck: "215004", driver: "MR. MOHAMMED NOOR" },
  { truck: "119929", driver: "MR. JOHNY VENAKDY" },
];

export const getSaudiDriverForVehicle = (truck: string): string | null => {
  const match = saudiVehicleDriverMap.find(v => v.truck === truck);
  return match ? match.driver : null;
};

// Name prefixes for shipper/consignee
export const namePrefixes = [
  { value: "MR", label: "MR." },
  { value: "MRS", label: "MRS." },
  { value: "MS", label: "MS." },
  { value: "REV", label: "REV." },
  { value: "SHEIKH", label: "SHEIKH" },
  { value: "DR", label: "DR." },
  { value: "PROFESSOR", label: "PROFESSOR" },
  { value: "PASTOR", label: "PASTOR" },
];

// Qatar cities
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

// SA Warehouses for destination
export const saudiWarehouses = [
  { value: "JEDDAH", label: "JEDDAH PORT" },
  { value: "DAMMAM", label: "DAMMAM PORT" },
  { value: "RIYADH", label: "RIYADH DRY PORT" },
];

// Country codes for mobile numbers
export const countryCodes: Record<string, string> = {
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

// Door-to-door pricing based on sectors (SAR)
export const doorToDoorPricing: Record<string, { price: number; currency: string }> = {
  RIYADH: { price: 15.00, currency: "SAR" },
  DAMMAM: { price: 15.00, currency: "SAR" },
  "AL-KHOBAR": { price: 15.00, currency: "SAR" },
  JUBAIL: { price: 15.00, currency: "SAR" },
  DHAHRAN: { price: 15.00, currency: "SAR" },
  JEDDAH: { price: 20.00, currency: "SAR" },
  MECCA: { price: 20.00, currency: "SAR" },
  MEDINAH: { price: 20.00, currency: "SAR" },
  YANBU: { price: 20.00, currency: "SAR" },
  TAIF: { price: 20.00, currency: "SAR" },
  TABUK: { price: 25.00, currency: "SAR" },
  ABHA: { price: 25.00, currency: "SAR" },
  JIZAN: { price: 25.00, currency: "SAR" },
  NAJRAN: { price: 25.00, currency: "SAR" },
  HAIL: { price: 25.00, currency: "SAR" },
  BURAIDAH: { price: 25.00, currency: "SAR" },
  ARAR: { price: 30.00, currency: "SAR" },
  "AL BAHAH": { price: 25.00, currency: "SAR" },
};

// Package details
export const saudiArabiaPackageTypes = [
  { name: "CARTON BOX", dimensions: { length: 20, width: 20, height: 20 }, volume: 0.134 },
  { name: "CARTON BOX", dimensions: { length: 24, width: 24, height: 24 }, volume: 0.232 },
  { name: "CARTON BOX", dimensions: { length: 30, width: 30, height: 30 }, volume: 0.453 },
  { name: "TRAVELLING BAGS", dimensions: { length: 22, width: 14, height: 12 }, volume: 0.062 },
  { name: "TRAVELLING BAGS", dimensions: { length: 31, width: 21, height: 13 }, volume: 0.142 },
  { name: "PERSONAL EFFECTS", dimensions: { length: 40, width: 30, height: 25 }, volume: 0.500 },
  { name: "HOUSEHOLD ITEMS", dimensions: { length: 50, width: 40, height: 30 }, volume: 1.000 },
  { name: "ELECTRONIC ITEMS", dimensions: { length: 35, width: 25, height: 20 }, volume: 0.290 }
];

// Calculate volume weight (1 CBM = 167 kg)
export const calculateVolumeWeight = (length: number, width: number, height: number): number => {
  const volumeInCubicMeters = (length * width * height) / 1000000;
  return volumeInCubicMeters * 167;
};

export const calculateCubicFeet = (cubicMeters: number): number => {
  return cubicMeters * 35.3147;
};
