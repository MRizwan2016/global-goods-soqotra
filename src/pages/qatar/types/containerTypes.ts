
export interface QatarContainer {
  id: string;
  containerNumber: string;
  containerType: string;
  runningNumber: string;
  status: string;
  sealNumber?: string;
  weight?: number;
  volume?: number;
  packages?: number;
  vesselId?: string;
  // Add missing properties
  direction?: string;
  etd?: string;
  eta?: string;
  loadDate?: string;
  sector?: string;
  shippingLine?: string;
}

export interface ContainerCargo {
  id: string;
  containerId: string;
  invoiceNumber: string;
  lineNumber: string;
  barcode?: string;
  packageName: string;
  volume: number;
  weight: number;
  shipper: string;
  consignee: string;
  wh: string;
  d2d: boolean;
}

export interface ItemListEntry {
  id: string;
  invoice: string;
  shipper: string;
  consignee: string;
  packages: number;
  volume: number;
  // Fix the itemName property issue in mockData
  packageName?: string;
  quantity?: number;
}

export interface ConsigneeListItem {
  id: string;
  invoice: string;
  shipper: string;
  shipperContact?: string;
  consignee: string;
  consigneeContact?: string;
  volume: number;
}

export interface UnsettledInvoice {
  id: string;
  invoiceNumber: string | null;
  shipper: string;
  consignee: string;
  amount: number;
  paid: boolean;
  // Additional properties from the mock data
  gy?: string;
  net?: number;
  due?: number;
}

export interface ContainerManifestProps {
  containerId: string;
  onManifestSubmitted: () => void;
  onCancel: () => void;
}
