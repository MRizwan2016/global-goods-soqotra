export interface HouseholdItem {
  name: string;
  category: string;
  avgVolumeCBM?: number;
  avgWeightKG?: number;
}

export const ITEM_CATEGORIES = [
  'Household',
  'Kitchen',
  'Bedroom',
  'Living Room',
  'Electronics',
  'Clothing',
  'Toys & Games',
  'Office',
  'Outdoor',
  'Other'
] as const;

export const HOUSEHOLD_ITEMS: HouseholdItem[] = [
  // Household
  { name: 'Boxes', category: 'Household', avgVolumeCBM: 0.15, avgWeightKG: 20 },
  { name: 'Suitcase', category: 'Household', avgVolumeCBM: 0.08, avgWeightKG: 15 },
  { name: 'Storage Container', category: 'Household', avgVolumeCBM: 0.12, avgWeightKG: 10 },
  
  // Kitchen
  { name: 'Pots & Pans', category: 'Kitchen', avgVolumeCBM: 0.05, avgWeightKG: 8 },
  { name: 'Dishes Set', category: 'Kitchen', avgVolumeCBM: 0.06, avgWeightKG: 12 },
  { name: 'Kitchen Appliances', category: 'Kitchen', avgVolumeCBM: 0.08, avgWeightKG: 15 },
  
  // Bedroom
  { name: 'Bedding', category: 'Bedroom', avgVolumeCBM: 0.12, avgWeightKG: 8 },
  { name: 'Pillows', category: 'Bedroom', avgVolumeCBM: 0.05, avgWeightKG: 2 },
  { name: 'Blankets', category: 'Bedroom', avgVolumeCBM: 0.08, avgWeightKG: 5 },
  
  // Living Room
  { name: 'Curtains', category: 'Living Room', avgVolumeCBM: 0.04, avgWeightKG: 3 },
  { name: 'Carpets', category: 'Living Room', avgVolumeCBM: 0.15, avgWeightKG: 10 },
  { name: 'Decorations', category: 'Living Room', avgVolumeCBM: 0.06, avgWeightKG: 5 },
  
  // Electronics
  { name: 'TV', category: 'Electronics', avgVolumeCBM: 0.12, avgWeightKG: 15 },
  { name: 'Sound System', category: 'Electronics', avgVolumeCBM: 0.08, avgWeightKG: 8 },
  { name: 'Computer', category: 'Electronics', avgVolumeCBM: 0.06, avgWeightKG: 10 },
  
  // Clothing
  { name: 'Clothes (bag)', category: 'Clothing', avgVolumeCBM: 0.08, avgWeightKG: 12 },
  { name: 'Shoes (box)', category: 'Clothing', avgVolumeCBM: 0.04, avgWeightKG: 5 },
  { name: 'Accessories', category: 'Clothing', avgVolumeCBM: 0.03, avgWeightKG: 3 },
  
  // Toys & Games
  { name: 'Toys', category: 'Toys & Games', avgVolumeCBM: 0.06, avgWeightKG: 5 },
  { name: 'Books', category: 'Toys & Games', avgVolumeCBM: 0.05, avgWeightKG: 10 },
  { name: 'Sports Equipment', category: 'Toys & Games', avgVolumeCBM: 0.08, avgWeightKG: 8 },
];
