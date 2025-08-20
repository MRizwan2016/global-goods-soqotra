export interface TunisiaVehicle {
  id: string;
  type: "SEDAN" | "SUV" | "HILUX" | "DOUBLE_PICKUP";
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
  photos: string[];
  freightCharge: number;
  loadedAt?: string;
  customerInfo?: {
    id: string;
    name: string;
    address: string;
    mobile: string;
    email?: string;
    idNumber?: string;
  };
}

export interface PersonalEffects {
  id: string;
  description: string;
  quantity: number;
  volume: number; // in CBM
  photos: string[];
  hsCode: string;
  charges: number; // QAR 600/CBM
}

export interface TunisiaContainer {
  id: string;
  containerNumber: string;
  sealNumber: string;
  type: "40HC" | "45";
  maxVehicles: number;
  loadedVehicles: TunisiaVehicle[];
  personalEffects: PersonalEffects[];
  dateOfLoading: string;
  status: "EMPTY" | "LOADING" | "LOADED" | "SEALED";
  totalFreightCharge: number;
  totalPersonalEffectsCharge: number;
  totalCharge: number;
}

export interface VehicleTypeRate {
  type: string;
  minRate: number;
  maxRate: number;
  defaultRate: number;
}

export const VEHICLE_RATES: VehicleTypeRate[] = [
  { type: "SEDAN", minRate: 5000, maxRate: 6000, defaultRate: 5500 },
  { type: "SUV", minRate: 6000, maxRate: 6000, defaultRate: 6000 },
  { type: "HILUX", minRate: 6000, maxRate: 6000, defaultRate: 6000 },
  { type: "DOUBLE_PICKUP", minRate: 6500, maxRate: 7000, defaultRate: 6750 }
];

export const PERSONAL_EFFECTS_RATE = 600; // QAR per CBM