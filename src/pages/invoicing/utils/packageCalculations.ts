
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
    // Handle numeric conversion properly
    if (pkg.volume) {
      totalVolume += parseFloat(pkg.volume.toString() || "0");
    }
    
    if (pkg.weight) {
      totalWeight += parseFloat(pkg.weight.toString() || "0");
    }
    
    totalAmount += pkg.total || 0; // Use number directly if available
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
    description: name, // Map name to description for compatibility
    length,
    width,
    height,
    volume,
    weight,
    boxNumber,
    volumeWeight,
    price: parseFloat(price || "0"), // Convert string to number
    documentsFee,
    quantity: 1, // Default quantity
    total: parseFloat(total || "0")  // Convert string to number
  };
};
