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
}

export interface PrintOptions {
  section: "all" | "cargo" | "items" | "consignees" | "invoices";
  orientation: "portrait" | "landscape";
}
