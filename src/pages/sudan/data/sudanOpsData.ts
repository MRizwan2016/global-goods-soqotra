// Sudan operational data for the new module

export const sudanPorts = [
  { value: "PORT_SUDAN", label: "PORT SUDAN" },
  { value: "KASSALA_PORT", label: "KASSALA PORT" },
];

export const sudanSectors = [
  { value: "KASSALA", label: "KASSALA", port: "PORT_SUDAN" },
  { value: "KHARTOUM", label: "KHARTOUM", port: "PORT_SUDAN" },
  { value: "PORT_SUDAN", label: "PORT SUDAN", port: "PORT_SUDAN" },
  { value: "GEDAREF", label: "GEDAREF", port: "PORT_SUDAN" },
  { value: "MADANI", label: "WAD MADANI", port: "PORT_SUDAN" },
  { value: "KASSALA_RURAL", label: "KASSALA RURAL", port: "PORT_SUDAN" },
  { value: "BLUE_NILE", label: "BLUE NILE", port: "PORT_SUDAN" },
  { value: "WHITE_NILE", label: "WHITE NILE", port: "PORT_SUDAN" },
];

export const sudanDistricts = [
  { value: "KASSALA_CENTRAL", label: "Kassala Central" },
  { value: "KASSALA_NORTH", label: "Kassala North" },
  { value: "KASSALA_SOUTH", label: "Kassala South" },
  { value: "KHARTOUM_CENTRAL", label: "Khartoum Central" },
  { value: "KHARTOUM_NORTH", label: "Khartoum North" },
  { value: "OMDURMAN", label: "Omdurman" },
  { value: "PORT_SUDAN_CENTRAL", label: "Port Sudan Central" },
  { value: "PORT_SUDAN_SOUTH", label: "Port Sudan South" },
  { value: "GEDAREF_CENTRAL", label: "Gedaref Central" },
  { value: "GEDAREF_RURAL", label: "Gedaref Rural" },
];

export const sudanSalesReps = [
  { value: "MR_YOUSUF", label: "MR. YOUSUF MOHAMED IBRAHIM" },
  { value: "MR_SALEH", label: "MR. SALEH MOHAMED IBRAHIM" },
];

export const sudanDrivers = [
  { value: "SD001", label: "MR. SALIH (SD001)" },
  { value: "SD002", label: "MR. JOHNY VENAKDI (SD002)" },
  { value: "SD003", label: "MR. SALEH (SD003)" },
  { value: "SD004", label: "MR. IDRIS KARAR (SD004)" },
  { value: "SD005", label: "MR. BAKEETH (SD005)" },
];

export const sudanVehicles = [
  { value: "SD001", label: "SD001 - SALIH" },
  { value: "SD002", label: "SD002 - JOHNY VENAKDI" },
  { value: "SD003", label: "SD003 - SALEH" },
  { value: "SD004", label: "SD004 - IDRIS KARAR" },
  { value: "SD005", label: "SD005 - BAKEETH" },
];

export const sudanVehicleDriverMap = [
  { truck: "SD001", driver: "MR. SALIH" },
  { truck: "SD002", driver: "MR. JOHNY VENAKDI" },
  { truck: "SD003", driver: "MR. SALEH" },
  { truck: "SD004", driver: "MR. IDRIS KARAR" },
  { truck: "SD005", driver: "MR. BAKEETH" },
];

export const getSudanDriverForVehicle = (truck: string): string | null => {
  const match = sudanVehicleDriverMap.find(v => v.truck === truck);
  return match ? match.driver : null;
};

export const namePrefixes = [
  { value: "MR", label: "MR." },
  { value: "MRS", label: "MRS." },
  { value: "MS", label: "MS." },
  { value: "DR", label: "DR." },
  { value: "PROF", label: "PROF." },
  { value: "ENGR", label: "ENGR." },
  { value: "SHEIKH", label: "SHEIKH" },
];

