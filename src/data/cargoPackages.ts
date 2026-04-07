/**
 * Comprehensive cargo collection and delivery package data
 * Dimensions are in INCHES. Volume calculated as (L*W*H) * 0.0000163871 CBM
 * Collection prices per destination warehouse (QAR per meter rate)
 * Delivery prices for box-making (White Plywood 12mm / Black Plywood 18mm)
 */

export interface CargoPackage {
  id: number;
  name: string;
  dimensions: { length: number; width: number; height: number }; // inches
  volume: number; // CBM
  collectionPrices: {
    colombo: number;      // QAR 259/meter
    kurunegala: number;    // QAR 269/meter
    galle: number;         // QAR 269/meter
  };
  deliveryPrices: {
    whitePlywood12mm: number;
    blackPlywood18mm: number;
  };
  hasManualDimensions: boolean; // true = blank dimensions, user fills manually
}

// Volume calculation: inches to CBM
export const calcVolumeCBM = (l: number, w: number, h: number): number => {
  return l * w * h * 0.0000163871;
};

// Price calculation: volume * rate per meter
export const calcPriceByRate = (volumeCBM: number, ratePerMeter: number): number => {
  return Math.round(volumeCBM * ratePerMeter * 100) / 100;
};

const COLOMBO_RATE = 259;
const KURUNEGALA_RATE = 269;
const GALLE_RATE = 269;

const makePackage = (
  id: number,
  name: string,
  l: number, w: number, h: number,
  whitePly: number, blackPly: number,
  manual = false
): CargoPackage => {
  const vol = manual ? 0 : Math.round(calcVolumeCBM(l, w, h) * 1000000) / 1000000;
  return {
    id, name,
    dimensions: { length: l, width: w, height: h },
    volume: Math.round(vol * 1000) / 1000,
    collectionPrices: {
      colombo: manual ? 0 : calcPriceByRate(vol, COLOMBO_RATE),
      kurunegala: manual ? 0 : calcPriceByRate(vol, KURUNEGALA_RATE),
      galle: manual ? 0 : calcPriceByRate(vol, GALLE_RATE),
    },
    deliveryPrices: {
      whitePlywood12mm: whitePly,
      blackPlywood18mm: blackPly,
    },
    hasManualDimensions: manual,
  };
};

export const cargoCollectionPackages: CargoPackage[] = [
  makePackage(1, "CARTON BOX - SMALL", 20, 20, 20, 13.00, 0),
  makePackage(2, "CARTON BOX - MEDIUM", 19, 19, 29, 18.00, 0),
  makePackage(3, "CARTON BOX - LARGE", 23, 23, 23, 22.00, 0),
  makePackage(4, "CARTON BOX - EXTRA LARGE", 24, 24, 30, 23.00, 0),
  makePackage(5, "CARTON BOX - JUMBO", 24, 24, 26, 20.00, 0),
  makePackage(6, "CARTON BOX - SUPER JUMBO", 30, 30, 30, 65.00, 0),
  makePackage(7, "CARTON BOX - BULILIT", 14, 14, 14, 7.00, 0),
  makePackage(8, "WOODEN BOX - HALF METER", 24, 24, 48, 130.00, 160.00),
  makePackage(9, "WOODEN BOX - 1 METER", 48, 35, 32, 250.00, 310.00),
  makePackage(10, "WOODEN BOX - 1.5 METER", 48, 36, 48, 320.00, 450.00),
  makePackage(11, "WOODEN BOX - 1.5 METER / LONG", 59, 39, 39, 350.00, 470.00),
  makePackage(12, "WOODEN BOX - 2 METER", 48, 48, 48, 380.00, 500.00),
  makePackage(13, "WOODEN BOX - 2 METER / LONG", 78, 39, 39, 430.00, 550.00),
  makePackage(14, "WOODEN BOX - 3 METER", 78, 48, 48, 520.00, 630.00),
  makePackage(15, "WOODEN BOX - 4 METER", 48, 48, 96, 580.00, 730.00),
  makePackage(16, "PLASTIC DRUM", 22, 22, 34, 120.00, 0),
  makePackage(17, "PLASTIC TANK", 48, 39, 38, 0, 0),
  makePackage(18, "PLASTIC DRUM - BIG", 23, 23, 36, 90.00, 0),
  // Blank items - manual dimensions required
  makePackage(19, "TELEVISION - 55 INCH", 0, 0, 0, 0, 0, true),
  makePackage(20, "TELEVISION - 65 INCH", 0, 0, 0, 0, 0, true),
  makePackage(21, "REFRIDGERATOR - 450 LITER", 0, 0, 0, 0, 0, true),
  makePackage(22, "REFRIDGERATOR - 500 LITER", 0, 0, 0, 0, 0, true),
  makePackage(23, "REFRIDGERATOR - 550 LITER", 0, 0, 0, 0, 0, true),
  makePackage(24, "REFRIDGERATOR - 600 LITER", 0, 0, 0, 0, 0, true),
  makePackage(25, "MATTRESS", 0, 0, 0, 0, 0, true),
  makePackage(26, "MATTRESS BUNDLE", 0, 0, 0, 0, 0, true),
  makePackage(27, "SOFA SET", 0, 0, 0, 0, 0, true),
  makePackage(28, "STEEL BED", 0, 0, 0, 0, 0, true),
  makePackage(29, "BED BUNDLE", 0, 0, 0, 0, 0, true),
];

