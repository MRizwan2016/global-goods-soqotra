// Kenya-specific data

export const kenyaPorts = [
  { value: "MOMBASA", label: "MOMBASA" },
  { value: "NAIROBI_ICD", label: "NAIROBI ICD (DRY PORT)" },
];

// Counties and cities
export const kenyaCounties: Record<string, string[]> = {
  "NAIROBI": ["NAIROBI"],
  "MOMBASA": ["MOMBASA"],
  "KISUMU": ["KISUMU"],
  "NAKURU": ["NAKURU"],
  "ELDORET": ["ELDORET"],
  "THIKA": ["THIKA"],
  "MALINDI": ["MALINDI"],
  "KITALE": ["KITALE"],
  "GARISSA": ["GARISSA"],
  "NYERI": ["NYERI"],
  "MACHAKOS": ["MACHAKOS"],
  "MERU": ["MERU"],
  "LAMU": ["LAMU"],
  "NANYUKI": ["NANYUKI"],
  "NAIVASHA": ["NAIVASHA"],
  "EMBU": ["EMBU"],
  "KAKAMEGA": ["KAKAMEGA"],
  "BUNGOMA": ["BUNGOMA"],
  "KERICHO": ["KERICHO"],
  "NANDI HILLS": ["NANDI HILLS"],
};

export const kenyaCities = Object.values(kenyaCounties).flat().filter(c => c.length > 0);

export const kenyaSectors = [
  { value: "NAIROBI", label: "NAIROBI", port: "NAIROBI_ICD" },
  { value: "MOMBASA", label: "MOMBASA", port: "MOMBASA" },
  { value: "KISUMU", label: "KISUMU", port: "MOMBASA" },
  { value: "NAKURU", label: "NAKURU", port: "NAIROBI_ICD" },
  { value: "ELDORET", label: "ELDORET", port: "MOMBASA" },
  { value: "THIKA", label: "THIKA", port: "NAIROBI_ICD" },
  { value: "MALINDI", label: "MALINDI", port: "MOMBASA" },
  { value: "KITALE", label: "KITALE", port: "MOMBASA" },
  { value: "GARISSA", label: "GARISSA", port: "NAIROBI_ICD" },
  { value: "NYERI", label: "NYERI", port: "NAIROBI_ICD" },
  { value: "MACHAKOS", label: "MACHAKOS", port: "NAIROBI_ICD" },
  { value: "MERU", label: "MERU", port: "NAIROBI_ICD" },
  { value: "LAMU", label: "LAMU", port: "MOMBASA" },
  { value: "NANYUKI", label: "NANYUKI", port: "NAIROBI_ICD" },
  { value: "NAIVASHA", label: "NAIVASHA", port: "NAIROBI_ICD" },
  { value: "KAKAMEGA", label: "KAKAMEGA", port: "MOMBASA" },
];

export const kenyaDistricts = Object.keys(kenyaCounties).map(p => ({
  value: p.replace(/\s+/g, "_").toUpperCase(),
  label: p,
}));

export const kenyaSalesReps = [
  { value: "KENYA_REP_1", label: "MR. HASSAN ALI" },
  { value: "KENYA_REP_2", label: "MR. JAMES MWANGI" },
  { value: "KENYA_REP_3", label: "MRS. FATMA OMAR" },
];

export const kenyaDrivers = [
  { value: "KE001", label: "MR. JOHN KAMAU (KE001)" },
  { value: "KE002", label: "MR. PETER ODHIAMBO (KE002)" },
  { value: "KE003", label: "MR. IBRAHIM MUSA (KE003)" },
];

export const kenyaVehicles = [
  { value: "KE001", label: "KE001 - JOHN KAMAU" },
  { value: "KE002", label: "KE002 - PETER ODHIAMBO" },
  { value: "KE003", label: "KE003 - IBRAHIM MUSA" },
];

export const kenyaVehicleDriverMap: { truck: string; driver: string }[] = [
  { truck: "KE001", driver: "MR. JOHN KAMAU" },
  { truck: "KE002", driver: "MR. PETER ODHIAMBO" },
  { truck: "KE003", driver: "MR. IBRAHIM MUSA" },
];

export const getKenyaDriverForVehicle = (truck: string): string | null => {
  const match = kenyaVehicleDriverMap.find(v => v.truck === truck);
  return match ? match.driver : null;
};

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

