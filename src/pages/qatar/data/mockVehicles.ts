
import { QatarVehicle, QatarDriver } from "../types/vehicleTypes";

// Updated mock vehicles based on provided data
export const mockVehicles: QatarVehicle[] = [
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
export const mockDrivers: QatarDriver[] = [
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
