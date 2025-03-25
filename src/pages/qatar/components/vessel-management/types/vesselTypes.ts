
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

export interface AddVesselProps {
  onVesselCreated: () => void;
  onCancel: () => void;
}
