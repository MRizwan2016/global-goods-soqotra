
import { QatarCity, QatarSector, QatarBranch } from "../types/jobTypes";

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

// Qatar Towns list as requested
export const qatarTowns: string[] = [
  "Doha",
  "Al Rayyan", 
  "Wukair", 
  "Wakra", 
  "Mansoora", 
  "Najma", 
  "Madeena Khaleefa", 
  "Garafa", 
  "Bin Omran", 
  "Bin Mahmoud", 
  "Muaithar", 
  "Baaya", 
  "Ain Khalid", 
  "Mathar Al Qadeem", 
  "Al Hilal", 
  "Thumama", 
  "Al Waab", 
  "Al Saad", 
  "Al Khor", 
  "Um Salaal Ali", 
  "Um Salaal Mohamed", 
  "Zobara", 
  "Shamal", 
  "Fereej Al Sudan", 
  "Al Naasar Street", 
  "West Bay", 
  "Onaiza", 
  "Karana", 
  "Katara", 
  "Industrial Area", 
  "New Industrial Area"
];

// Industrial Area Streets (1-52)
export const industrialAreaStreets: string[] = Array.from(
  { length: 52 }, 
  (_, i) => `Street No. ${i + 1}`
);
