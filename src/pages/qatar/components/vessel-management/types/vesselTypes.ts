
// Vessel Form Data interface
export interface VesselFormData {
  id: string;
  runningNumber: string;
  vesselName: string;
  voyage: string;
  portOfLoading: string;
  portOfDischarge: string;
  shippingLine: string;
  direction: "DIRECT" | "MIX";
  masterBL: string;
  etd: string;
  eta: string;
  sector: string;
}

// Props for AddVessel component
export interface AddVesselProps {
  onVesselCreated: () => void;
  onCancel: () => void;
}

// Props for VesselList component
export interface VesselListProps {
  onVesselSelect: (vesselId: string) => void;
}

// Props for VesselSearch component
export interface VesselSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Props for SectorFilter component
export interface SectorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

// Props for VesselSummary component
export interface VesselSummaryProps {
  filteredCount: number;
  totalCount: number;
}

// Props for VesselsTable component
export interface VesselsTableProps {
  vessels: any[];
  onVesselSelect: (vesselId: string) => void;
}
