
export interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
}

export interface PackageButtonProps {
  onSelectPackage?: (pkg: PackageInfo) => void;
}
