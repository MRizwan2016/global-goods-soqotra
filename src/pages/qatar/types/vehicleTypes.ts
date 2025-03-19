export interface QatarVehicle {
  id: string;
  number: string;
  type: string;
  description: string;
  status: "RUN" | "GARAGE" | "MAINTENANCE";
  licenseExpiry: string;
  insuranceExpiry: string;
  mileage: string;
}

export interface QatarDriver {
  id: string;
  name: string;
  code: string;
  mobileNumber: string;
  licenseNumber: string;
  licenseExpiry: string;
  employmentStatus?: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
  assignedVehicleId?: string;
  assignedVehicleNumber?: string;
}

export interface VehicleStats {
  vehicle: string;
  totalJobs: number;
  deliveries: number;
  collections: number;
}

export interface DailyJobForecast {
  date: string;
  day: string;
  totalJobs: number;
  deliveries: number;
  collections: number;
}

export interface JobStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

export interface JobTotals {
  totalJobs: number;
  totalDeliveries: number;
  totalCollections: number;
}
