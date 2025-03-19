import { QatarJob, QatarCity, QatarVehicle, QatarSector, QatarBranch } from "../types/jobTypes";

export const mockJobs: QatarJob[] = [
  {
    id: "1",
    jobNumber: "23070001",
    invoiceNumber: "INV-2307-0001",
    jobType: "DELIVERY",
    date: "2023-07-01",
    time: "10:00",
    amPm: "AM",
    customer: "Qatar National Bank",
    mobileNumber: "555-1234",
    landNumber: "444-5678",
    sector: "Banking",
    branch: "Doha Main Branch",
    city: "Doha",
    town: "West Bay",
    location: "QNB Tower",
    vehicle: "Car",
    remarks: "Fragile items",
    advanceAmount: 50,
    status: "PENDING",
    sameDay: "Y",
    collectDate: "2023-07-01",
    items: [
      { id: "item1", jobId: "1", itemName: "Laptop", sellPrice: 500, quantity: 1 },
      { id: "item2", jobId: "1", itemName: "Documents", sellPrice: 100, quantity: 5 }
    ],
    entryBy: "John Doe",
    entryDate: "2023-06-30"
  },
  {
    id: "2",
    jobNumber: "23070002",
    invoiceNumber: "INV-2307-0002",
    jobType: "COLLECTION",
    date: "2023-07-01",
    time: "02:30",
    amPm: "PM",
    customer: "Doha Municipality",
    mobileNumber: "555-4321",
    landNumber: "444-8765",
    sector: "Government",
    branch: "Al Rayyan Branch",
    city: "Doha",
    town: "Al Rayyan",
    location: "Municipality Office",
    vehicle: "Van",
    remarks: "Important files",
    advanceAmount: 0,
    status: "COMPLETED",
    sameDay: "Y",
    collectDate: "2023-07-01",
    items: [
      { id: "item3", jobId: "2", itemName: "Files", sellPrice: 80, quantity: 10 },
      { id: "item4", jobId: "2", itemName: "Sealed Box", sellPrice: 120, quantity: 2 }
    ],
    entryBy: "Jane Smith",
    entryDate: "2023-06-30"
  },
  {
    id: "3",
    jobNumber: "23070003",
    invoiceNumber: "INV-2307-0003",
    jobType: "DELIVERY",
    date: "2023-07-02",
    time: "09:00",
    amPm: "AM",
    customer: "Hamad International Airport",
    mobileNumber: "555-9876",
    landNumber: "444-2345",
    sector: "Transportation",
    branch: "Cargo Section",
    city: "Doha",
    town: "Airport Area",
    location: "HIA Cargo Terminal",
    vehicle: "Truck",
    remarks: "Heavy equipment",
    advanceAmount: 100,
    status: "SCHEDULED",
    sameDay: "N",
    collectDate: "2023-07-02",
    items: [
      { id: "item5", jobId: "3", itemName: "Spare Parts", sellPrice: 200, quantity: 3 },
      { id: "item6", jobId: "3", itemName: "Tools", sellPrice: 150, quantity: 4 }
    ],
    entryBy: "David Johnson",
    entryDate: "2023-07-01"
  },
  {
    id: "4",
    jobNumber: "23070004",
    invoiceNumber: "INV-2307-0004",
    jobType: "COLLECTION",
    date: "2023-07-02",
    time: "03:00",
    amPm: "PM",
    customer: "Sidra Medical Center",
    mobileNumber: "555-5432",
    landNumber: "444-7890",
    sector: "Healthcare",
    branch: "Outpatient Clinic",
    city: "Doha",
    town: "Education City",
    location: "Sidra Hospital",
    vehicle: "Car",
    remarks: "Medical samples",
    advanceAmount: 25,
    status: "IN_PROGRESS",
    sameDay: "Y",
    collectDate: "2023-07-02",
    items: [
      { id: "item7", jobId: "4", itemName: "Blood Samples", sellPrice: 100, quantity: 2 },
      { id: "item8", jobId: "4", itemName: "Lab Reports", sellPrice: 50, quantity: 6 }
    ],
    entryBy: "Sarah Williams",
    entryDate: "2023-07-01"
  },
  {
    id: "5",
    jobNumber: "23070005",
    invoiceNumber: "INV-2307-0005",
    jobType: "DELIVERY",
    date: "2023-07-03",
    time: "11:00",
    amPm: "AM",
    customer: "Qatar University",
    mobileNumber: "555-2222",
    landNumber: "444-1111",
    sector: "Education",
    branch: "Main Library",
    city: "Doha",
    town: "Qatar University",
    location: "QU Library",
    vehicle: "Van",
    remarks: "Books and journals",
    advanceAmount: 75,
    status: "CANCELLED",
    sameDay: "N",
    collectDate: "2023-07-03",
    items: [
      { id: "item9", jobId: "5", itemName: "Textbooks", sellPrice: 60, quantity: 8 },
      { id: "item10", jobId: "5", itemName: "Journals", sellPrice: 40, quantity: 12 }
    ],
    entryBy: "Michael Brown",
    entryDate: "2023-07-02"
  },
  {
    id: "6",
    jobNumber: "23070006",
    invoiceNumber: "INV-2307-0006",
    jobType: "COLLECTION",
    date: "2023-07-03",
    time: "04:30",
    amPm: "PM",
    customer: "Al Jazeera Media Network",
    mobileNumber: "555-3333",
    landNumber: "444-9999",
    sector: "Media",
    branch: "News Department",
    city: "Doha",
    town: "West Bay",
    location: "Al Jazeera Tower",
    vehicle: "Car",
    remarks: "Confidential documents",
    advanceAmount: 30,
    status: "PENDING",
    sameDay: "Y",
    collectDate: "2023-07-03",
    items: [
      { id: "item11", jobId: "6", itemName: "Documents", sellPrice: 70, quantity: 7 },
      { id: "item12", jobId: "6", itemName: "Tapes", sellPrice: 90, quantity: 3 }
    ],
    entryBy: "Linda Davis",
    entryDate: "2023-07-02"
  },
  {
    id: "7",
    jobNumber: "23070007",
    invoiceNumber: "INV-2307-0007",
    jobType: "DELIVERY",
    date: "2023-07-04",
    time: "10:30",
    amPm: "AM",
    customer: "Commercial Bank of Qatar",
    mobileNumber: "555-7777",
    landNumber: "444-3333",
    sector: "Banking",
    branch: "Al Sadd Branch",
    city: "Doha",
    town: "Al Sadd",
    location: "CBQ Branch",
    vehicle: "Van",
    remarks: "Financial reports",
    advanceAmount: 60,
    status: "COMPLETED",
    sameDay: "Y",
    collectDate: "2023-07-04",
    items: [
      { id: "item13", jobId: "7", itemName: "Reports", sellPrice: 80, quantity: 9 },
      { id: "item14", jobId: "7", itemName: "Statements", sellPrice: 60, quantity: 11 }
    ],
    entryBy: "Robert Wilson",
    entryDate: "2023-07-03"
  },
  {
    id: "8",
    jobNumber: "23070008",
    invoiceNumber: "INV-2307-0008",
    jobType: "COLLECTION",
    date: "2023-07-04",
    time: "02:00",
    amPm: "PM",
    customer: "Aspire Academy",
    mobileNumber: "555-8888",
    landNumber: "444-4444",
    sector: "Education",
    branch: "Sports Science Dept",
    city: "Doha",
    town: "Aspire Zone",
    location: "Academy Building",
    vehicle: "Car",
    remarks: "Sports equipment",
    advanceAmount: 40,
    status: "SCHEDULED",
    sameDay: "N",
    collectDate: "2023-07-04",
    items: [
      { id: "item15", jobId: "8", itemName: "Equipment", sellPrice: 120, quantity: 4 },
      { id: "item16", jobId: "8", itemName: "Uniforms", sellPrice: 70, quantity: 13 }
    ],
    entryBy: "Karen Taylor",
    entryDate: "2023-07-03"
  },
  {
    id: "9",
    jobNumber: "23070009",
    invoiceNumber: "INV-2307-0009",
    jobType: "DELIVERY",
    date: "2023-07-05",
    time: "09:30",
    amPm: "AM",
    customer: "Museum of Islamic Art",
    mobileNumber: "555-6666",
    landNumber: "444-6666",
    sector: "Culture",
    branch: "Exhibition Dept",
    city: "Doha",
    town: "Corniche",
    location: "MIA Park",
    vehicle: "Truck",
    remarks: "Art pieces",
    advanceAmount: 120,
    status: "IN_PROGRESS",
    sameDay: "Y",
    collectDate: "2023-07-05",
    items: [
      { id: "item17", jobId: "9", itemName: "Artifacts", sellPrice: 250, quantity: 2 },
      { id: "item18", jobId: "9", itemName: "Display Cases", sellPrice: 150, quantity: 3 }
    ],
    entryBy: "Thomas Anderson",
    entryDate: "2023-07-04"
  },
  {
    id: "10",
    jobNumber: "23070010",
    invoiceNumber: "INV-2307-0010",
    jobType: "COLLECTION",
    date: "2023-07-05",
    time: "03:30",
    amPm: "PM",
    customer: "Qatar Petroleum",
    mobileNumber: "555-1111",
    landNumber: "444-2222",
    sector: "Energy",
    branch: "Research Center",
    city: "Doha",
    town: "West Bay",
    location: "QP Tower",
    vehicle: "Van",
    remarks: "Samples and equipment",
    advanceAmount: 55,
    status: "CANCELLED",
    sameDay: "N",
    collectDate: "2023-07-05",
    items: [
      { id: "item19", jobId: "10", itemName: "Samples", sellPrice: 90, quantity: 5 },
      { id: "item20", jobId: "10", itemName: "Instruments", sellPrice: 110, quantity: 4 }
    ],
    entryBy: "Jessica White",
    entryDate: "2023-07-04"
  }
];

