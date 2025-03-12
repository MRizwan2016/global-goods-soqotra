export interface PackageOption {
  id: number;
  description: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  volumeInMeters: number;
  price: number;
  documentsFee: number;
  total: number;
}

export const packageOptions: PackageOption[] = [
  {
    id: 1,
    description: "1 METER WOODEN BOX",
    dimensions: { length: 48, width: 32, height: 36 },
    volumeInMeters: 0.928,
    price: 338.55,
    documentsFee: 0.00,
    total: 338.55
  },
  {
    id: 2,
    description: "1.5 METER WOODEN BOX",
    dimensions: { length: 48, width: 36, height: 48 },
    volumeInMeters: 1.391,
    price: 507.83,
    documentsFee: 50.00,
    total: 557.83
  },
  {
    id: 3,
    description: "2 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 48 },
    volumeInMeters: 1.855,
    price: 677.10,
    documentsFee: 50.00,
    total: 727.10
  },
  {
    id: 4,
    description: "3 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 72 },
    volumeInMeters: 2.782,
    price: 1015.65,
    documentsFee: 50.00,
    total: 1065.65
  },
  {
    id: 5,
    description: "4 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 96 },
    volumeInMeters: 3.710,
    price: 1354.20,
    documentsFee: 50.00,
    total: 1404.20
  },
  {
    id: 6,
    description: "5 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 120 },
    volumeInMeters: 4.637,
    price: 1692.75,
    documentsFee: 50.00,
    total: 1742.75
  },
  {
    id: 7,
    description: "6 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 144 },
    volumeInMeters: 5.565,
    price: 2031.30,
    documentsFee: 50.00,
    total: 2081.30
  },
  {
    id: 8,
    description: "7 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 168 },
    volumeInMeters: 6.492,
    price: 2369.85,
    documentsFee: 50.00,
    total: 2419.85
  },
  {
    id: 9,
    description: "8 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 192 },
    volumeInMeters: 7.420,
    price: 2708.40,
    documentsFee: 50.00,
    total: 2758.40
  },
  {
    id: 10,
    description: "9 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 216 },
    volumeInMeters: 8.347,
    price: 3046.95,
    documentsFee: 50.00,
    total: 3096.95
  },
  {
    id: 11,
    description: "10 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 240 },
    volumeInMeters: 9.275,
    price: 3385.50,
    documentsFee: 50.00,
    total: 3435.50
  },
  {
    id: 12,
    description: "SMALL CARTON BOX",
    dimensions: { length: 16, width: 12, height: 12 },
    volumeInMeters: 0.037,
    price: 13.54,
    documentsFee: 0.00,
    total: 13.54
  },
  {
    id: 13,
    description: "MEDIUM CARTON BOX",
    dimensions: { length: 18, width: 18, height: 16 },
    volumeInMeters: 0.083,
    price: 30.47,
    documentsFee: 0.00,
    total: 30.47
  },
  {
    id: 14,
    description: "LARGE CARTON BOX",
    dimensions: { length: 24, width: 18, height: 18 },
    volumeInMeters: 0.124,
    price: 45.70,
    documentsFee: 0.00,
    total: 45.70
  },
  {
    id: 15,
    description: "TRAVELLING BAG",
    dimensions: { length: 16, width: 23, height: 32 },
    volumeInMeters: 0.198,
    price: 72.10,
    documentsFee: 0.00,
    total: 72.10
  }
];
