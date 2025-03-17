
export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  contactNumber: string;
  status: 'available' | 'on-delivery' | 'unavailable';
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: 'truck' | 'van' | 'motorcycle';
  capacity: string;
  status: 'available' | 'on-delivery' | 'maintenance';
}

export interface DeliveryLocation {
  county: string;
  district: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface DeliveryStatus {
  id: string;
  status: 'pending' | 'processing' | 'in-transit' | 'at-warehouse' | 'out-for-delivery' | 'delivered' | 'failed';
  timestamp: string;
  notes?: string;
  location?: string;
  updatedBy: string;
}

export interface CargoDelivery {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  originWarehouse: 'Mombasa CFS' | 'Nairobi CFS' | string;
  destinationWarehouse: 'Mombasa CFS' | 'Nairobi CFS' | string;
  sender: {
    name: string;
    contactNumber: string;
    address: string;
  };
  receiver: {
    name: string;
    contactNumber: string;
    address: string;
  };
  deliveryLocation: DeliveryLocation;
  assignedDriver?: Driver;
  assignedVehicle?: Vehicle;
  collectionDate: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  paymentStatus: 'pending' | 'partial' | 'completed';
  deliveryStatuses: DeliveryStatus[];
  isDoorToDoor: boolean;
  cargoDetails: {
    weight: string;
    volume: string;
    packages: string;
    description: string;
  };
}