export const mockCities: QatarCity[] = [
  {
    id: "c1",
    name: "Doha",
    code: "DOH"
  },
  {
    id: "c2",
    name: "Al Rayyan",
    code: "RAY"
  },
  {
    id: "c3",
    name: "Al Wakrah",
    code: "WAK"
  },
  {
    id: "c4",
    name: "Al Khor",
    code: "KHO"
  },
  {
    id: "c5",
    name: "Al Shamal",
    code: "SHA"
  }
];

export const mockSectors: QatarSector[] = [
  {
    id: "s1",
    name: "Banking",
    code: "BNK"
  },
  {
    id: "s2",
    name: "Government",
    code: "GOV"
  },
  {
    id: "s3",
    name: "Transportation",
    code: "TRN"
  },
  {
    id: "s4",
    name: "Healthcare",
    code: "MED"
  },
  {
    id: "s5",
    name: "Education",
    code: "EDU"
  },
  {
    id: "s6",
    name: "Media",
    code: "MED"
  },
  {
    id: "s7",
    name: "Energy",
    code: "ENG"
  },
  {
    id: "s8",
    name: "Culture",
    code: "CUL"
  }
];

export const mockBranches: QatarBranch[] = [
  {
    id: "b1",
    sector: "BNK",
    name: "Doha Main Branch",
    code: "DMB"
  },
  {
    id: "b2",
    sector: "GOV",
    name: "Al Rayyan Branch",
    code: "ARB"
  },
  {
    id: "b3",
    sector: "TRN",
    name: "Cargo Section",
    code: "HCS"
  },
  {
    id: "b4",
    sector: "MED",
    name: "Outpatient Clinic",
    code: "SOC"
  },
  {
    id: "b5",
    sector: "EDU",
    name: "Main Library",
    code: "QML"
  },
  {
    id: "b6",
    sector: "MED",
    name: "News Department",
    code: "AJN"
  },
  {
    id: "b7",
    sector: "BNK",
    name: "Al Sadd Branch",
    code: "CBS"
  },
  {
    id: "b8",
    sector: "EDU",
    name: "Sports Science Dept",
    code: "ASA"
  },
  {
    id: "b9",
    sector: "CUL",
    name: "Exhibition Dept",
    code: "MIE"
  },
  {
    id: "b10",
    sector: "ENG",
    name: "Research Center",
    code: "QPR"
  }
];