export const qatarCities = [
  "AL HILAL", "NAJMA", "WUKAIR", "ABU NAKLA", "MANSOORA", "AZIZIA", "AL WAAB",
  "BAAYA", "MUAITHAR", "WAKRA", "DAFFNA", "WEST BAY", "MADEENA KHALEEFA",
  "AIN KHALITH", "NASARIYA", "SHAHANIYA", "SALWA ROAD", "BANI HAJAR",
  "NEW SALATHA", "AL SAAD", "MUSHERIEB", "INDUSTRIAL AREA", "RAS LAFFAN",
  "AL KEESHA", "MATHAR AL QADEEM", "MUNTAZA", "AL KHOR", "KARATHIYATH",
  "GARAFA", "EDUCATIONAL CITY", "ABU SAMRA", "AL ASIRI"
];

export const sudanCities = [
  "KHARTOUM", "OMDURMAN", "KHARTOUM NORTH", "PORT SUDAN", "KASSALA",
  "GEDAREF", "WAD MADANI", "AL FASHER", "NYALA", "AL UBAYYID",
  "KOSTI", "RABAK", "SINGA", "DAMAZIN", "KADUGLI", "HALFA AL JADIDA",
  "KHASHM EL GIRBA", "BAHRI", "SUAKIN", "TOKAR", "DOKA"
];

export const destinationCountries = [
  "SUDAN", "QATAR", "UAE", "OMAN", "KUWAIT", "BAHRAIN",
  "SAUDI ARABIA", "KENYA", "UGANDA", "ERITREA", "ETHIOPIA",
  "EGYPT", "SOUTH SUDAN", "CHAD", "LIBYA"
];

export const countryCodes: Record<string, string> = {
  "QATAR": "+974",
  "SAUDI ARABIA": "+966",
  "UAE": "+971",
  "SUDAN": "+249",
  "KENYA": "+254",
  "UGANDA": "+256",
  "ERITREA": "+291",
  "ETHIOPIA": "+251",
  "EGYPT": "+20",
};

export const doorToDoorPricing: Record<string, { price: number; currency: string }> = {
  KASSALA: { price: 15, currency: "SDG" },
  KHARTOUM: { price: 20, currency: "SDG" },
  PORT_SUDAN: { price: 12, currency: "SDG" },
  GEDAREF: { price: 18, currency: "SDG" },
  MADANI: { price: 16, currency: "SDG" },
  KASSALA_RURAL: { price: 22, currency: "SDG" },
  BLUE_NILE: { price: 25, currency: "SDG" },
  WHITE_NILE: { price: 20, currency: "SDG" },
};

export const sudanPackageTypes = [
  { name: "SMALL BOX", dimensions: { length: 30, width: 20, height: 15 }, volume: 0.009 },
  { name: "MEDIUM BOX", dimensions: { length: 40, width: 30, height: 25 }, volume: 0.030 },
  { name: "LARGE BOX", dimensions: { length: 60, width: 40, height: 35 }, volume: 0.084 },
  { name: "SUITCASE", dimensions: { length: 70, width: 45, height: 25 }, volume: 0.079 },
  { name: "CARTON", dimensions: { length: 50, width: 35, height: 30 }, volume: 0.053 },
  { name: "PLASTIC BAG", dimensions: { length: 60, width: 40, height: 20 }, volume: 0.048 },
  { name: "ENVELOPE", dimensions: { length: 35, width: 25, height: 2 }, volume: 0.002 },
  { name: "PERSONAL EFFECTS", dimensions: { length: 40, width: 30, height: 25 }, volume: 0.500 },
];

export const calculateVolumeWeight = (length: number, width: number, height: number): number => {
  const volumeInCubicMeters = (length * width * height) / 1000000;
  return volumeInCubicMeters * 1000;
};

export const calculateCubicFeet = (cubicMeters: number): number => {
  return cubicMeters * 35.3147;
};
