
export interface QatarContainer {
  id: string;
  containerNumber: string;
  containerType: string;
  runningNumber: string;
  status: string;
  sealNumber?: string;
  confirmDate?: string;
  etd?: string;
  eta?: string;
  packages?: number;
  weight?: number;
  volume?: number;
  direction?: string;
  sector?: string;
  shippingLine?: string;
  vessel?: string;
  vesselId?: string;
  jobNumber?: string;
  loadDate?: string;
  // Add missing properties to fix type errors
  containerSize?: string;
  ship?: string;
  voyage?: string;
  createdDate?: string;
  description?: string;
}

export interface ContainerCargo {
  id: string;
  containerId: string;
  invoiceNumber: string;
  lineNumber: string;
  packageName: string;
  volume: number;
  weight: number;
  quantity: number;
  shipper: string;
  consignee: string;
  description?: string;
  barcode?: string;
  wh?: string;
  d2d?: boolean;
}

export interface ItemListEntry {
  id: string;
  invoice: string;
  shipper: string;
  consignee: string;
  packages: number;
  volume: number;
  packageName: string;
  quantity?: number;
}

export interface ConsigneeListItem {
  id: string;
  invoice: string;
  shipper: string;
  shipperContact: string;
  consignee: string;
  consigneeContact: string;
  volume: number;
}

export interface UnsettledInvoice {
  id: string;
  invoiceNumber: string;
  shipper: string;
  consignee: string;
  amount: number;
  paid: boolean;
  currency?: string;
}

export interface PrintOptions {
  section: "all" | "cargo" | "items" | "consignees" | "invoices";
  orientation: "portrait" | "landscape";
}

// Add container manifest props interface
export interface ContainerManifestProps {
  containerId: string;
  onClose: () => void;
}

// Add ViewManifestTabProps interface
export interface ViewManifestTabProps {
  container: QatarContainer;
  printOptions: PrintOptions;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
  onClose: () => void;
}

// Add ContainerListProps interface
export interface ContainerListProps {
  containers: QatarContainer[];
  onEdit?: (id: string) => void;
  onLoad?: (id: string) => void;
  onViewManifest?: (id: string) => void;
  onCreateManifest?: (id: string) => void;
  onAddClick?: () => void;
}
