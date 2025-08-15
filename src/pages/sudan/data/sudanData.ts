// Sudan-specific data

// Sudan ports
export const sudanPorts = [
  { value: "PORT_SUDAN", label: "Port Sudan" },
  { value: "KASSALA_PORT", label: "Kassala Port" }
];

// Sudan sectors with regions
export const sudanSectors = [
  { value: "KASSALA", label: "Kassala", port: "PORT_SUDAN", region: "Eastern" },
  { value: "KHARTOUM", label: "Khartoum", port: "PORT_SUDAN", region: "Central" },
  { value: "PORT_SUDAN", label: "Port Sudan", port: "PORT_SUDAN", region: "Eastern" },
  { value: "GEDAREF", label: "Gedaref", port: "PORT_SUDAN", region: "Eastern" },
  { value: "MADANI", label: "Wad Madani", port: "PORT_SUDAN", region: "Central" },
  { value: "KASSALA_RURAL", label: "Kassala Rural", port: "PORT_SUDAN", region: "Eastern" },
  { value: "BLUE_NILE", label: "Blue Nile", port: "PORT_SUDAN", region: "Southern" },
  { value: "WHITE_NILE", label: "White Nile", port: "PORT_SUDAN", region: "Central" }
];

// Sudan sales representatives
export const sudanSalesReps = [
  { value: "MR_YOUSUF_ABDULLAH", label: "Mr. Yousuf Abdullah" },
  { value: "MR_SALIH", label: "Mr. Salih" },
  { value: "MR_ABDUL_QADER", label: "Mr. Abdul Qader" }
];

// Sudan drivers
export const sudanDrivers = [
  { value: "MR_SALIH", label: "Mr. Salih" },
  { value: "MR_JOHNY_VENAKDI", label: "Mr. Johny Venakdi" },
  { value: "MR_SALEH", label: "Mr. Saleh" },
  { value: "MR_IDRIS_KARAR", label: "Mr. Idris Karar" },
  { value: "MR_BAKEETH", label: "Mr. Bakeeth" }
];

// Sudan districts
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
  { value: "GEDAREF_RURAL", label: "Gedaref Rural" }
];

// Sector to cities mapping for Sudan
export const sectorCitiesMapping = {
  KASSALA: ["Kassala", "Halfa Al Jadida", "Khashm El Girba"],
  KHARTOUM: ["Khartoum", "Omdurman", "Khartoum North", "Bahri"],
  PORT_SUDAN: ["Port Sudan", "Suakin", "Tokar"],
  GEDAREF: ["Gedaref", "Doka", "Fau", "Basunda"],
  MADANI: ["Wad Madani", "Al Managil", "Hasaheisa"],
  KASSALA_RURAL: ["Rural Kassala", "Telkuk", "Aroma"],
  BLUE_NILE: ["Damazin", "Kurmuk", "Geissan"],
  WHITE_NILE: ["Kosti", "Rabak", "Ed Dueim"]
};

// General data (shared across projects)
export const namePrefixes = [
  "MR.", "MRS.", "MS.", "DR.", "PROF.", "ENGR.", "CAPT.", "SIR", "MADAM"
];

export const qatarCities = [
  "DOHA", "AL RAYYAN", "AL WAKRAH", "AL KHOR", "DUKHAN", "MESAIEED", 
  "UMM SALAL", "AL SHAMAL", "AL DAAYEN", "AL SHAHANIYA"
];

export const destinationCountries = [
  "SUDAN", "ERITREA", "ETHIOPIA", "UGANDA", "KENYA", "TANZANIA", 
  "SOUTH SUDAN", "CHAD", "LIBYA", "EGYPT"
];

export const sudanCities = [
  "KHARTOUM", "OMDURMAN", "KHARTOUM NORTH", "PORT SUDAN", "KASSALA", 
  "GEDAREF", "WAD MADANI", "AL FASHER", "NYALA", "AL UBAYYID",
  "KOSTI", "RABAK", "SINGA", "DAMAZIN", "KADUGLI"
];

export const saudiCities = [
  "RIYADH", "JEDDAH", "MECCA", "MEDINA", "DAMMAM", "KHOBAR", 
  "DHAHRAN", "TABUK", "ABHA", "KHAMIS MUSHAIT", "NAJRAN", 
  "JAZAN", "HAIL", "AL BAHA", "SAKAKA"
];

// Country codes for phone numbers
export const phoneCountryCodes = {
  "QATAR": "+974",
  "SUDAN": "+249",
  "SAUDI ARABIA": "+966",
  "UAE": "+971",
  "KUWAIT": "+965",
  "BAHRAIN": "+973",
  "OMAN": "+968"
};

