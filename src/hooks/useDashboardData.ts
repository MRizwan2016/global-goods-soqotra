
import { useState, useEffect } from "react";
import { 
  kenyaShipmentData, 
  philippinesShipmentData, 
  sriLankaShipmentData,
  somaliaShipmentData
} from "@/data/mockData";

// Mock data for Tunisia and Uganda
const tunisiaShipmentData = [
  { name: "Jan", shipments: 45 },
  { name: "Feb", shipments: 52 },
  { name: "Mar", shipments: 48 },
  { name: "Apr", shipments: 61 },
  { name: "May", shipments: 55 },
  { name: "Jun", shipments: 67 }
];

const ugandaShipmentData = [
  { name: "Jan", shipments: 38 },
  { name: "Feb", shipments: 42 },
  { name: "Mar", shipments: 55 },
  { name: "Apr", shipments: 49 },
  { name: "May", shipments: 62 },
  { name: "Jun", shipments: 58 }
];

export const useDashboardData = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return {
    isLoaded,
    shipmentData: {
      kenya: kenyaShipmentData,
      tunisia: tunisiaShipmentData,
      uganda: ugandaShipmentData,
      philippines: philippinesShipmentData,
      sriLanka: sriLankaShipmentData,
      somalia: somaliaShipmentData
    }
  };
};
