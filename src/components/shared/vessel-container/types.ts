
export interface VesselData {
  id: string;
  runningNumber: string;
  vesselName: string;
  voyage: string;
  portOfLoading: string;
  portOfDischarge: string;
  shippingLine: string;
  direction: string;
  masterBL: string;
  etd: string;
  eta: string;
  sector: string;
  status: string;
  containers: string[];
  loadDate?: string;
}

export interface ContainerData {
  id: string;
  runningNumber: string;
  containerNumber: string;
  sealNumber: string;
  containerType: string;
  direction: string;
  etd: string;
  eta: string;
  sector: string;
  status: string;
  weight: number;
  loadDate?: string;
  // Tunisia-specific
  numberPlate?: string;
}

export interface CountryConfig {
  country: string;
  countryCode: string;
  sectors: { label: string; code: string }[];
  shippingLines: { label: string; code: string }[];
  portsOfLoading: string[];
  portsOfDischarge: string[];
  containerTypes: string[];
  directions: string[];
  confirmStatuses: string[];
  // Tunisia uses number plate instead of invoice number
  useNumberPlate?: boolean;
  runningNumberPrefix: string;
  containerRunningPrefix: string;
}

export type ViewMode = "vessel-list" | "add-vessel" | "container-list" | "add-container";
