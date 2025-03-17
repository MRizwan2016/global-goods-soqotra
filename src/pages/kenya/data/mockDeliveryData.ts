
import { CargoDelivery, Driver, Vehicle } from "../types/deliveryTracking";

export const mockDrivers: Driver[] = [
  {
    id: "DRV001",
    name: "John Kamau",
    licenseNumber: "KE23456789",
    contactNumber: "+254712345678",
    status: "available"
  },
  {
    id: "DRV002",
    name: "Michael Odhiambo",
    licenseNumber: "KE34567890",
    contactNumber: "+254723456789",
    status: "on-delivery"
  },
  {
    id: "DRV003",
    name: "Sarah Wanjiku",
    licenseNumber: "KE45678901",
    contactNumber: "+254734567890",
    status: "available"
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: "VEH001",
    registrationNumber: "KBZ 123A",
    type: "truck",
    capacity: "10 tonnes",
    status: "available"
  },
  {
    id: "VEH002",
    registrationNumber: "KCF 456B",
    type: "van",
    capacity: "3 tonnes",
    status: "on-delivery"
  },
  {
    id: "VEH003",
    registrationNumber: "KDG 789C",
    type: "truck",
    capacity: "15 tonnes",
    status: "available"
  }
];

export const mockDeliveries: CargoDelivery[] = [
  {
    id: "DEL001",
    invoiceId: "INV001",
    invoiceNumber: "13136051",
    originWarehouse: "Mombasa CFS",
    destinationWarehouse: "Nairobi CFS",
    sender: {
      name: "Soqotra Logistics Doha",
      contactNumber: "+974123456789",
      address: "Doha Industrial Area, Qatar"
    },
    receiver: {
      name: "Jane Akinyi",
      contactNumber: "+254712345678",
      address: "123 Moi Avenue, Nairobi"
    },
    deliveryLocation: {
      county: "Nairobi",
      district: "Central Business District",
      address: "123 Moi Avenue, Nairobi"
    },
    assignedDriver: mockDrivers[1],
    assignedVehicle: mockVehicles[1],
    collectionDate: "2023-06-15",
    estimatedDeliveryDate: "2023-06-20",
    paymentStatus: "completed",
    deliveryStatuses: [
      {
        id: "STA001",
        status: "pending",
        timestamp: "2023-06-12T10:00:00Z",
        notes: "Invoice created",
        updatedBy: "System"
      },
      {
        id: "STA002",
        status: "processing",
        timestamp: "2023-06-15T08:30:00Z",
        notes: "Cargo received at Mombasa CFS",
        location: "Mombasa CFS",
        updatedBy: "Mary Operator"
      },
      {
        id: "STA003",
        status: "in-transit",
        timestamp: "2023-06-16T09:15:00Z",
        notes: "En route to Nairobi CFS",
        updatedBy: "Michael Odhiambo"
      }
    ],
    isDoorToDoor: true,
    cargoDetails: {
      weight: "500",
      volume: "4",
      packages: "12",
      description: "Household items and electronics"
    }
  },
  {
    id: "DEL002",
    invoiceId: "INV002",
    invoiceNumber: "13136052",
    originWarehouse: "Mombasa CFS",
    destinationWarehouse: "Mombasa CFS",
    sender: {
      name: "Soqotra Logistics Dubai",
      contactNumber: "+971234567890",
      address: "Jebel Ali, Dubai, UAE"
    },
    receiver: {
      name: "Peter Kipchoge",
      contactNumber: "+254723456789",
      address: "456 Nyali Road, Mombasa"
    },
    deliveryLocation: {
      county: "Mombasa",
      district: "Nyali",
      address: "456 Nyali Road, Mombasa"
    },
    collectionDate: "2023-06-18",
    estimatedDeliveryDate: "2023-06-19",
    paymentStatus: "pending",
    deliveryStatuses: [
      {
        id: "STA004",
        status: "pending",
        timestamp: "2023-06-14T14:00:00Z",
        notes: "Invoice created",
        updatedBy: "System"
      },
      {
        id: "STA005",
        status: "processing",
        timestamp: "2023-06-18T10:45:00Z",
        notes: "Cargo received at Mombasa CFS",
        location: "Mombasa CFS",
        updatedBy: "John Operator"
      }
    ],
    isDoorToDoor: true,
    cargoDetails: {
      weight: "300",
      volume: "2",
      packages: "5",
      description: "Construction materials"
    }
  },
  {
    id: "DEL003",
    invoiceId: "INV003",
    invoiceNumber: "13136053",
    originWarehouse: "Mombasa CFS",
    destinationWarehouse: "Nairobi CFS",
    sender: {
      name: "Soqotra Logistics Sharjah",
      contactNumber: "+97123456789",
      address: "Sharjah Industrial Area, UAE"
    },
    receiver: {
      name: "Samuel Waweru",
      contactNumber: "+254734567890",
      address: "789 Uhuru Highway, Nairobi"
    },
    deliveryLocation: {
      county: "Nairobi",
      district: "Industrial Area",
      address: "789 Uhuru Highway, Nairobi"
    },
    assignedDriver: mockDrivers[0],
    assignedVehicle: mockVehicles[0],
    collectionDate: "2023-06-20",
    estimatedDeliveryDate: "2023-06-25",
    actualDeliveryDate: "2023-06-24",
    paymentStatus: "completed",
    deliveryStatuses: [
      {
        id: "STA006",
        status: "pending",
        timestamp: "2023-06-17T09:00:00Z",
        notes: "Invoice created",
        updatedBy: "System"
      },
      {
        id: "STA007",
        status: "processing",
        timestamp: "2023-06-20T11:30:00Z",
        notes: "Cargo received at Mombasa CFS",
        location: "Mombasa CFS",
        updatedBy: "Mary Operator"
      },
      {
        id: "STA008",
        status: "in-transit",
        timestamp: "2023-06-21T07:15:00Z",
        notes: "En route to Nairobi CFS",
        updatedBy: "John Kamau"
      },
      {
        id: "STA009",
        status: "at-warehouse",
        timestamp: "2023-06-22T16:45:00Z",
        notes: "Arrived at Nairobi CFS",
        location: "Nairobi CFS",
        updatedBy: "Jane Operator"
      },
      {
        id: "STA010",
        status: "out-for-delivery",
        timestamp: "2023-06-24T08:30:00Z",
        notes: "Out for delivery to customer",
        updatedBy: "John Kamau"
      },
      {
        id: "STA011",
        status: "delivered",
        timestamp: "2023-06-24T14:20:00Z",
        notes: "Successfully delivered to customer",
        updatedBy: "John Kamau"
      }
    ],
    isDoorToDoor: true,
    cargoDetails: {
      weight: "750",
      volume: "6",
      packages: "18",
      description: "Commercial goods and equipment"
    }
  }
];
