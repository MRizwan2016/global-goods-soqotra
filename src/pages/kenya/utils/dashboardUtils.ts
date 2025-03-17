
import { mockDeliveries } from "../data/mockDeliveryData";

// Delivery data stats
export const getDeliveryStats = () => {
  const total = mockDeliveries.length;
  const delivered = mockDeliveries.filter(d => 
    d.deliveryStatuses.some(s => s.status === 'delivered')
  ).length;
  
  const inTransit = mockDeliveries.filter(d => 
    d.deliveryStatuses.some(s => s.status === 'in-transit') &&
    !d.deliveryStatuses.some(s => s.status === 'delivered')
  ).length;
  
  const pending = total - delivered - inTransit;
  
  return {
    total,
    delivered,
    inTransit,
    pending
  };
};

// Count cargo by county
export const cargoByCounty = [
  { name: "Nairobi", value: 42 },
  { name: "Mombasa", value: 28 },
  { name: "Kisumu", value: 15 },
  { name: "Nakuru", value: 10 },
  { name: "Other", value: 5 }
];

// Monthly shipment data
export const monthlyShipments = [
  { name: "Jan", shipments: 48 },
  { name: "Feb", shipments: 52 },
  { name: "Mar", shipments: 61 },
  { name: "Apr", shipments: 65 },
  { name: "May", shipments: 75 },
  { name: "Jun", shipments: 68 }
];

// Pie chart colors
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
