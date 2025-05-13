
export interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
  boxNumber?: string; // Added boxNumber as an optional property
}

export interface PackageButtonProps {
  onSelectPackage?: (pkg: PackageInfo) => void;
}