export const mockSalesReps = [
  {
    id: "sr1",
    name: "Ahmed Khalil",
    code: "AK001"
  },
  {
    id: "sr2",
    name: "Fatima Al-Thani",
    code: "FA002"
  },
  {
    id: "sr3",
    name: "Yousef Al-Abdulla",
    code: "YA003"
  }
];

// Updated mock vehicles based on provided data
export const mockVehicles = [
  {
    id: "v1",
    number: "41067",
    type: "LORRY",
    description: "DIESEL MANUAL",
    status: "RUN",
    licenseExpiry: "29/12/2016",
    insuranceExpiry: "29/12/2016",
    mileage: "19617"
  },
  {
    id: "v2",
    number: "41070",
    type: "LORRY",
    description: "DIESEL MANUAL",
    status: "RUN",
    licenseExpiry: "29/12/2016",
    insuranceExpiry: "29/12/2016",
    mileage: "16273"
  },
  {
    id: "v3",
    number: "41073", 
    type: "LORRY",
    description: "DIESEL MANUAL",
    status: "RUN",
    licenseExpiry: "29/12/2016",
    insuranceExpiry: "29/12/2016",
    mileage: "12226"
  },
  {
    id: "v4",
    number: "514005",
    type: "LORRY",
    description: "MITSUBISHI FUSO",
    status: "GARAGE",
    licenseExpiry: "28/10/2014",
    insuranceExpiry: "28/10/2014",
    mileage: "1"
  },
  {
    id: "v5",
    number: "119927",
    type: "LORRY",
    description: "PETROL MANUAL",
    status: "RUN",
    licenseExpiry: "17/11/2014",
    insuranceExpiry: "17/11/2014",
    mileage: "1"
  },
  {
    id: "v6",
    number: "74827",
    type: "LORRY",
    description: "TATA LORRY",
    status: "GARAGE",
    licenseExpiry: "18/11/2014",
    insuranceExpiry: "18/11/2014",
    mileage: "1"
  },
  {
    id: "v7",
    number: "1254681854",
    type: "FORK LIFT",
    description: "WAREHOUSE COLLECTION",
    status: "GARAGE",
    licenseExpiry: "00/00/0000",
    insuranceExpiry: "00/00/0000",
    mileage: "0"
  }
];

