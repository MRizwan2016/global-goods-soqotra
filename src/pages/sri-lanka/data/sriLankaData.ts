
export const sriLankaPorts = [
  { value: "COLOMBO", label: "COLOMBO" },
  { value: "KURUNEGALA", label: "KURUNEGALA" },
  { value: "GALLE", label: "GALLE" }
];

export const sriLankaSectors = [
  { value: "COLOMBO", label: "COLOMBO", port: "COLOMBO" },
  { value: "KURUNEGALA", label: "KURUNEGALA", port: "COLOMBO" },
  { value: "GALLE", label: "GALLE", port: "COLOMBO" },
  { value: "KANDY", label: "KANDY", port: "COLOMBO" },
  { value: "JAFFNA", label: "JAFFNA", port: "COLOMBO" },
  { value: "NEGOMBO", label: "NEGOMBO", port: "COLOMBO" },
  { value: "MATARA", label: "MATARA", port: "COLOMBO" },
  { value: "BATTICALOA", label: "BATTICALOA", port: "COLOMBO" },
  { value: "TRINCOMALEE", label: "TRINCOMALEE", port: "COLOMBO" },
  { value: "ANURADHAPURA", label: "ANURADHAPURA", port: "COLOMBO" },
];

export const sriLankaSalesReps = [
  { value: "MR_SAJJAD", label: "MR. SAJJAD" },
  { value: "MR_IMAM", label: "MR. IMAM UBAIDULLA" },
  { value: "MR_LAHIRU", label: "MR. LAHIRU CHATHURANGA" },
];

export const sriLankaDrivers = [
  { value: "MR_ASHOKA", label: "MR. ASHOKA UDESH" },
  { value: "MR_CHAMINDA", label: "MR. CHAMINDA" },
  { value: "MR_NUWAN", label: "MR. NUWAN" },
];

export const sriLankaCities = [
  "Colombo", "Kandy", "Galle", "Kurunegala", "Jaffna",
  "Negombo", "Matara", "Batticaloa", "Trincomalee", "Anuradhapura",
  "Ratnapura", "Badulla", "Polonnaruwa", "Nuwara Eliya", "Chilaw",
  "Hambantota", "Kalmunai", "Vavuniya", "Puttalam", "Kalutara",
];

export const sriLankaPackageTypes = [
  { name: "SMALL BOX", dimensions: { length: 50, width: 40, height: 40 } },
  { name: "MEDIUM BOX", dimensions: { length: 60, width: 50, height: 50 } },
  { name: "LARGE BOX", dimensions: { length: 80, width: 60, height: 60 } },
  { name: "BARREL", dimensions: { length: 60, width: 60, height: 90 } },
  { name: "SUITCASE", dimensions: { length: 70, width: 45, height: 30 } },
  { name: "TV BOX", dimensions: { length: 120, width: 20, height: 80 } },
];

export const doorToDoorPricing: Record<string, { price: number; label: string }> = {
  COLOMBO: { price: 259, label: "Colombo" },
  KURUNEGALA: { price: 269, label: "Kurunegala" },
  GALLE: { price: 269, label: "Galle" },
  KANDY: { price: 279, label: "Kandy" },
  JAFFNA: { price: 289, label: "Jaffna" },
  NEGOMBO: { price: 259, label: "Negombo" },
  MATARA: { price: 279, label: "Matara" },
  BATTICALOA: { price: 289, label: "Batticaloa" },
  TRINCOMALEE: { price: 289, label: "Trincomalee" },
  ANURADHAPURA: { price: 279, label: "Anuradhapura" },
};
