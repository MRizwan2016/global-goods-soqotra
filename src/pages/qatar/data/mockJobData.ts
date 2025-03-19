import { DailyJobForecast, QatarBranch, QatarCity, QatarJob, QatarSector, QatarVehicle, VehicleStats } from "../types/jobTypes";

export const mockJobs: QatarJob[] = [
  {
    id: "1",
    jobNumber: "29909",
    invoiceNumber: "INV-001",
    jobType: "COLLECTION",
    date: "19/03/2025",
    time: "00:00",
    amPm: "AM",
    customer: "NANDAKUMAR",
    mobileNumber: "55038528",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "BRANCH-1",
    city: "DOHA",
    town: "INDUSTRIAL AREA",
    location: "EZDAN 23",
    vehicle: "41073/Lorry/Diesel/41073/256",
    remarks: "CARTON BOX // PROMOTION BOX // 47 WAREHOUSE DELIVERY",
    advanceAmount: 13,
    status: "SCHEDULED",
    sameDay: "Y",
    collectDate: "19/03/2025",
    items: [
      {
        id: "item-1",
        jobId: "1",
        itemName: "CARTON BOX - SMALL // PROMOTION BOX",
        sellPrice: 50,
        quantity: 1
      }
    ],
    entryBy: "admin",
    entryDate: "18/03/2025"
  },
  {
    id: "2",
    jobNumber: "29909",
    invoiceNumber: "INV-001",
    jobType: "DELIVERY",
    date: "19/03/2025",
    time: "00:00",
    amPm: "AM",
    customer: "NANDAKUMAR",
    mobileNumber: "55038528",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "BRANCH-1",
    city: "DOHA",
    town: "INDUSTRIAL AREA",
    location: "EZDAN 23",
    vehicle: "41073/Lorry/Diesel/41073/256",
    remarks: "CARTON BOX // PROMOTION BOX // 47 WAREHOUSE DELIVERY",
    advanceAmount: 13,
    status: "SCHEDULED",
    sameDay: "Y",
    collectDate: "19/03/2025",
    items: [
      {
        id: "item-2",
        jobId: "2",
        itemName: "CARTON BOX - SMALL // PROMOTION BOX",
        sellPrice: 50,
        quantity: 1
      }
    ],
    entryBy: "admin",
    entryDate: "18/03/2025"
  },
  {
    id: "3",
    jobNumber: "29903",
    invoiceNumber: "INV-002",
    jobType: "COLLECTION",
    date: "19/03/2025",
    time: "00:00",
    amPm: "PM",
    customer: "MR. UDAYA",
    mobileNumber: "50252368",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "BRANCH-2",
    city: "DOHA",
    town: "EZDAN OASIS",
    location: "BUILDING NO. B, 182 ROOM",
    vehicle: "",
    remarks: "",
    advanceAmount: 230,
    status: "PENDING",
    sameDay: "Y",
    collectDate: "19/03/2025",
    items: [
      {
        id: "item-3",
        jobId: "3",
        itemName: "WOODEN BOX - (1M) - WHITE",
        sellPrice: 100,
        quantity: 1
      }
    ],
    entryBy: "admin",
    entryDate: "18/03/2025"
  },
  {
    id: "4",
    jobNumber: "29898",
    invoiceNumber: "INV-003",
    jobType: "DELIVERY",
    date: "19/03/2025",
    time: "00:00",
    amPm: "AM",
    customer: "ZAMEEL",
    mobileNumber: "33969702",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "BRANCH-3",
    city: "DOHA",
    town: "BINMAHMOOD",
    location: "",
    vehicle: "",
    remarks: "33969702 // 66099345",
    advanceAmount: 230,
    status: "SCHEDULED",
    sameDay: "Y",
    collectDate: "19/03/2025",
    items: [
      {
        id: "item-4",
        jobId: "4",
        itemName: "WOODEN BOX - (1M) - WHITE // PROMOTION BOX",
        sellPrice: 100,
        quantity: 1
      }
    ],
    entryBy: "admin",
    entryDate: "18/03/2025"
  },
  {
    id: "5",
    jobNumber: "21125",
    invoiceNumber: "INV-004",
    jobType: "COLLECTION",
    date: "19/03/2025",
    time: "00:00",
    amPm: "AM",
    customer: "MS CHANTHIKA",
    mobileNumber: "33746393",
    landNumber: "0",
    sector: "COLOMBO",
    branch: "BRANCH-4",
    city: "DOHA",
    town: "DOHA CITY",
    location: "",
    vehicle: "",
    remarks: "DELIVERY 50 50 50",
    advanceAmount: 0,
    status: "PENDING",
    sameDay: "Y",
    collectDate: "19/03/2025",
    items: [
      {
        id: "item-5",
        jobId: "5",
        itemName: "CARTON BOX - SMALL",
        sellPrice: 50,
        quantity: 1
      }
    ],
    entryBy: "admin",
    entryDate: "18/03/2025"
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

export const mockSalesReps = [
  { id: "1", name: "GAMAGE KASMIKA GAYASHAN", code: "264" },
  { id: "2", name: "MOHAMMED RIZAN", code: "189" },
  { id: "3", name: "ABDUL SHAHID", code: "321" },
  { id: "4", name: "SARA ALHAMED", code: "415" },
];

export const mockDrivers = [
  { id: "1", name: "KANAYA/D" },
  { id: "2", name: "WCA AGENTS/246" },
  { id: "3", name: "ABDUL RAZAK" },
  { id: "4", name: "MOHAMMED SADIQ" },
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