// Fixed volume overrides from the official reference sheet (CBM values)
const VOLUME_OVERRIDES: Record<string, number> = {
  "CARTON BOX - SMALL": 0.134,
  "CARTON BOX - MEDIUM": 0.176,
  "CARTON BOX - LARGE": 0.204,
  "CARTON BOX - EXTRA LARGE": 0.290,
  "CARTON BOX - JUMBO": 0.251,
  "CARTON BOX - SUPER JUMBO": 0.453,
  "CARTON BOX - BULILIT": 0.046,
  "WOODEN BOX - HALF METER": 0.464,
  "WOODEN BOX - 1 METER": 0.902,
  "WOODEN BOX - 1.5 METER": 1.391,
  "WOODEN BOX - 1.5 METER / LONG": 1.505,
  "WOODEN BOX - 2 METER": 1.855,
  "WOODEN BOX - 2 METER / LONG": 1.990,
  "WOODEN BOX - 3 METER": 3.014,
  "WOODEN BOX - 4 METER": 3.710,
  "PLASTIC DRUM": 0.276,
  "PLASTIC TANK": 1.193,
  "PLASTIC DRUM - BIG": 0.319,
};

// Apply official volume overrides
cargoCollectionPackages.forEach(pkg => {
  if (VOLUME_OVERRIDES[pkg.name]) {
    pkg.volume = VOLUME_OVERRIDES[pkg.name];
    // Recalculate collection prices with correct volume
    pkg.collectionPrices.colombo = calcPriceByRate(pkg.volume, COLOMBO_RATE);
    pkg.collectionPrices.kurunegala = calcPriceByRate(pkg.volume, KURUNEGALA_RATE);
    pkg.collectionPrices.galle = calcPriceByRate(pkg.volume, GALLE_RATE);
  }
});

// Door-to-door fixed rates for small/medium cartons
export const DOOR_TO_DOOR_FIXED_RATES: Record<string, number> = {
  "CARTON BOX - SMALL": 260,   // Fixed QAR 260
  "CARTON BOX - MEDIUM": 285,  // Fixed QAR 285
};

// Destination rates for collection price calculation
export const destinationRates: Record<string, number> = {
  "COLOMBO": COLOMBO_RATE,
  "KURUNEGALA": KURUNEGALA_RATE,
  "GALLE": GALLE_RATE,
  "KANDY": 279,
  "JAFFNA": 289,
  "NEGOMBO": 259,
  "MATARA": 279,
  "BATTICALOA": 289,
  "TRINCOMALEE": 289,
  "ANURADHAPURA": 279,
};

// Get collection price for a package at a given destination
export const getCollectionPrice = (pkg: CargoPackage, destination: string): number => {
  const rate = destinationRates[destination.toUpperCase()] || COLOMBO_RATE;
  if (pkg.hasManualDimensions || pkg.volume === 0) return 0;
  return calcPriceByRate(pkg.volume, rate);
};

// Get collection price from volume and destination
export const getCollectionPriceFromVolume = (volumeCBM: number, destination: string): number => {
  const rate = destinationRates[destination.toUpperCase()] || COLOMBO_RATE;
  return calcPriceByRate(volumeCBM, rate);
};
