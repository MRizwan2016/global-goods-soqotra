/**
 * Sri Lanka specific pricing calculations
 */

// Air freight pricing
export const AIR_FREIGHT_RATE_PER_KG = 10; // QAR 10/kg
export const AIR_FREIGHT_DOCUMENTATION_FEE = 25; // QAR 25/HAWB

// Sea freight pricing rates (QAR per CBM)
export const SEA_FREIGHT_RATES = {
  'Colombo Warehouse': 755,
  'Kurunegala UPB Warehouse': 755,
  'Galle UPB Warehouse': 755,
} as const;

export const SEA_FREIGHT_DOCUMENTATION_FEE = 50; // QAR 50/invoice

/**
 * Calculate air freight pricing
 */
export const calculateAirFreightPricing = (weightKg: number): {
  rate: number;
  documentsFee: number;
  total: number;
} => {
  const rate = weightKg * AIR_FREIGHT_RATE_PER_KG;
  const documentsFee = AIR_FREIGHT_DOCUMENTATION_FEE;
  const total = rate + documentsFee;

  return {
    rate,
    documentsFee,
    total
  };
};

/**
 * Calculate sea freight pricing
 */
export const calculateSeaFreightPricing = (
  volumeCBM: number,
  destination: string
): {
  ratePerCBM: number;
  freightCharge: number;
  documentsFee: number;
  total: number;
} => {
  const ratePerCBM = SEA_FREIGHT_RATES[destination as keyof typeof SEA_FREIGHT_RATES] || SEA_FREIGHT_RATES['Colombo Warehouse'];
  const freightCharge = volumeCBM * ratePerCBM;
  const documentsFee = SEA_FREIGHT_DOCUMENTATION_FEE;
  const total = freightCharge + documentsFee;

  return {
    ratePerCBM,
    freightCharge,
    documentsFee,
    total
  };
};

/**
 * Get warehouse destination based on terminal selection
 */
export const getWarehouseDestination = (terminal: string): string => {
  const terminalToWarehouse: Record<string, string> = {
    'JCT Terminal': 'Colombo Warehouse',
    'ICIC Terminal': 'Colombo Warehouse', 
    'P&O Terminal': 'Colombo Warehouse',
    'Hambanthota Terminal': 'Galle UPB Warehouse'
  };

  return terminalToWarehouse[terminal] || 'Colombo Warehouse';
};

/**
 * Calculate volume in CBM from dimensions in CM (Air Freight)
 */
export const calculateVolumeCBM = (length: number, width: number, height: number): number => {
  return (length * width * height) / 1000000; // Convert from cm³ to m³
};

/**
 * Calculate volume in CBM from dimensions in Inches (Sea Freight)
 */
export const calculateVolumeCBMFromInches = (length: number, width: number, height: number): number => {
  // Convert inches to cm first (1 inch = 2.54 cm), then to m³
  const lengthCm = length * 2.54;
  const widthCm = width * 2.54;
  const heightCm = height * 2.54;
  return (lengthCm * widthCm * heightCm) / 1000000;
};