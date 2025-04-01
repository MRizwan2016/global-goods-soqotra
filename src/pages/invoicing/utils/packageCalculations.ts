
/**
 * Utility functions for package calculations
 */

import { PackageItem } from "../types/invoiceForm";

/**
 * Update form totals based on all packages
 */
export const calculateTotalsFromPackages = (packages: PackageItem[]): {
  totalVolume: number;
  totalWeight: number;
  totalAmount: number;
  packageCount: number;
} => {
  // Calculate totals from all packages
  let totalVolume = 0;
  let totalWeight = 0;
  let totalAmount = 0;
  let packageCount = packages.length;
  
  packages.forEach(pkg => {
    totalVolume += parseFloat(pkg.volume || "0");
    totalWeight += parseFloat(pkg.weight || "0");
    totalAmount += parseFloat(pkg.total || "0");
  });
  
  return {
    totalVolume,
    totalWeight,
    totalAmount,
    packageCount
  };
};

/**
 * Create a new package item from form state
 */
export const createPackageItemFromForm = (
  id: string,
  name: string,
  length: string,
  width: string, 
  height: string,
  volume: string,
  weight: string,
  boxNumber: string,
  volumeWeight: string,
  price: string,
  documentsFee: string,
  total: string
): PackageItem => {
  return {
    id,
    name,
    length,
    width,
    height,
    volume,
    weight,
    boxNumber,
    volumeWeight,
    price,
    documentsFee,
    total
  };
};
