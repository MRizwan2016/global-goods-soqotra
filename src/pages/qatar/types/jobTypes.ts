
export interface QatarJob {
  id: string;
  jobNumber: string;
  customer: string;
  date: string;
  time: string;
  amPm: 'AM' | 'PM';
  location: string;
  city: string;
  town?: string;
  sector?: string;
  branch?: string; // Added the branch property
  mobileNumber: string;
  jobType: 'COLLECTION' | 'DELIVERY';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'SCHEDULED';
  isAssigned?: boolean;
  vehicle?: string;
  driver?: string;
  helper?: string;
  scheduleNumber?: string;
  // Additional properties needed for various components
  sameDay?: string;
  landNumber?: string;
  sequenceNum?: number;
  advanceAmount?: number;
  invoiceNumber?: string;
  cancellationReason?: string;
  cancellationDate?: string;
  completionDate?: string;
  completionNotes?: string;
  remarks?: string;
  entryBy?: string;
  items?: JobItem[];
  collectDate?: string; // Added this as it's used in mockJobs.ts
  entryDate?: string; // Added this as it's used in mockJobs.ts
}

export interface JobItem {
  id: string;
  name?: string;
  quantity: number;
  description?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  
  // Additional properties used in the application
  itemName?: string;
  sellPrice?: number;
  jobId?: string;
  boxNumber?: string; // Added boxNumber property to fix the error
}

// Types used in dashboard components
export interface DailyJobForecast {
  date: string;
  day: string;
  totalJobs: number;
  deliveries: number;
  collections: number;
}

export interface VehicleStats {
  vehicle: string;
  totalJobs: number;
  deliveries: number;
  collections: number;
}

// Location related types
export interface QatarCity {
  id: string;
  name: string;
  code: string;
}

export interface QatarSector {
  id: string;
  name: string;
  code: string;
}

export interface QatarBranch {
  id: string;
  sector: string;
  name: string;
  code: string;
}
