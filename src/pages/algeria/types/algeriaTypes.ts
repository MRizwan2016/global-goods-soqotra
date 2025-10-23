export interface AlgeriaVehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  color: string;
  chassisNumber: string;
  plateNumber: string;
  engineNumber: string;
  country: string;
  hsCode: string;
  exportPlate: string;
  type: "SEDAN" | "SUV" | "HILUX" | "DOUBLE_PICKUP";
  freightCharge: number;
  photos: string[];
  customerInfo?: {
    name: string;
    mobile: string;
    address: string;
  };
}

export interface PersonalEffects {
  id: string;
  itemCategory: string;
  description: string;
  ownerName: string;
  loadingLocation: "INSIDE_CAR" | "OUTSIDE_CAR";
  quantity: number;
  volume: number;
  weight: number;
  hsCode: string;
  charges: number;
  requiresHBL: boolean;
  photos: string[];
}

export interface AlgeriaContainer {
  id: string;
  containerNumber: string;
  type: string;
  vesselName: string;
  portOfLoading: string;
  portOfDischarge: "ALGIERS" | "SKIKDA";
  sealNumber: string;
  maxVehicles: number;
  loadedVehicles: AlgeriaVehicle[];
  personalEffects: PersonalEffects[];
  totalFreightCharge: number;
  totalPersonalEffectsCharge: number;
  totalCharge: number;
  status: "LOADING" | "SEALED" | "IN_TRANSIT" | "DELIVERED";
  departureDate?: string;
  arrivalDate?: string;
}

export interface VehicleTypeRate {
  type: "SEDAN" | "SUV" | "HILUX" | "DOUBLE_PICKUP";
  description: string;
  defaultRate: number;
}

export const VEHICLE_RATES: VehicleTypeRate[] = [
  { type: "SEDAN", description: "Sedan (Saloon)", defaultRate: 5500 },
  { type: "SUV", description: "SUV", defaultRate: 6500 },
  { type: "HILUX", description: "Hilux (Single Cabin)", defaultRate: 7000 },
  { type: "DOUBLE_PICKUP", description: "Double Cabin Pickup", defaultRate: 7500 }
];

export const PERSONAL_EFFECTS_RATE = 600; // QR per CBM
