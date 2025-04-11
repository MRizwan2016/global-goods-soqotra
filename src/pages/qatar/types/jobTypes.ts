
export interface QatarJob {
  id: string;
  jobNumber: string;
  invoiceNumber: string;
  jobType: "COLLECTION" | "DELIVERY" | "PACKING" | "UNPACKING";
  date: string;
  time: string;
  amPm: "AM" | "PM";
  customer: string;
  mobileNumber: string;
  landNumber: string;
  sector: string;
  branch: string;
  city: string;
  town: string;
  location: string;
  vehicle: string;
  remarks: string;
  advanceAmount: number;
  status: "PENDING" | "COMPLETED" | "SCHEDULED" | "IN_PROGRESS" | "CANCELLED";
  sameDay: "Y" | "N";
  collectDate?: string;
  items?: JobItem[];
  entryBy: string;
  entryDate: string;
  sequenceNum?: number;
  country?: string;
}

export interface JobItem {
  id: string;
  jobId?: string; // Make jobId optional for better form handling
  itemName: string;
  sellPrice: number;
  quantity: number;
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

export interface QatarCity {
  id: string;
  name: string;
  code: string;
}

export interface QatarVehicle {
  id: string;
  number: string;
  type: string;
  description: string;
}

export interface QatarSector {
  id: string;
  name: string;
  code: string;
}

export interface QatarBranch {
  id: string;
  name: string;
  code: string;
  sector: string;
}
