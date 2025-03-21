
export type ContainerType = "20FT_NML" | "40FT_HIGHC" | "40FT_STD" | "45FT_HIGHC";
export type DirectionType = "K" | "M" | "COLOMBO" | "KURUNEGALA";

export interface QatarContainer {
  id: string;
  runningNumber: string;
  containerNumber: string;
  sealNumber: string;
  containerType: ContainerType;
  direction: DirectionType;
  etd: string; // Estimated Time of Departure
  eta: string; // Estimated Time of Arrival
  loadDate: string;
  weight?: number;
  packages?: number;
  volume?: number;
  status: "NEW" | "LOADED" | "CONFIRMED";
  sector: string;
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
  wh: string; // Warehouse code
  d2d: boolean; // Door to Door delivery
}

export interface UnsettledInvoice {
  id: string;
  invoiceNumber: string;
  gy: string;
  shipper: string;
  consignee: string;
  net: number;
  paid: number;
  due: number;
}

export interface ConsigneeListItem {
  id: string;
  invoice: string;
  consignee: string;
  volume: number;
}

export interface ItemListEntry {
  id: string;
  itemName: string;
  quantity: number;
  volume: number;
}
