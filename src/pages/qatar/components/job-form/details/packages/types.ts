
export interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
  boxNumber?: string; // Added boxNumber property to fix the error
}

export interface PackageButtonProps {
  onSelectPackage?: (pkg: PackageInfo) => void;
}
