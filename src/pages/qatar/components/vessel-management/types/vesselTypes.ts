
export interface VesselFormData {
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
}

export interface Vessel extends VesselFormData {
  status: string;
  containers: string[];
}

export interface VesselWithContainerDetails extends Vessel {
  containerDetails?: any[];
}

export interface VesselAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

export interface VesselFilter {
  status?: string;
  shippingLine?: string;
  direction?: string;
  sector?: string;
  dateRange?: [Date | null, Date | null];
}

// Add QatarVessel interface that's being used in the vessel management components
export interface QatarVessel extends Vessel {
  loadDate?: string;
}

// Add AddVesselProps interface
export interface AddVesselProps {
  onVesselCreated: () => void;
  onCancel: () => void;
}
