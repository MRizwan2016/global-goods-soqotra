
import { DailyJobForecast, QatarBranch, QatarCity, QatarJob, QatarSector, QatarVehicle, VehicleStats } from "../types/jobTypes";

export const mockJobs: QatarJob[] = [
  {
    id: "1",
    jobNumber: "29911",
    invoiceNumber: "208408",
    jobType: "COLLECTION",
    date: "26/03/2025",
    time: "00:00",
    amPm: "AM",
    customer: "--",
    mobileNumber: "33757301",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "DOHA",
    city: "DOHA",
    town: "ROUD AL HAMMAM",
    location: "Location details",
    vehicle: "41067",
    remarks: "",
    advanceAmount: 300,
    status: "PENDING",
    sameDay: "N",
    entryBy: "alihq/19/03/2025/09:53:57",
    entryDate: "19/03/2025",
    items: [
      {
        id: "1",
        jobId: "1",
        itemName: "Package 1",
        sellPrice: 0,
        quantity: 1
      }
    ]
  },
  {
    id: "2",
    jobNumber: "29911",
    invoiceNumber: "208408",
    jobType: "DELIVERY",
    date: "19/03/2025",
    time: "00:00",
    amPm: "AM",
    customer: "--",
    mobileNumber: "33757301",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "DOHA",
    city: "DOHA",
    town: "ROUD AL HAMMAM",
    location: "Location details",
    vehicle: "41067",
    remarks: "",
    advanceAmount: 0,
    status: "SCHEDULED",
    sameDay: "N",
    entryBy: "alihq/19/03/2025/09:53:57",
    entryDate: "19/03/2025"
  }
];

export const mockVehicleStats: VehicleStats[] = [
  { vehicle: "41067", totalJobs: 8, deliveries: 3, collections: 5 },
  { vehicle: "41073", totalJobs: 5, deliveries: 2, collections: 3 },
  { vehicle: "119927", totalJobs: 1, deliveries: 0, collections: 1 }
];

export const mockDailyJobForecasts: DailyJobForecast[] = [
  { date: "19/03/2025", day: "WED", totalJobs: 14, deliveries: 5, collections: 9 },
  { date: "20/03/2025", day: "THU", totalJobs: 4, deliveries: 1, collections: 3 },
  { date: "21/03/2025", day: "FRI", totalJobs: 4, deliveries: 0, collections: 4 },
  { date: "22/03/2025", day: "SAT", totalJobs: 4, deliveries: 1, collections: 3 },
  { date: "24/03/2025", day: "MON", totalJobs: 2, deliveries: 0, collections: 2 },
  { date: "26/03/2025", day: "WED", totalJobs: 4, deliveries: 0, collections: 4 },
  { date: "27/03/2025", day: "THU", totalJobs: 3, deliveries: 0, collections: 3 },
  { date: "30/03/2025", day: "SUN", totalJobs: 2, deliveries: 1, collections: 1 },
  { date: "31/03/2025", day: "MON", totalJobs: 6, deliveries: 2, collections: 4 },
  { date: "01/04/2025", day: "TUE", totalJobs: 1, deliveries: 0, collections: 1 },
  { date: "15/04/2025", day: "TUE", totalJobs: 1, deliveries: 0, collections: 1 },
  { date: "22/04/2025", day: "TUE", totalJobs: 2, deliveries: 0, collections: 2 },
  { date: "23/04/2025", day: "WED", totalJobs: 1, deliveries: 0, collections: 1 },
  { date: "29/04/2025", day: "TUE", totalJobs: 2, deliveries: 0, collections: 2 },
  { date: "30/04/2025", day: "WED", totalJobs: 7, deliveries: 1, collections: 6 },
  { date: "08/05/2025", day: "THU", totalJobs: 1, deliveries: 0, collections: 1 },
  { date: "13/05/2025", day: "TUE", totalJobs: 1, deliveries: 0, collections: 1 }
];

export const mockVehicles: QatarVehicle[] = [
  { id: "1", number: "41070", type: "Lorry", description: "Diesel/41070/255" },
  { id: "2", number: "41067", type: "Lorry", description: "Diesel/41067/255" },
  { id: "3", number: "41504", type: "Lorry", description: "Diesel/41504/255" },
  { id: "4", number: "41073", type: "Lorry", description: "Diesel/41073/255" },
  { id: "5", number: "119927", type: "Lorry", description: "Petrol/119927/259" }
];

export const mockCities: QatarCity[] = [
  { id: "1", name: "DOHA", code: "171" },
  { id: "2", name: "AL WAKRA", code: "172" },
  { id: "3", name: "AL KHOR", code: "173" },
  { id: "4", name: "LUSAIL", code: "174" }
];

export const mockSectors: QatarSector[] = [
  { id: "1", name: "COLOMBO", code: "C" },
  { id: "2", name: "SRI LANKA", code: "SL" },
  { id: "3", name: "DUBAI", code: "DXB" },
  { id: "4", name: "QATAR", code: "QTR" }
];

export const mockBranches: QatarBranch[] = [
  { id: "1", name: "DOHA", code: "HOF", sector: "COLOMBO" },
  { id: "2", name: "AL WAKRA", code: "AWB", sector: "COLOMBO" },
  { id: "3", name: "AL KHOR", code: "AKB", sector: "SRI LANKA" },
  { id: "4", name: "DOHA", code: "DOH", sector: "DUBAI" }
];

export const getJobStats = () => {
  const total = mockJobs.length;
  const completed = mockJobs.filter(job => job.status === "COMPLETED").length;
  const inProgress = mockJobs.filter(job => job.status === "IN_PROGRESS").length;
  const pending = mockJobs.filter(job => job.status === "PENDING").length;
  
  return {
    total,
    completed,
    inProgress,
    pending
  };
};

// Calculate totals
export const getTotals = () => {
  const totalJobs = mockVehicleStats.reduce((sum, stats) => sum + stats.totalJobs, 0);
  const totalDeliveries = mockVehicleStats.reduce((sum, stats) => sum + stats.deliveries, 0);
  const totalCollections = mockVehicleStats.reduce((sum, stats) => sum + stats.collections, 0);
  
  return {
    totalJobs,
    totalDeliveries,
    totalCollections
  };
};
