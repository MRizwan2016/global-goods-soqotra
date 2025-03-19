import { DailyJobForecast, QatarBranch, QatarCity, QatarJob, QatarSector, QatarVehicle, VehicleStats } from "../types/jobTypes";

export const mockJobs: QatarJob[] = [
  {
    id: "1",
    jobNumber: "29912",
    invoiceNumber: "INV-2023-001",
    jobType: "COLLECTION",
    date: "12/06/2023",
    time: "10:30",
    amPm: "AM",
    customer: "AHMED CORPORATION",
    mobileNumber: "+974 5566 7788",
    landNumber: "+974 4411 2233",
    sector: "COM",
    branch: "MAN",
    city: "DOH",
    town: "AL SADD",
    location: "BUILDING 45, STREET 980",
    vehicle: "41070",
    advanceAmount: 300,
    status: "PENDING",
    remarks: "FRAGILE ITEMS, HANDLE WITH CARE",
    sameDay: "N",
    collectDate: "13/06/2023",
    entryBy: "ADMIN",
    entryDate: "11/06/2023",
    items: [
      {
        id: "1-1", 
        jobId: "1",
        itemName: "TELEVISION",
        sellPrice: 200,
        quantity: 1
      },
      {
        id: "1-2", 
        jobId: "1",
        itemName: "CARTON BOX - MEDIUM",
        sellPrice: 50,
        quantity: 2
      }
    ]
  },
  {
    id: "2",
    jobNumber: "29913",
    invoiceNumber: "INV-2023-002",
    jobType: "DELIVERY",
    date: "15/06/2023",
    time: "02:15",
    amPm: "PM",
    customer: "QATAR ELECTRONICS",
    mobileNumber: "+974 3344 5566",
    landNumber: "+974 4433 6677",
    sector: "RET",
    branch: "DOH",
    city: "DOH",
    town: "WEST BAY",
    location: "TOWER 3, FLOOR 15",
    vehicle: "41067",
    advanceAmount: 150,
    status: "SCHEDULED",
    remarks: "",
    sameDay: "Y",
    entryBy: "ADMIN",
    entryDate: "14/06/2023",
    items: [
      {
        id: "2-1", 
        jobId: "2",
        itemName: "WASHING MACHINE",
        sellPrice: 100,
        quantity: 1
      },
      {
        id: "2-2", 
        jobId: "2",
        itemName: "MICROWAVE OVEN",
        sellPrice: 75,
        quantity: 1
      }
    ]
  },
  {
    id: "3",
    jobNumber: "29914",
    invoiceNumber: "INV-2023-003",
    jobType: "COLLECTION",
    date: "18/06/2023",
    time: "09:00",
    amPm: "AM",
    customer: "AL JASMI TRADING",
    mobileNumber: "+974 7788 9900",
    landNumber: "+974 4455 6677",
    sector: "IMP",
    branch: "MAN",
    city: "DOH",
    town: "INDUSTRIAL AREA",
    location: "STREET 47, GATE 5",
    vehicle: "41504",
    advanceAmount: 500,
    status: "IN_PROGRESS",
    remarks: "HEAVY EQUIPMENT",
    sameDay: "N",
    collectDate: "20/06/2023",
    entryBy: "ADMIN",
    entryDate: "17/06/2023",
    items: [
      {
        id: "3-1", 
        jobId: "3",
        itemName: "STEEL BOX",
        sellPrice: 300,
        quantity: 1
      },
      {
        id: "3-2", 
        jobId: "3",
        itemName: "GYM SET",
        sellPrice: 450,
        quantity: 1
      }
    ]
  },
  {
    id: "4",
    jobNumber: "29915",
    invoiceNumber: "INV-2023-004",
    jobType: "DELIVERY",
    date: "22/06/2023",
    time: "11:30",
    amPm: "AM",
    customer: "QATAR AIRWAYS CARGO",
    mobileNumber: "+974 5544 3322",
    landNumber: "+974 4466 7788",
    sector: "AIR",
    branch: "DOH",
    city: "DOH",
    town: "AIRPORT AREA",
    location: "CARGO TERMINAL B",
    vehicle: "41073",
    advanceAmount: 200,
    status: "SCHEDULED",
    remarks: "DELIVER TO CARGO RECEIVING DOCK ONLY",
    sameDay: "Y",
    entryBy: "ADMIN",
    entryDate: "21/06/2023",
    items: [
      {
        id: "4-1", 
        jobId: "4",
        itemName: "WOODEN BOX - 2 METER",
        sellPrice: 180,
        quantity: 2
      },
      {
        id: "4-2", 
        jobId: "4",
        itemName: "CARTON BOX - LARGE",
        sellPrice: 70,
        quantity: 3
      }
    ]
  },
  {
    id: "5",
    jobNumber: "29916",
    invoiceNumber: "INV-2023-005",
    jobType: "COLLECTION",
    date: "25/06/2023",
    time: "03:45",
    amPm: "PM",
    customer: "DOHA FURNITURE",
    mobileNumber: "+974 6677 8899",
    landNumber: "+974 4422 1133",
    sector: "FUR",
    branch: "MAN",
    city: "DOH",
    town: "AL WAKRAH",
    location: "SHOWROOM 12, MAIN STREET",
    vehicle: "41070",
    advanceAmount: 350,
    status: "PENDING",
    remarks: "FURNITURE NEEDS SPECIAL HANDLING",
    sameDay: "N",
    collectDate: "27/06/2023",
    entryBy: "ADMIN",
    entryDate: "24/06/2023",
    items: [
      {
        id: "5-1", 
        jobId: "5",
        itemName: "WOODEN BOX - 3 METER",
        sellPrice: 230,
        quantity: 1
      },
      {
        id: "5-2", 
        jobId: "5",
        itemName: "TRAVELING BAG",
        sellPrice: 40,
        quantity: 2
      }
    ]
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
