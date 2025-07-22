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
    burundi: {
      bujumbura: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
    };
    algeria: {
      algiers: {
        price: number;
        documentsFee: number;
        isVolumeBasedPricing: false;
      };
    };
    ghana: {
      accra: {
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

// Helper function to calculate default pricing for other countries
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
    },
    burundi: {
      bujumbura: {
        price: weightKg * 11.5,
        documentsFee: 50,
        isVolumeBasedPricing: false as const
      }
    },
    algeria: {
      algiers: {
        price: weightKg * 10.8,
        documentsFee: 45,
        isVolumeBasedPricing: false as const
      }
    },
    ghana: {
      accra: {
        price: weightKg * 9.2,
        documentsFee: 40,
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
  },
  
  // New packages from the second attachment with dimensions
  {
    id: 16,
    description: "TOYS",
    dimensions: { length: 23, width: 10, height: 5 },
    volumeInMeters: 0.001,
    weightInKg: 5,
    pricing: calculateDefaultPricing(15.00, 5),
    price: 15.00,
    documentsFee: 0.00,
    total: 15.00
  },
  {
    id: 17,
    description: "BLANKET GIFT",
    dimensions: { length: 20, width: 15, height: 7 },
    volumeInMeters: 0.002,
    weightInKg: 3,
    pricing: calculateDefaultPricing(18.00, 3),
    price: 18.00,
    documentsFee: 0.00,
    total: 18.00
  },
  {
    id: 18,
    description: "EXCERISE MACHINE",
    dimensions: { length: 30, width: 11, height: 20 },
    volumeInMeters: 0.007,
    weightInKg: 15,
    pricing: calculateDefaultPricing(35.00, 15),
    price: 35.00,
    documentsFee: 0.00,
    total: 35.00
  },
  {
    id: 19,
    description: "SPEAKER SET",
    dimensions: { length: 17, width: 17, height: 27 },
    volumeInMeters: 0.008,
    weightInKg: 8,
    pricing: calculateDefaultPricing(30.00, 8),
    price: 30.00,
    documentsFee: 0.00,
    total: 30.00
  },
  {
    id: 20,
    description: "PARTY BOX WITH GAS COOLING",
    dimensions: { length: 19, width: 16, height: 29 },
    volumeInMeters: 0.009,
    weightInKg: 12,
    pricing: calculateDefaultPricing(40.00, 12),
    price: 40.00,
    documentsFee: 0.00,
    total: 40.00
  },
  {
    id: 21,
    description: "COMMODE SET (P/E)",
    dimensions: { length: 15, width: 27, height: 28 },
    volumeInMeters: 0.011,
    weightInKg: 10,
    pricing: calculateDefaultPricing(42.00, 10),
    price: 42.00,
    documentsFee: 0.00,
    total: 42.00
  },
  {
    id: 22,
    description: "CARTON BOX (PE)",
    dimensions: { length: 20, width: 20, height: 27 },
    volumeInMeters: 0.011,
    weightInKg: 7,
    pricing: calculateDefaultPricing(40.00, 7),
    price: 40.00,
    documentsFee: 0.00,
    total: 40.00
  },
  {
    id: 23,
    description: "CARTON BOX 0.188 (P/E)",
    dimensions: { length: 20, width: 20, height: 28 },
    volumeInMeters: 0.011,
    weightInKg: 8,
    pricing: calculateDefaultPricing(42.00, 8),
    price: 42.00,
    documentsFee: 0.00,
    total: 42.00
  },
  {
    id: 24,
    description: "CARTON BOX (PE) - 0.181 METER",
    dimensions: { length: 20, width: 20, height: 27 },
    volumeInMeters: 0.011,
    weightInKg: 7,
    pricing: calculateDefaultPricing(40.00, 7),
    price: 40.00,
    documentsFee: 0.00,
    total: 40.00
  },
  {
    id: 25,
    description: "CARTON BOX (P/E) 0.248",
    dimensions: { length: 23, width: 23, height: 28 },
    volumeInMeters: 0.015,
    weightInKg: 9,
    pricing: calculateDefaultPricing(45.00, 9),
    price: 45.00,
    documentsFee: 0.00,
    total: 45.00
  },
  {
    id: 26,
    description: "PLASTIC DRUM",
    dimensions: { length: 22, width: 22, height: 34 },
    volumeInMeters: 0.016,
    weightInKg: 12,
    pricing: calculateDefaultPricing(48.00, 12),
    price: 48.00,
    documentsFee: 0.00,
    total: 48.00
  },
  {
    id: 27,
    description: "COMMODE SET",
    dimensions: { length: 31, width: 17, height: 35 },
    volumeInMeters: 0.018,
    weightInKg: 15,
    pricing: calculateDefaultPricing(50.00, 15),
    price: 50.00,
    documentsFee: 0.00,
    total: 50.00
  },
  {
    id: 28,
    description: "CARTON BUNDLE",
    dimensions: { length: 29, width: 25, height: 30 },
    volumeInMeters: 0.022,
    weightInKg: 14,
    pricing: calculateDefaultPricing(52.00, 14),
    price: 52.00,
    documentsFee: 0.00,
    total: 52.00
  },
  {
    id: 29,
    description: "WOODEN BOX (PE) 0.995",
    dimensions: { length: 39, width: 39, height: 39 },
    volumeInMeters: 0.059,
    weightInKg: 30,
    pricing: calculateDefaultPricing(120.00, 30),
    price: 120.00,
    documentsFee: 0.00,
    total: 120.00
  },
  {
    id: 30,
    description: "PLASTIC TANK",
    dimensions: { length: 48, width: 39, height: 38 },
    volumeInMeters: 0.071,
    weightInKg: 25,
    pricing: calculateDefaultPricing(135.00, 25),
    price: 135.00,
    documentsFee: 0.00,
    total: 135.00
  },
  {
    id: 31,
    description: "WOODEN BOX 1.5 METER LONG (UPB)",
    dimensions: { length: 59, width: 39, height: 39 },
    volumeInMeters: 0.09,
    weightInKg: 45,
    pricing: calculateDefaultPricing(180.00, 45),
    price: 180.00,
    documentsFee: 50.00,
    total: 230.00
  },
  {
    id: 32,
    description: "WOODEN BOX 1.5 METER LONG (GIFT)",
    dimensions: { length: 59, width: 39, height: 39 },
    volumeInMeters: 0.09,
    weightInKg: 45,
    pricing: calculateDefaultPricing(180.00, 45),
    price: 180.00,
    documentsFee: 50.00,
    total: 230.00
  },
  {
    id: 33,
    description: "WOODEN CRATE (STEEL FRAME) MOTOR BICYCLE",
    dimensions: { length: 86, width: 31, height: 49 },
    volumeInMeters: 0.131,
    weightInKg: 60,
    pricing: calculateDefaultPricing(250.00, 60),
    price: 250.00,
    documentsFee: 50.00,
    total: 300.00
  },
  {
    id: 34,
    description: "MOTOR BICYCLE WITH WOODEN CRATE",
    dimensions: { length: 90, width: 30, height: 50 },
    volumeInMeters: 0.135,
    weightInKg: 65,
    pricing: calculateDefaultPricing(260.00, 65),
    price: 260.00,
    documentsFee: 50.00,
    total: 310.00
  },
  {
    id: 35,
    description: "MOTOR BICYCLE WITH STEEL FRAME",
    dimensions: { length: 90, width: 30, height: 50 },
    volumeInMeters: 0.135,
    weightInKg: 65,
    pricing: calculateDefaultPricing(260.00, 65),
    price: 260.00,
    documentsFee: 50.00,
    total: 310.00
  },
  {
    id: 36,
    description: "DRUM - SMALL",
    dimensions: { length: 19, width: 19, height: 37 },
    volumeInMeters: 0.224,
    weightInKg: 18,
    pricing: calculateDefaultPricing(90.00, 18),
    price: 90.00,
    documentsFee: 0.00,
    total: 90.00
  },
  {
    id: 37,
    description: "SUB WOOFER (P/E)",
    dimensions: { length: 419, width: 15, height: 43 },
    volumeInMeters: 0.27,
    weightInKg: 25,
    pricing: calculateDefaultPricing(100.00, 25),
    price: 100.00,
    documentsFee: 0.00,
    total: 100.00
  },
  
  // New packages from the third attachment (without dimensions - set to 0)
  {
    id: 38,
    description: "CABIN TRUNK (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(35.00, 10),
    price: 35.00,
    documentsFee: 0.00,
    total: 35.00
  },
  {
    id: 39,
    description: "CARPET BUNDLE (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(40.00, 12),
    price: 40.00,
    documentsFee: 0.00,
    total: 40.00
  },
  {
    id: 40,
    description: "CARTON BOX (GIFT)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(30.00, 8),
    price: 30.00,
    documentsFee: 0.00,
    total: 30.00
  },
  {
    id: 41,
    description: "CASSETTE RADIO SET (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(25.00, 7),
    price: 25.00,
    documentsFee: 0.00,
    total: 25.00
  },
  {
    id: 42,
    description: "CHAIR BUNDLE (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(35.00, 15),
    price: 35.00,
    documentsFee: 0.00,
    total: 35.00
  },
  {
    id: 43,
    description: "CLOTH RACK (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(40.00, 12),
    price: 40.00,
    documentsFee: 0.00,
    total: 40.00
  },
  {
    id: 44,
    description: "COMPUTER (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(50.00, 18),
    price: 50.00,
    documentsFee: 0.00,
    total: 50.00
  },
  {
    id: 45,
    description: "CUPBOARD BUNDLE (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(75.00, 25),
    price: 75.00,
    documentsFee: 0.00,
    total: 75.00
  },
  {
    id: 46,
    description: "CUPBOARD (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(60.00, 20),
    price: 60.00,
    documentsFee: 0.00,
    total: 60.00
  },
  {
    id: 47,
    description: "DEEP FREEZER (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(80.00, 30),
    price: 80.00,
    documentsFee: 0.00,
    total: 80.00
  },
  {
    id: 48,
    description: "ELECTRIC FAN (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(25.00, 8),
    price: 25.00,
    documentsFee: 0.00,
    total: 25.00
  },
  {
    id: 49,
    description: "FAN BOX (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(30.00, 10),
    price: 30.00,
    documentsFee: 0.00,
    total: 30.00
  },
  {
    id: 50,
    description: "FURNITURE (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(90.00, 35),
    price: 90.00,
    documentsFee: 0.00,
    total: 90.00
  },
  {
    id: 51,
    description: "GAS COOKER (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(45.00, 15),
    price: 45.00,
    documentsFee: 0.00,
    total: 45.00
  },
  {
    id: 52,
    description: "GO-CART (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(55.00, 20),
    price: 55.00,
    documentsFee: 0.00,
    total: 55.00
  },
  {
    id: 53,
    description: "HOME THEATOR SET (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(70.00, 25),
    price: 70.00,
    documentsFee: 0.00,
    total: 70.00
  },
  {
    id: 54,
    description: "IRON BOARD (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(20.00, 5),
    price: 20.00,
    documentsFee: 0.00,
    total: 20.00
  },
  {
    id: 55,
    description: "LCD TV (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(65.00, 20),
    price: 65.00,
    documentsFee: 0.00,
    total: 65.00
  },
  {
    id: 56,
    description: "LED TV (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(70.00, 15),
    price: 70.00,
    documentsFee: 0.00,
    total: 70.00
  },
  {
    id: 57,
    description: "MATTRESS",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(45.00, 18),
    price: 45.00,
    documentsFee: 0.00,
    total: 45.00
  },
  {
    id: 58,
    description: "MATTRESS BUNDLE",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(60.00, 30),
    price: 60.00,
    documentsFee: 0.00,
    total: 60.00
  },
  {
    id: 59,
    description: "MICRO OVEN (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(35.00, 12),
    price: 35.00,
    documentsFee: 0.00,
    total: 35.00
  },
  {
    id: 60,
    description: "MIRROR (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(40.00, 10),
    price: 40.00,
    documentsFee: 0.00,
    total: 40.00
  },
  {
    id: 61,
    description: "ORGAN (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(75.00, 25),
    price: 75.00,
    documentsFee: 0.00,
    total: 75.00
  },
  {
    id: 62,
    description: "PALLET (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(85.00, 40),
    price: 85.00,
    documentsFee: 0.00,
    total: 85.00
  },
  {
    id: 63,
    description: "PLASTIC BOX (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(30.00, 8),
    price: 30.00,
    documentsFee: 0.00,
    total: 30.00
  },
  {
    id: 64,
    description: "REFRIGERATOR (P/E)",
    dimensions: { length: 0, width: 0, height: 0 },
    volumeInMeters: 0,
    weightInKg: 0,
    pricing: calculateDefaultPricing(90.00, 35),
    price: 90.00,
    documentsFee: 0.00,
    total: 90.00
  }
];
