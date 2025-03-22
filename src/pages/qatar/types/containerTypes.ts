
export interface QatarContainer {
  id: string;
  runningNumber: string;
  containerNumber: string;
  sealNumber: string;
  containerType: 'GP20' | 'GP40' | 'HC40' | 'RF20' | 'RF40' | 'FL20' | 'FL40' | 'OT20' | 'OT40' | '20FT_NML' | '40FT_HIGHC' | '40FT_STD' | '45FT_HIGHC';
  direction: 'DIRECT' | 'MIX' | 'K' | 'M' | 'COLOMBO' | 'KURUNEGALA';
  sector: string;
  etd: string;
  eta: string;
  loadDate: string;
  weight: number;
  status: 'NEW' | 'LOADING' | 'LOADED' | 'SEALED' | 'SHIPPED' | 'COMPLETED' | 'CONFIRMED';
  // Additional properties
  packages?: number;
  volume?: number;
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
  itemName: string;
  quantity: number;
  volume: number;
}

export interface ConsigneeListItem {
  id: string;
  invoice: string;
  consignee: string;
  volume: number;
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
