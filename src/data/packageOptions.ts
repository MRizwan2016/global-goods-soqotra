
export interface PackageOption {
  id: number;
  description: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  volumeInMeters: number;
  weightInKg: number;
  pricing: {
    // Volume-based pricing
    sriLanka: {
      price: number;
      documentsFee: number;
      isVolumeBasedPricing: true;
    };
    philippines: {
      price: number;
      documentsFee: number;
      isVolumeBasedPricing: true;
    };
    // Weight-based pricing
    kenya: {
      mombasa: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
      nairobi: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
    };
    eritrea: {
      asmara: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
      hargeisa: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
    };
    sudan: {
      portSudan: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
    };
  };
  // Legacy fields for backward compatibility
  price: number;
  documentsFee: number;
  total: number;
}

// Helper function to calculate default values for other countries
const calculateDefaultPricing = (basePrice: number, weightKg: number) => {
  return {
    sriLanka: {
      price: basePrice,
      documentsFee: basePrice > 300 ? 50 : 0,
      isVolumeBasedPricing: true as const
    },
    philippines: {
      price: basePrice * 0.9,
      documentsFee: basePrice > 300 ? 45 : 0,
      isVolumeBasedPricing: true as const
    },
    kenya: {
      mombasa: {
        price: weightKg * 7.5,
        documentsFee: 35,
        isVolumeBasedPricing: false as const
      },
      nairobi: {
        price: weightKg * 8.2,
        documentsFee: 35,
        isVolumeBasedPricing: false as const
      }
    },
    eritrea: {
      asmara: {
        price: weightKg * 9.5,
        documentsFee: 40,
        isVolumeBasedPricing: false as const
      },
      hargeisa: {
        price: weightKg * 8.7,
        documentsFee: 40,
        isVolumeBasedPricing: false as const
      }
    },
    sudan: {
      portSudan: {
        price: weightKg * 10.2,
        documentsFee: 45,
        isVolumeBasedPricing: false as const
      }
    }
  };
};

export const packageOptions: PackageOption[] = [
  {
    id: 1,
    description: "1 METER WOODEN BOX",
    dimensions: { length: 48, width: 32, height: 36 },
    volumeInMeters: 0.928,
    weightInKg: 65,
    pricing: calculateDefaultPricing(338.55, 65),
    price: 338.55,
    documentsFee: 0.00,
    total: 338.55
  },
  {
    id: 2,
    description: "1.5 METER WOODEN BOX",
    dimensions: { length: 48, width: 36, height: 48 },
    volumeInMeters: 1.391,
    weightInKg: 85,
    pricing: calculateDefaultPricing(507.83, 85),
    price: 507.83,
    documentsFee: 50.00,
    total: 557.83
  },
  {
    id: 3,
    description: "2 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 48 },
    volumeInMeters: 1.855,
    weightInKg: 120,
    pricing: calculateDefaultPricing(677.10, 120),
    price: 677.10,
    documentsFee: 50.00,
    total: 727.10
  },
  {
    id: 4,
    description: "3 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 72 },
    volumeInMeters: 2.782,
    weightInKg: 190,
    pricing: calculateDefaultPricing(1015.65, 190),
    price: 1015.65,
    documentsFee: 50.00,
    total: 1065.65
  },
  {
    id: 5,
    description: "4 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 96 },
    volumeInMeters: 3.710,
    weightInKg: 250,
    pricing: calculateDefaultPricing(1354.20, 250),
    price: 1354.20,
    documentsFee: 50.00,
    total: 1404.20
  },
  {
    id: 6,
    description: "5 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 120 },
    volumeInMeters: 4.637,
    weightInKg: 320,
    pricing: calculateDefaultPricing(1692.75, 320),
    price: 1692.75,
    documentsFee: 50.00,
    total: 1742.75
  },
  {
    id: 7,
    description: "6 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 144 },
    volumeInMeters: 5.565,
    weightInKg: 380,
    pricing: calculateDefaultPricing(2031.30, 380),
    price: 2031.30,
    documentsFee: 50.00,
    total: 2081.30
  },
  {
    id: 8,
    description: "7 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 168 },
    volumeInMeters: 6.492,
    weightInKg: 450,
    pricing: calculateDefaultPricing(2369.85, 450),
    price: 2369.85,
    documentsFee: 50.00,
    total: 2419.85
  },
  {
    id: 9,
    description: "8 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 192 },
    volumeInMeters: 7.420,
    weightInKg: 520,
    pricing: calculateDefaultPricing(2708.40, 520),
    price: 2708.40,
    documentsFee: 50.00,
    total: 2758.40
  },
  {
    id: 10,
    description: "9 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 216 },
    volumeInMeters: 8.347,
    weightInKg: 590,
    pricing: calculateDefaultPricing(3046.95, 590),
    price: 3046.95,
    documentsFee: 50.00,
    total: 3096.95
  },
  {
    id: 11,
    description: "10 METER WOODEN BOX",
    dimensions: { length: 48, width: 48, height: 240 },
    volumeInMeters: 9.275,
    weightInKg: 650,
    pricing: calculateDefaultPricing(3385.50, 650),
    price: 3385.50,
    documentsFee: 50.00,
    total: 3435.50
  },
  {
    id: 12,
    description: "SMALL CARTON BOX",
    dimensions: { length: 16, width: 12, height: 12 },
    volumeInMeters: 0.037,
    weightInKg: 10,
    pricing: calculateDefaultPricing(13.54, 10),
    price: 13.54,
    documentsFee: 0.00,
    total: 13.54
  },
  {
    id: 13,
    description: "MEDIUM CARTON BOX",
    dimensions: { length: 18, width: 18, height: 16 },
    volumeInMeters: 0.083,
    weightInKg: 18,
    pricing: calculateDefaultPricing(30.47, 18),
    price: 30.47,
    documentsFee: 0.00,
    total: 30.47
  },
  {
    id: 14,
    description: "LARGE CARTON BOX",
    dimensions: { length: 24, width: 18, height: 18 },
    volumeInMeters: 0.124,
    weightInKg: 25,
    pricing: calculateDefaultPricing(45.70, 25),
    price: 45.70,
    documentsFee: 0.00,
    total: 45.70
  },
  {
    id: 15,
    description: "TRAVELLING BAG",
    dimensions: { length: 16, width: 23, height: 32 },
    volumeInMeters: 0.198,
    weightInKg: 30,
    pricing: calculateDefaultPricing(72.10, 30),
    price: 72.10,
    documentsFee: 0.00,
    total: 72.10
  }
];
