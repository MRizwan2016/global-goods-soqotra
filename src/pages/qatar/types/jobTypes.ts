
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
  mobileNumber: string;
  jobType: 'COLLECTION' | 'DELIVERY';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  isAssigned?: boolean;
  vehicle?: string;
  driver?: string;
  helper?: string;
  scheduleNumber?: string;
}