export const qatarCities = [
  "AL HILAL", "NAJMA", "WUKAIR", "ABU NAKLA", "MANSOORA", "AZIZIA", "AL WAAB",
  "BAAYA", "MUAITHAR", "WAKRA", "DAFFNA", "WEST BAY", "MADEENA KHALEEFA",
  "AIN KHALITH", "NASARIYA", "SHAHANIYA", "SALWA ROAD", "BANI HAJAR",
  "NEW SALATHA", "AL SAAD", "MUSHERIEB", "INDUSTRIAL AREA", "RAS LAFFAN",
  "AL KEESHA", "MATHAR AL QADEEM", "MUNTAZA", "AL KHOR", "KARATHIYATH",
  "GARAFA", "EDUCATIONAL CITY", "ABU SAMRA", "AL ASIRI"
];

export const destinationCountries = [
  "KENYA", "QATAR", "UAE", "OMAN", "KUWAIT", "BAHRAIN",
  "SAUDI ARABIA", "UGANDA", "TANZANIA", "INDIA", "PAKISTAN",
  "BANGLADESH", "SRI LANKA", "PHILIPPINES", "NEPAL", "ETHIOPIA", "ERITREA", "SUDAN"
];

export const kenyaWarehouses = [
  { value: "MOMBASA", label: "MOMBASA PORT" },
  { value: "NAIROBI_ICD", label: "NAIROBI ICD" },
];

export const countryCodes: Record<string, string> = {
  "QATAR": "+974",
  "SAUDI ARABIA": "+966",
  "UAE": "+971",
  "KENYA": "+254",
  "UGANDA": "+256",
  "TANZANIA": "+255",
  "INDIA": "+91",
  "PAKISTAN": "+92",
  "SRI LANKA": "+94",
  "PHILIPPINES": "+63",
  "ETHIOPIA": "+251",
  "ERITREA": "+291",
  "SUDAN": "+249",
};

// Door-to-door pricing based on sectors (KES)
export const doorToDoorPricing: Record<string, { price: number; currency: string }> = {
  NAIROBI: { price: 500, currency: "KES" },
  MOMBASA: { price: 300, currency: "KES" },
  KISUMU: { price: 800, currency: "KES" },
  NAKURU: { price: 600, currency: "KES" },
  ELDORET: { price: 700, currency: "KES" },
  THIKA: { price: 400, currency: "KES" },
  MALINDI: { price: 500, currency: "KES" },
  KITALE: { price: 800, currency: "KES" },
  GARISSA: { price: 900, currency: "KES" },
  NYERI: { price: 600, currency: "KES" },
  MACHAKOS: { price: 500, currency: "KES" },
  MERU: { price: 700, currency: "KES" },
  LAMU: { price: 600, currency: "KES" },
  NANYUKI: { price: 700, currency: "KES" },
  NAIVASHA: { price: 500, currency: "KES" },
  KAKAMEGA: { price: 800, currency: "KES" },
};

// Kenya package types
export const kenyaPackageTypes = [
  { name: "CARTON BOX - SMALL", dimensions: { length: 19, width: 19, height: 19 }, volume: 0.134 },
  { name: "CARTON BOX - MEDIUM", dimensions: { length: 20, width: 20, height: 29 }, volume: 0.174 },
  { name: "CARTON BOX - LARGE", dimensions: { length: 24, width: 24, height: 24 }, volume: 0.232 },
  { name: "CARTON BOX - XL", dimensions: { length: 30, width: 30, height: 30 }, volume: 0.453 },
  { name: "TRAVELLING BAGS", dimensions: { length: 22, width: 14, height: 12 }, volume: 0.062 },
  { name: "PERSONAL EFFECTS", dimensions: { length: 40, width: 30, height: 25 }, volume: 0.500 },
  { name: "HOUSEHOLD ITEMS", dimensions: { length: 50, width: 40, height: 30 }, volume: 1.000 },
  { name: "ELECTRONIC ITEMS", dimensions: { length: 35, width: 25, height: 20 }, volume: 0.290 },
];

// Calculate volume weight (1 CBM = 1000 kg)
export const calculateVolumeWeight = (length: number, width: number, height: number): number => {
  const volumeInCubicMeters = (length * width * height) / 1000000;
  return volumeInCubicMeters * 1000;
};

export const calculateCubicFeet = (cubicMeters: number): number => {
  return cubicMeters * 35.3147;
};

// Currency settings per sector
export const getSectorCurrency = (sector: string): string => {
  // All Kenyan domestic sectors use KES
  return "KES";
};
