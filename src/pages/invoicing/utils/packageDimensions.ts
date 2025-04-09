/**
 * Utility functions for working with package dimensions
 */

import { PackageOption, packageOptions } from "@/data/packageOptions";

/**
 * Set dimensions and weight based on package type
 */
export const getDimensionsForPackage = (description: string): {
  length: string,
  width: string,
  height: string,
  packageWeight: string,
  price: string
} => {
  // Try to find the package in our updated package options
  const selectedPackage = packageOptions.find(pkg => pkg.description === description);
  
  if (selectedPackage) {
    return {
      length: selectedPackage.dimensions.length.toString(),
      width: selectedPackage.dimensions.width.toString(),
      height: selectedPackage.dimensions.height.toString(),
      packageWeight: selectedPackage.weightInKg ? selectedPackage.weightInKg.toString() : "0",
      price: selectedPackage.price.toString()
    };
  }
  
  // If not found, use the legacy logic
  // Default values
  let length = "";
  let width = "";
  let height = "";
  let packageWeight = "";
  let price = "";
  
  // Set specific dimensions for different package types based on the updated table
  if (description.includes("SMALL")) {
    // Small carton box
    length = "20";
    width = "20";
    height = "20";
    packageWeight = "65";
    price = "56.00";
  } else if (description.includes("MEDIUM")) {
    if (description === "CARTON BOX - MEDIUM") {
      // Medium carton box (standard)
      length = "19";
      width = "19";
      height = "29";
      packageWeight = "70";
      price = "64.10";
    } else {
      // If it's another type of medium box
      length = "21";
      width = "21";
      height = "30";
      packageWeight = "80";
      price = "81.00";
    }
  } else if (description.includes("LARGE")) {
    // Large carton box
    length = "23";
    width = "23";
    height = "23";
    packageWeight = "80";
    price = "74.49";
  } else if (description.includes("EXTRA LARGE")) {
    // Extra large carton box
    length = "23";
    width = "23";
    height = "28";
    packageWeight = "100";
    price = "90.69";
  } else if (description.includes("JUMBO")) {
    if (description.includes("SUPER")) {
      // Super jumbo carton box
      length = "30";
      width = "30";
      height = "30";
      packageWeight = "135";
      price = "165.31";
    } else {
      // Jumbo carton box
      length = "24";
      width = "24";
      height = "26";
      packageWeight = "115";
      price = "91.69";
    }
  } else if (description.includes("BULILIT")) {
    // Bulilit carton box
    length = "14";
    width = "14";
    height = "12";
    packageWeight = "10";
    price = "14.40";
  }
  
  return { length, width, height, packageWeight, price };
};

/**
 * Calculate cubic meter based on dimensions in inches
 */
export const calculateCubicMeter = (length: string, width: string, height: string): string => {
  if (length && width && height) {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
      // Convert cubic inches to cubic meters: 1 cubic inch = 0.0000163871 cubic meters
      return ((l * w * h) * 0.0000163871).toFixed(6);
    }
  }
  return "";
};

/**
 * Calculate price based on cubic meters or weight for specific destinations
 * @param cubicMeter - volume in cubic meters
 * @param weightInKg - weight in kilograms
 * @param destination - destination city/country
 * @returns calculated price based on destination rules
 */
export const calculatePriceByDestination = (
  cubicMeter: string,
  destination: string,
  weightInKg: string = "0"
): {
  price: string,
  documentsFee: string
} => {
  const volume = parseFloat(cubicMeter);
  const weight = parseFloat(weightInKg);
  
  // Volume-based pricing destinations
  if (destination === "Sri Lanka" || destination.includes("COLOMBO") || 
      destination.includes("KURUNEGALA") || destination.includes("KANDY") || 
      destination.includes("GALLE")) {
    // QAR 365/meter for Sri Lanka
    const basePrice = (volume * 365).toFixed(2);
    // Add QAR 50 documentation fee if volume > 1 cubic meter
    const docFee = volume > 1 ? "50.00" : "0.00";
    return { price: basePrice, documentsFee: docFee };
  }
  
  if (destination === "Philippines" || destination.includes("MANILA") || 
      destination.includes("CEBU")) {
    // QAR 328.5/meter for Philippines (10% less than Sri Lanka)
    const basePrice = (volume * 328.5).toFixed(2);
    // Add QAR 45 documentation fee if volume > 1 cubic meter
    const docFee = volume > 1 ? "45.00" : "0.00";
    return { price: basePrice, documentsFee: docFee };
  }
  
  // Weight-based pricing destinations
  if (destination === "Kenya - Mombasa" || destination.includes("MOMBASA")) {
    // QAR 7.5 per kg for Mombasa
    const basePrice = (weight * 7.5).toFixed(2);
    return { price: basePrice, documentsFee: "35.00" };
  }
  
  if (destination === "Kenya - Nairobi" || destination.includes("NAIROBI")) {
    // QAR 8.2 per kg for Nairobi
    const basePrice = (weight * 8.2).toFixed(2);
    return { price: basePrice, documentsFee: "35.00" };
  }
  
  if (destination === "Eritrea - Asmara" || destination.includes("ASMARA")) {
    // QAR 9.5 per kg for Asmara
    const basePrice = (weight * 9.5).toFixed(2);
    return { price: basePrice, documentsFee: "40.00" };
  }
  
  if (destination === "Eritrea - Hargeisa" || destination.includes("HARGEISA")) {
    // QAR 8.7 per kg for Hargeisa
    const basePrice = (weight * 8.7).toFixed(2);
    return { price: basePrice, documentsFee: "40.00" };
  }
  
  if (destination === "Sudan - Port Sudan" || destination.includes("PORT SUDAN")) {
    // QAR 10.2 per kg for Port Sudan
    const basePrice = (weight * 10.2).toFixed(2);
    return { price: basePrice, documentsFee: "45.00" };
  }
  
  // Default - return empty values to use existing prices
  return { price: "", documentsFee: "" };
};

/**
 * Calculate total price including document fees
 */
export const calculateTotal = (price: string, docFee: string): string => {
  const p = parseFloat(price || "0");
  const d = parseFloat(docFee || "0");
  return (p + d).toFixed(2);
};