// Country codes for select dropdown
export const countryCodes = [
  { value: "QATAR", label: "QATAR" },
  { value: "SUDAN", label: "SUDAN" },
  { value: "SAUDI ARABIA", label: "SAUDI ARABIA" },
  { value: "UAE", label: "UAE" },
  { value: "KUWAIT", label: "KUWAIT" },
  { value: "BAHRAIN", label: "BAHRAIN" },
  { value: "OMAN", label: "OMAN" }
];

// Sudan sector pricing
export const sudanSectorPricing = {
  KASSALA: {
    freight: 65,
    doorToDoor: {
      available: true,
      charge: 15
    },
    cities: {
      "Kassala": { freight: 65, doorCharge: 15 },
      "Halfa Al Jadida": { freight: 70, doorCharge: 20 },
      "Khashm El Girba": { freight: 68, doorCharge: 18 }
    }
  },
  KHARTOUM: {
    freight: 70,
    doorToDoor: {
      available: true,
      charge: 20
    },
    cities: {
      "Khartoum": { freight: 70, doorCharge: 20 },
      "Omdurman": { freight: 72, doorCharge: 22 },
      "Khartoum North": { freight: 71, doorCharge: 21 },
      "Bahri": { freight: 71, doorCharge: 21 }
    }
  },
  PORT_SUDAN: {
    freight: 55,
    doorToDoor: {
      available: true,
      charge: 12
    },
    cities: {
      "Port Sudan": { freight: 55, doorCharge: 12 },
      "Suakin": { freight: 58, doorCharge: 15 },
      "Tokar": { freight: 60, doorCharge: 18 }
    }
  },
  GEDAREF: {
    freight: 68,
    doorToDoor: {
      available: true,
      charge: 18
    },
    cities: {
      "Gedaref": { freight: 68, doorCharge: 18 },
      "Doka": { freight: 70, doorCharge: 20 },
      "Fau": { freight: 72, doorCharge: 22 },
      "Basunda": { freight: 71, doorCharge: 21 }
    }
  },
  MADANI: {
    freight: 66,
    doorToDoor: {
      available: true,
      charge: 16
    },
    cities: {
      "Wad Madani": { freight: 66, doorCharge: 16 },
      "Al Managil": { freight: 68, doorCharge: 18 },
      "Hasaheisa": { freight: 69, doorCharge: 19 }
    }
  }
};

// Function to create new sectors dynamically
export const createNewSector = (name: string, freightPerKg: number, hasDoorToDoor: boolean, doorToDoorCharge: number = 0) => {
  return {
    value: name.toUpperCase().replace(/\s+/g, '_'),
    label: name,
    port: "PORT_SUDAN",
    region: "Custom",
    freight: freightPerKg,
    doorToDoor: {
      available: hasDoorToDoor,
      charge: doorToDoorCharge
    }
  };
};

// Legacy door-to-door pricing (for backward compatibility)
export const doorToDoorPricing = {
  KASSALA: 15,
  KHARTOUM: 20,
  PORT_SUDAN: 12,
  GEDAREF: 18,
  MADANI: 16
};

// Sudan package types with standard dimensions
export const sudanPackageTypes = [
  {
    name: "SMALL BOX",
    length: 30,
    width: 20,
    height: 15,
    volume: 0.009,
    description: "Small cardboard box"
  },
  {
    name: "MEDIUM BOX",
    length: 40,
    width: 30,
    height: 25,
    volume: 0.030,
    description: "Medium cardboard box"
  },
  {
    name: "LARGE BOX",
    length: 60,
    width: 40,
    height: 35,
    volume: 0.084,
    description: "Large cardboard box"
  },
  {
    name: "SUITCASE",
    length: 70,
    width: 45,
    height: 25,
    volume: 0.079,
    description: "Standard travel suitcase"
  },
  {
    name: "CARTON",
    length: 50,
    width: 35,
    height: 30,
    volume: 0.053,
    description: "Standard shipping carton"
  },
  {
    name: "PLASTIC BAG",
    length: 60,
    width: 40,
    height: 20,
    volume: 0.048,
    description: "Large plastic bag"
  },
  {
    name: "ENVELOPE",
    length: 35,
    width: 25,
    height: 2,
    volume: 0.002,
    description: "Document envelope"
  },
  {
    name: "CYLINDER",
    length: 50,
    width: 20,
    height: 20,
    volume: 0.020,
    description: "Cylindrical package"
  }
];

// Utility functions
export const calculateVolumeWeight = (length: number, width: number, height: number): number => {
  // Convert cm to meters and calculate volume weight (kg)
  // Using standard 167 kg/m³ divisor for air freight
  const volumeM3 = (length * width * height) / 1000000; // cm³ to m³
  return volumeM3 * 167;
};

export const calculateCubicFeet = (cubicMeters: number): number => {
  return cubicMeters * 35.3147; // m³ to ft³
};