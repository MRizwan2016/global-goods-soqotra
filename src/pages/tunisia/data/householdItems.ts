// Predefined household items with dimensions and specifications
export interface HouseholdItem {
  name: string;
  dimensions: {
    length: number; // inches
    width: number;  // inches
    height: number; // inches
  };
  volumeCBM: number;
  category: string;
}

export const HOUSEHOLD_ITEMS: HouseholdItem[] = [
  // Carton Boxes
  { name: "BULLET CARTON BOX", dimensions: { length: 14, width: 14, height: 12 }, volumeCBM: 0.04, category: "Boxes" },
  { name: "SMALL CARTON BOX", dimensions: { length: 19, width: 19, height: 19 }, volumeCBM: 0.12, category: "Boxes" },
  { name: "MEDIUM CARTON", dimensions: { length: 19, width: 19, height: 29 }, volumeCBM: 0.18, category: "Boxes" },
  { name: "LARGE CARTON BOX", dimensions: { length: 23, width: 23, height: 23 }, volumeCBM: 0.20, category: "Boxes" },
  { name: "EXTRA LARGE CARTON BOX", dimensions: { length: 24, width: 24, height: 30 }, volumeCBM: 0.28, category: "Boxes" },
  { name: "JUMBO CARTON BOX", dimensions: { length: 24, width: 24, height: 26 }, volumeCBM: 0.25, category: "Boxes" },
  { name: "SUPER JUMBO CARTON BOX", dimensions: { length: 30, width: 30, height: 30 }, volumeCBM: 0.45, category: "Boxes" },
  
  // Bags
  { name: "TRAVELLING BAG", dimensions: { length: 16, width: 23, height: 32 }, volumeCBM: 0.20, category: "Bags" },
  { name: "TRAVELLING BAG (Medium)", dimensions: { length: 20, width: 15, height: 30 }, volumeCBM: 0.15, category: "Bags" },
  { name: "TRAVELLING BAG (Small)", dimensions: { length: 14, width: 15, height: 26 }, volumeCBM: 0.09, category: "Bags" },
  
  // Furniture & Home Items
  { name: "MATTRESS", dimensions: { length: 75, width: 36, height: 4 }, volumeCBM: 0.18, category: "Furniture" },
  { name: "MATTRESS (Large)", dimensions: { length: 70, width: 28, height: 6 }, volumeCBM: 0.20, category: "Furniture" },
  { name: "PILLOW", dimensions: { length: 13, width: 19, height: 30 }, volumeCBM: 0.12, category: "Furniture" },
  { name: "DRUM", dimensions: { length: 23, width: 23, height: 36 }, volumeCBM: 0.32, category: "Containers" },
  { name: "WATER DISPENSER", dimensions: { length: 13, width: 13, height: 39 }, volumeCBM: 0.11, category: "Appliances" },
  { name: "WASHING MACHINE", dimensions: { length: 21, width: 25, height: 35 }, volumeCBM: 0.31, category: "Appliances" },
  { name: "CHAIR BUNDLE", dimensions: { length: 33, width: 18, height: 17 }, volumeCBM: 0.17, category: "Furniture" },
  { name: "LADDER", dimensions: { length: 95, width: 12, height: 2 }, volumeCBM: 0.038, category: "Tools" },
  
  // Electronics
  { name: "TELEVISION - 55 INCHES", dimensions: { length: 55, width: 6, height: 36 }, volumeCBM: 0.199, category: "Electronics" },
  { name: "TELEVISION - 40 INCHES", dimensions: { length: 40, width: 24, height: 5 }, volumeCBM: 0.081, category: "Electronics" },
  { name: "TELEVISION - 65 INCHES", dimensions: { length: 57, width: 32.7, height: 1.6 }, volumeCBM: 0.050, category: "Electronics" },
  { name: "TELEVISION - 70 INCHES", dimensions: { length: 61.5, width: 35.2, height: 1.7 }, volumeCBM: 0.062, category: "Electronics" },
  
  // Kitchen Appliances
  { name: "MICRO OVEN", dimensions: { length: 15, width: 15, height: 25 }, volumeCBM: 0.09, category: "Appliances" },
  { name: "REFRIDGERATOR - 500 LTRS", dimensions: { length: 25, width: 25, height: 65 }, volumeCBM: 0.68, category: "Appliances" },
  { name: "REFRIDGERATOR - 550 LTRS", dimensions: { length: 28, width: 27, height: 68 }, volumeCBM: 0.86, category: "Appliances" },
  { name: "OVEN", dimensions: { length: 25, width: 20, height: 20 }, volumeCBM: 0.17, category: "Appliances" },
  { name: "GAS COOKER", dimensions: { length: 20, width: 20, height: 34 }, volumeCBM: 0.23, category: "Appliances" },
  
  // Sports & Recreation
  { name: "BICYCLE", dimensions: { length: 36, width: 24, height: 6 }, volumeCBM: 0.09, category: "Sports" }
];

export const ITEM_CATEGORIES = [
  "All",
  "Boxes",
  "Bags", 
  "Furniture",
  "Appliances",
  "Electronics",
  "Containers",
  "Tools",
  "Sports"
];