// Updated mock drivers based on provided data
export const mockDrivers = [
  {
    id: "d1",
    name: "ASHOKA",
    code: "DRV01",
    mobileNumber: "974-55667788",
    licenseNumber: "QAT1234567",
    licenseExpiry: "2025-12-31"
  },
  {
    id: "d2",
    name: "KANAYA",
    code: "DRV02",
    mobileNumber: "974-55998877",
    licenseNumber: "QAT7654321",
    licenseExpiry: "2024-11-15"
  },
  {
    id: "d3",
    name: "SALIEH",
    code: "DRV03",
    mobileNumber: "974-55112233",
    licenseNumber: "QAT9876543",
    licenseExpiry: "2025-06-30"
  },
  {
    id: "d4",
    name: "ABDULLAH",
    code: "DRV04",
    mobileNumber: "974-55443322",
    licenseNumber: "QAT3456789",
    licenseExpiry: "2024-09-20"
  },
  {
    id: "d5",
    name: "IDRIS KARAR",
    code: "DRV05",
    mobileNumber: "974-55778899",
    licenseNumber: "QAT6543219",
    licenseExpiry: "2025-03-15"
  },
  {
    id: "d6",
    name: "JOHNY VENAKADY",
    code: "DRV06",
    mobileNumber: "974-55221133",
    licenseNumber: "QAT9876123",
    licenseExpiry: "2024-08-10"
  },
  {
    id: "d7",
    name: "RAYMOND",
    code: "DRV07",
    mobileNumber: "974-55664422",
    licenseNumber: "QAT4567891",
    licenseExpiry: "2025-05-22"
  }
];
