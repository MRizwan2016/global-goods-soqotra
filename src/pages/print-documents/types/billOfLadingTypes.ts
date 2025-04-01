
export interface BillOfLadingData {
  id: string;
  blNumber: string;
  date: string;
  shipper: string;
  shipperAddress?: string;
  shipperPhone?: string;
  consignee: string;
  consigneeAddress?: string;
  consigneeIdNumber?: string;
  notifyParty?: string;
  notifyPartyAddress?: string;
  deliveryAgent?: string;
  portOfLoading?: string;
  portOfDischarge?: string;
  marks?: string;
  description?: string;
  weight?: string;
  volume?: string;
  packages?: string;
  freightPrepaid?: boolean;
  vessel?: string;
  finalDestination?: string;
  dateOfIssue?: string;
  cargoType?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  chassisNumber?: string;
  containerNo?: string;
  sealNo?: string;
  specialInstructions?: string;
  voyage?: string;
  [key: string]: any; // Allow any additional fields
}
