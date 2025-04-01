/**
 * Utility functions for working with package dimensions
 */

import { PackageOption } from "@/data/packageOptions";

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
 * Calculate cubic meter based on dimensions
 */
export const calculateCubicMeter = (length: string, width: string, height: string): string => {
  if (length && width && height) {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
      return ((l * w * h) / 1000000).toFixed(6);
    }
  }
  return "";
};

/**
 * Calculate total price including document fees
 */
export const calculateTotal = (price: string, docFee: string): string => {
  const p = parseFloat(price || "0");
  const d = parseFloat(docFee || "0");
  return (p + d).toFixed(2);
};
