
export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  shipper1?: string;
  consignee1?: string;
  salesAgent?: string;
  warehouse?: string;
  doorToDoor?: boolean;
  nic?: string;
  volume?: number | string;
  weight?: number | string;
  packages?: number;
  gross?: number;
  discount?: number;
  net?: number;
  paid: boolean;
  statusCharge?: number;
  offerDiscount?: number;
  branch?: string;
  sector?: string;
  transportType?: string;
  customer?: string;
  bookingForm?: string;
  freightType?: string;
  amount?: number;
  currency?: string;
  country?: string;
  consignee?: string;
  packageDetails?: PackageDetail[];
  totalPaid?: number;
  paidAmount?: number;
  [key: string]: any;
}

export interface PackageDetail {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  volume: string;
  weight: string;
  boxNumber: string;
  volumeWeight: string;
  containerNo?: string;
  vesselName?: string;
  voyage?: string;
  eta?: string;
  crno?: string;
  loadedDate?: string;
  vrno?: string;
  cno?: string;
}
